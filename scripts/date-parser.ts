import { Timestamp } from "firebase/firestore";
// Helper function to process date fields in the wedding data
export function processDateFields(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  // If it's an array, process each element
  if (Array.isArray(data)) {
    return data.map((item) => processDateFields(item));
  }

  // Process object properties
  const result: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (
      typeof value === "string" &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
    ) {
      // Convert ISO date strings to Firestore timestamps
      result[key] = Timestamp.fromDate(new Date(value));
    } else if (key === "date" && typeof value === "string") {
      // Special handling for date fields
      result[key] = Timestamp.fromDate(new Date(value));
    } else if (key === "deadline" && typeof value === "string") {
      // Special handling for deadline fields
      result[key] = Timestamp.fromDate(new Date(value));
    } else if (typeof value === "object") {
      // Recursively process nested objects
      result[key] = processDateFields(value);
    } else {
      // Keep other values as is
      result[key] = value;
    }
  }

  return result;
}
