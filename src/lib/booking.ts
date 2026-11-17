/**
 * Availability for the free intro call. These are the owner's working hours:
 * change them here and the booking calendar follows.
 *
 * The calendar sends a request; it does not check a live diary. The time is
 * confirmed by email, and the dialog says so.
 */
export const booking = {
  title: "Free 30-minute intro call",
  minutes: 30,
  /** India Standard Time: UTC+5:30, no daylight saving. */
  timeZoneLabel: "IST",
  utcOffsetMinutes: 330,
  /** Days offered, 0 = Sunday … 6 = Saturday. */
  weekdays: [1, 2, 3, 4, 5, 6],
  /** Start times offered each day, in IST, 24-hour clock. */
  startHours: [10, 11, 12, 14, 15, 16, 17, 18],
  /** How far ahead someone can book, and the minimum notice. */
  windowDays: 21,
  minNoticeDays: 1,
} as const;

export interface BookingDay {
  /** yyyy-mm-dd in IST. */
  key: string;
  year: number;
  month: number;
  day: number;
  weekday: number;
  bookable: boolean;
}

const DAY_MS = 86_400_000;

/**
 * Calendar cells from the Monday of the current IST week to the end of the
 * booking window, padded to whole weeks so the grid is rectangular.
 */
export function bookingDays(now: number): BookingDay[] {
  const offset = booking.utcOffsetMinutes * 60_000;
  // "Today" in IST, held as a UTC midnight so the UTC getters read IST values.
  const ist = new Date(now + offset);
  const today = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate());
  const mondayOffset = (new Date(today).getUTCDay() + 6) % 7;
  const start = today - mondayOffset * DAY_MS;
  const first = today + booking.minNoticeDays * DAY_MS;
  const last = today + booking.windowDays * DAY_MS;
  const cells = Math.ceil((last - start) / DAY_MS / 7 + 1 / 7) * 7;

  return Array.from({ length: cells }, (_, i) => {
    const date = new Date(start + i * DAY_MS);
    const weekday = date.getUTCDay();
    const time = date.getTime();
    return {
      key: date.toISOString().slice(0, 10),
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      day: date.getUTCDate(),
      weekday,
      bookable: time >= first && time <= last && (booking.weekdays as readonly number[]).includes(weekday),
    };
  });
}

/** The instant a slot starts, as a real Date. */
export const slotDate = (day: BookingDay, hour: number) =>
  new Date(Date.UTC(day.year, day.month, day.day, hour, 0) - booking.utcOffsetMinutes * 60_000);

export const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;
