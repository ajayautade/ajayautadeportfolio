/** Parser and explainer for standard five-field cron expressions (minute hour day-of-month month day-of-week). */

interface FieldSpec {
  name: string;
  label: string;
  min: number;
  max: number;
  names?: string[];
}

const MONTH_NAMES = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const DAY_NAMES = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const MONTH_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const SPECS: FieldSpec[] = [
  { name: "minute", label: "Minute", min: 0, max: 59 },
  { name: "hour", label: "Hour", min: 0, max: 23 },
  { name: "dom", label: "Day of month", min: 1, max: 31 },
  { name: "month", label: "Month", min: 1, max: 12, names: MONTH_NAMES },
  { name: "dow", label: "Day of week", min: 0, max: 7, names: DAY_NAMES },
];

const MACROS: Record<string, string> = {
  "@yearly": "0 0 1 1 *",
  "@annually": "0 0 1 1 *",
  "@monthly": "0 0 1 * *",
  "@weekly": "0 0 * * 0",
  "@daily": "0 0 * * *",
  "@midnight": "0 0 * * *",
  "@hourly": "0 * * * *",
};

export interface CronField {
  label: string;
  raw: string;
  /** Sorted matching values. Day of week is normalised to 0–6 with Sunday as 0. */
  values: number[];
  /** True when the field is "*" (or "*​/1"): it places no restriction. */
  any: boolean;
  meaning: string;
}

export interface Cron {
  expression: string;
  fields: CronField[];
  summary: string;
}

function parseField(raw: string, spec: FieldSpec): number[] | string {
  const values = new Set<number>();
  const toNumber = (token: string): number | null => {
    const lower = token.toLowerCase();
    if (spec.names) {
      const index = spec.names.indexOf(lower);
      if (index >= 0) return spec.name === "month" ? index + 1 : index;
    }
    return /^\d+$/.test(token) ? Number(token) : null;
  };

  for (const part of raw.split(",")) {
    if (part === "") return `${spec.label}: empty value in list.`;
    const [range, stepText, extra] = part.split("/");
    if (extra !== undefined) return `${spec.label}: "${part}" has more than one "/".`;
    const step = stepText === undefined ? 1 : Number(stepText);
    if (!Number.isInteger(step) || step < 1) return `${spec.label}: step in "${part}" must be a whole number of 1 or more.`;

    let start: number;
    let end: number;
    if (range === "*") {
      start = spec.min;
      end = spec.name === "dow" ? 6 : spec.max;
    } else if (range.includes("-")) {
      const [a, b] = range.split("-").map(toNumber);
      if (a === null || b === null || a === undefined || b === undefined) return `${spec.label}: cannot read "${part}".`;
      start = a;
      end = b;
    } else {
      const single = toNumber(range);
      if (single === null) return `${spec.label}: cannot read "${part}".`;
      start = single;
      // "5/15" means "from 5, every 15" up to the maximum.
      end = stepText === undefined ? single : spec.name === "dow" ? 6 : spec.max;
    }
    if (start < spec.min || end > spec.max || start > spec.max) {
      return `${spec.label}: values must be between ${spec.min} and ${spec.max}.`;
    }
    if (start > end) return `${spec.label}: range "${range}" runs backwards.`;
    for (let v = start; v <= end; v += step) values.add(spec.name === "dow" && v === 7 ? 0 : v);
  }
  return [...values].sort((a, b) => a - b);
}

const pad = (n: number) => String(n).padStart(2, "0");

function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Collapse consecutive runs: [1,2,3,5] → ["1 through 3", "5"]. */
function runs(values: number[], name: (n: number) => string): string[] {
  const out: string[] = [];
  for (let i = 0; i < values.length; ) {
    let j = i;
    while (j + 1 < values.length && values[j + 1] === values[j] + 1) j++;
    out.push(j - i >= 2 ? `${name(values[i])} through ${name(values[j])}` : values.slice(i, j + 1).map(name).join(", "));
    i = j + 1;
  }
  return out;
}

/** Recognise an even step over the whole range, e.g. minutes 0,15,30,45 → 15. */
function evenStep(values: number[], spec: FieldSpec): number | null {
  if (values.length < 2 || values[0] !== spec.min) return null;
  const step = values[1] - values[0];
  if (step < 2) return null;
  const expected: number[] = [];
  for (let v = spec.min; v <= spec.max; v += step) expected.push(v);
  return expected.length === values.length && expected.every((v, i) => v === values[i]) ? step : null;
}

function fieldMeaning(field: { values: number[]; any: boolean }, spec: FieldSpec): string {
  if (field.any) return `every ${spec.label.toLowerCase()}`;
  const step = spec.name === "minute" || spec.name === "hour" ? evenStep(field.values, spec) : null;
  if (step) return `every ${step} ${spec.name}s`;
  const name =
    spec.name === "month"
      ? (n: number) => MONTH_FULL[n - 1]
      : spec.name === "dow"
        ? (n: number) => DAY_FULL[n]
        : (n: number) => String(n);
  return list(runs(field.values, name));
}

function summarise(fields: CronField[]): string {
  const [minute, hour, dom, month, dow] = fields;
  const minuteStep = evenStep(minute.values, SPECS[0]);
  const hourStep = evenStep(hour.values, SPECS[1]);

  let time: string;
  if (minute.any && hour.any) time = "Every minute";
  else if (minuteStep && hour.any) time = `Every ${minuteStep} minutes`;
  else if (minute.values.length === 1 && hour.values.length === 1 && !hour.any) {
    time = `At ${pad(hour.values[0])}:${pad(minute.values[0])}`;
  } else if (minute.values.length === 1 && hour.any) {
    time = minute.values[0] === 0 ? "Every hour, on the hour" : `At minute ${minute.values[0]} of every hour`;
  } else if (minute.values.length === 1 && hourStep) {
    time = `At minute ${minute.values[0]}, every ${hourStep} hours`;
  } else if (minute.values.length === 1 && hour.values.length <= 6) {
    time = `At ${list(hour.values.map((h) => `${pad(h)}:${pad(minute.values[0])}`))}`;
  } else {
    const minutePart = minute.any ? "every minute" : minuteStep ? `every ${minuteStep} minutes` : `minute ${minute.meaning}`;
    const hourPart = hour.any ? "every hour" : hourStep ? `every ${hourStep} hours` : `hours ${hour.meaning}`;
    time =
      minute.values.length === 1 && minute.values[0] === 0 ? `On the hour, during ${hourPart}` : `At ${minutePart}, during ${hourPart}`;
  }

  let days: string;
  if (dom.any && dow.any) days = "every day";
  else if (!dom.any && dow.any) days = `on day ${dom.meaning} of the month`;
  else if (dom.any && !dow.any) days = `on ${dow.meaning}`;
  else days = `on day ${dom.meaning} of the month, and also on ${dow.meaning}`;

  const months = month.any ? "" : `, in ${month.meaning}`;
  return `${time}, ${days}${months}.`;
}

export function parseCron(input: string): Cron | { error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { error: "Enter a cron expression, for example 0 2 * * *." };
  if (trimmed.toLowerCase() === "@reboot") return { error: "@reboot runs once at start-up, so it has no schedule to explain." };
  const expression = MACROS[trimmed.toLowerCase()] ?? trimmed;
  const parts = expression.split(/\s+/);
  if (parts.length !== 5) {
    return {
      error: `A standard cron expression has 5 fields (minute, hour, day of month, month, day of week). This one has ${parts.length}.`,
    };
  }

  const fields: CronField[] = [];
  for (let i = 0; i < 5; i++) {
    const spec = SPECS[i];
    const values = parseField(parts[i], spec);
    if (typeof values === "string") return { error: values };
    const any = parts[i] === "*" || parts[i] === "*/1";
    fields.push({ label: spec.label, raw: parts[i], values, any, meaning: fieldMeaning({ values, any }, spec) });
  }
  return { expression, fields, summary: summarise(fields) };
}

/**
 * The next `count` times the schedule fires after `from`.
 * `utc` chooses which clock the expression is read against.
 */
export function nextRuns(cron: Cron, from: Date, count: number, utc: boolean): Date[] {
  const [minute, hour, dom, month, dow] = cron.fields;
  const get = {
    minute: (d: Date) => (utc ? d.getUTCMinutes() : d.getMinutes()),
    hour: (d: Date) => (utc ? d.getUTCHours() : d.getHours()),
    date: (d: Date) => (utc ? d.getUTCDate() : d.getDate()),
    month: (d: Date) => (utc ? d.getUTCMonth() : d.getMonth()) + 1,
    day: (d: Date) => (utc ? d.getUTCDay() : d.getDay()),
  };
  // Standard cron: when both day fields are restricted, a match on either one is enough.
  const dayMatches = (d: Date) => {
    const domOk = dom.values.includes(get.date(d));
    const dowOk = dow.values.includes(get.day(d));
    if (dom.any && dow.any) return true;
    if (dom.any) return dowOk;
    if (dow.any) return domOk;
    return domOk || dowOk;
  };

  const results: Date[] = [];
  const cursor = new Date(from.getTime());
  cursor.setSeconds(0, 0);
  cursor.setTime(cursor.getTime() + 60_000);

  // Walk forward, skipping whole days and hours that cannot match.
  for (let guard = 0; guard < 500_000 && results.length < count; guard++) {
    if (!month.values.includes(get.month(cursor)) || !dayMatches(cursor)) {
      if (utc) cursor.setUTCHours(24, 0, 0, 0);
      else cursor.setHours(24, 0, 0, 0);
      continue;
    }
    if (!hour.values.includes(get.hour(cursor))) {
      if (utc) cursor.setUTCMinutes(60, 0, 0);
      else cursor.setMinutes(60, 0, 0);
      continue;
    }
    if (minute.values.includes(get.minute(cursor))) results.push(new Date(cursor.getTime()));
    cursor.setTime(cursor.getTime() + 60_000);
  }
  return results;
}
