import {
  parseDate,
  serializeDate,
  formatDate,
  formatDateWithDay,
  formatShortDate,
  formatFullDate,
  DEFAULT_TIMEZONE,
} from "../src/lib/date-utils";

// Test dates
const testDates = [
  "2023-12-31T23:00:00Z", // UTC time
  "2023-12-31T23:00:00+01:00", // Europe/Madrid time
  "2023-12-31T17:00:00-05:00", // America/New_York time
  "2024-01-01T07:00:00+09:00", // Asia/Tokyo time
];

console.log(`Testing date-utils with timezone: ${DEFAULT_TIMEZONE}\n`);

// Test parseDate function
console.log("Testing parseDate:");
testDates.forEach((dateStr) => {
  const parsed = parseDate(dateStr);
  console.log(`Original: ${dateStr}`);
  console.log(`Parsed: ${parsed.toISOString()}`);
  console.log(`Local: ${parsed.toString()}`);
  console.log("---");
});

// Test serializeDate function
console.log("\nTesting serializeDate:");
testDates.forEach((dateStr) => {
  const parsed = parseDate(dateStr);
  const serialized = serializeDate(parsed);
  console.log(`Original: ${dateStr}`);
  console.log(`Serialized: ${serialized}`);
  console.log("---");
});

// Test formatting functions
console.log("\nTesting formatting functions:");
testDates.forEach((dateStr) => {
  const parsed = parseDate(dateStr);
  console.log(`Original: ${dateStr}`);
  console.log(`formatDate: ${formatDate(parsed, "yyyy-MM-dd HH:mm:ss")}`);
  console.log(`formatDateWithDay: ${formatDateWithDay(parsed)}`);
  console.log(`formatShortDate: ${formatShortDate(parsed)}`);
  console.log(`formatFullDate: ${formatFullDate(parsed)}`);
  console.log("---");
});

// Test with a Firebase Timestamp-like object
console.log("\nTesting with Firebase Timestamp-like object:");
const timestampObj = {
  seconds: Math.floor(new Date("2023-12-31T23:00:00Z").getTime() / 1000),
  nanoseconds: 0,
};
const parsedTimestamp = parseDate(timestampObj);
console.log(`Original timestamp: ${JSON.stringify(timestampObj)}`);
console.log(`Parsed: ${parsedTimestamp.toISOString()}`);
console.log(`Local: ${parsedTimestamp.toString()}`);
console.log(`Serialized: ${serializeDate(timestampObj)}`);
