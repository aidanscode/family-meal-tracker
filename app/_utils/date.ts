export function formatTimestamp(ts: number): string {
  return Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(ts);
}
