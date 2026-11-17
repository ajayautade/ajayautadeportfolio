/**
 * A deliberately small syntax highlighter. DESIGN.md asks for "a few precise
 * accents", so there are only four token kinds: comments, strings, keys and
 * variables. Anything it is unsure about stays plain text.
 */
export type TokenKind = "comment" | "string" | "key" | "var";
export interface Token {
  text: string;
  kind?: TokenKind;
}

const HASH_COMMENTS = new Set(["bash", "yaml", "hcl", "ini", "dockerfile", "cron", "promql", "python", "nginx", "toml"]);
const PLAIN = new Set(["text", "txt", ""]);

const HCL_BLOCKS = "resource|module|variable|output|terraform|provider|backend|data|locals|ingress|egress|set";
const DOCKER_WORDS =
  "FROM|RUN|COPY|ADD|CMD|ENTRYPOINT|ENV|ARG|WORKDIR|EXPOSE|USER|VOLUME|LABEL|HEALTHCHECK|SHELL|STOPSIGNAL|ONBUILD";
const SQL_WORDS =
  "SELECT|FROM|WHERE|CREATE|USER|IDENTIFIED|BY|GRANT|ON|TO|DATABASE|TABLE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|SHOW|VIEW|TRIGGER|EVENT|LOCK|TABLES|AND|OR|ORDER|GROUP|LIMIT|AS|JOIN";

/** Leading "key" of a line, per language. Group 1 is untouched prefix, group 2 the key. */
function keyPattern(lang: string): RegExp | null {
  switch (lang) {
    case "yaml":
      return /^(\s*(?:-\s+)?)([A-Za-z_][\w.\-/]*)(?=:(?:\s|$))/;
    case "hcl":
      return new RegExp(`^(\\s*)((?:${HCL_BLOCKS})(?=\\s+["{])|[A-Za-z_][\\w-]*(?=\\s*=[^=]))`);
    case "ini":
    case "toml":
      return /^(\s*)([A-Za-z_][\w.-]*)(?=\s*=)/;
    case "dockerfile":
      return new RegExp(`^(\\s*)(${DOCKER_WORDS})(?=\\s)`);
    case "nginx":
      return /^(\s*)([a-z_]+)(?=[\s;])/;
    default:
      return null;
  }
}

function scanner(lang: string): RegExp {
  const parts: string[] = [];
  if (HASH_COMMENTS.has(lang)) parts.push("(?<comment>(?<=^|\\s)#.*$)");
  else if (lang === "sql") parts.push("(?<comment>--.*$)");
  parts.push(`(?<string>"(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')`);
  if (lang !== "sql" && lang !== "json") {
    parts.push("(?<var>\\$\\{\\{.*?\\}\\}|\\$\\{[^}\\s]*\\}|\\$[A-Za-z_][A-Za-z0-9_]*)");
  }
  if (lang === "sql") parts.push(`(?<key>\\b(?:${SQL_WORDS})\\b)`);
  return new RegExp(parts.join("|"), "g");
}

function scanLine(line: string, lang: string, re: RegExp): Token[] {
  const tokens: Token[] = [];
  let rest = line;

  const keyRe = keyPattern(lang);
  const keyMatch = keyRe?.exec(line);
  if (keyMatch) {
    if (keyMatch[1]) tokens.push({ text: keyMatch[1] });
    tokens.push({ text: keyMatch[2], kind: "key" });
    rest = line.slice(keyMatch[0].length);
  }

  let last = 0;
  re.lastIndex = 0;
  for (let m = re.exec(rest); m; m = re.exec(rest)) {
    if (m[0] === "") {
      re.lastIndex += 1;
      continue;
    }
    if (m.index > last) tokens.push({ text: rest.slice(last, m.index) });
    const groups = m.groups ?? {};
    let kind: TokenKind = groups.comment ? "comment" : groups.string ? "string" : groups.var ? "var" : "key";
    // In JSON, a string followed by a colon is a key.
    if (lang === "json" && kind === "string" && /^\s*:/.test(rest.slice(m.index + m[0].length))) kind = "key";
    tokens.push({ text: m[0], kind });
    last = m.index + m[0].length;
  }
  if (last < rest.length) tokens.push({ text: rest.slice(last) });
  return tokens;
}

/** Split code into lines of tokens. Unknown or plain languages come back unstyled. */
export function highlight(code: string, lang = ""): Token[][] {
  const lines = code.split("\n");
  if (PLAIN.has(lang)) return lines.map((text) => [{ text }]);
  const re = scanner(lang);
  return lines.map((line) => scanLine(line, lang, re));
}
