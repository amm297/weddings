import { toZonedTime } from "date-fns-tz";
import { formatDate } from "@/lib/date-utils";

// Default timezone for the application if not specified in the data
const DEFAULT_TIMEZONE = "Europe/Madrid";

// Helper function to process date fields in the wedding data
export function processDateFields(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  // If it's an array, process each element
  if (Array.isArray(data)) {
    return data.map((item) => processDateFields(item));
  }

  // Get timezone from the data if available
  const timezone = data.timezone || DEFAULT_TIMEZONE;

  // Process object properties
  const result: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
    ) {
      // Convert ISO date strings to Firestore timestamps with timezone handling
      const zonedDate = toZonedTime(new Date(value), timezone);

      // result[key] = Timestamp.fromDate(zonedDate);
      result[key] = formatDate(zonedDate, "dd/MM/yyyy HH:mm:ss", {
        timezone,
      });
    } else if (key === "date" && typeof value === "string") {
      // Special handling for date fields with timezone handling
      // For date-only strings, append the time component
      const dateString = value.includes("T") ? value : `${value}T00:00:00`;

      const zonedDate = toZonedTime(new Date(dateString), timezone);

      // result[key] = Timestamp.fromDate(zonedDate);
      result[key] = formatDate(zonedDate, "dd/MM/yyyy HH:mm:ss", {
        timezone,
      });
    } else if (key === "deadline" && typeof value === "string") {
      // Special handling for deadline fields with timezone handling
      const dateString = value.includes("T") ? value : `${value}T00:00:00`;
      const zonedDate = toZonedTime(new Date(dateString), timezone);
      // result[key] = Timestamp.fromDate(zonedDate);
      result[key] = formatDate(zonedDate, "dd/MM/yyyy HH:mm:ss", {
        timezone,
      });
    } else if (key === "timezone") {
      // Keep the timezone information
      result[key] = value;
    } else if (typeof value === "object") {
      // Recursively process nested objects, passing the current timezone context
      result[key] = processDateFields(value);
    } else {
      // Keep other values as is
      result[key] = value;
    }
  }

  return result;
}
