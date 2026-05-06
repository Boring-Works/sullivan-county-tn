import { format } from "date-fns";

export function formatDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`);
  return format(d, "MMMM d, yyyy");
}
