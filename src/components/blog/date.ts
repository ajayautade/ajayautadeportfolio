/** "2026-11-13" → "13 Nov 2026". Parsed as UTC so the day never shifts with the server's time zone. */
export const formatPostDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
