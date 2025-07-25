import { formatForGoogleCalendar, parseDate } from "../src/lib/date-utils";

// Test dates for Google Calendar formatting
const testDates = [
  "2025-11-08T13:00:00", // Wedding ceremony start
  "2025-11-09T00:30:00", // Wedding ceremony end
];

console.log("Testing Google Calendar date formatting\n");

testDates.forEach((dateStr) => {
  const date = parseDate(dateStr);
  console.log(`Original date: ${dateStr}`);
  console.log(`Parsed date: ${date.toISOString()}`);
  console.log(`Local representation: ${date.toString()}`);
  console.log(`Google Calendar format: ${formatForGoogleCalendar(date)}`);
  console.log("---");
});

// Test with explicit timezone
console.log("\nTesting with explicit timezone:");
const madridDate = parseDate("2025-11-08T13:00:00", undefined, "Europe/Madrid");
console.log(
  `Original date with Madrid timezone: 2025-11-08T13:00:00 (Europe/Madrid)`
);
console.log(`Parsed date: ${madridDate.toISOString()}`);
console.log(`Local representation: ${madridDate.toString()}`);
console.log(`Google Calendar format: ${formatForGoogleCalendar(madridDate)}`);

// Create Google Calendar URL
const eventTitle = "Boda de Paula & Francisco";
const eventLocation = "Finca El Gasco, Torrelodones, Madrid";
const eventDescription =
  "¡Nos casamos! Ceremonia y celebración en Finca El Gasco.";

const startTime = formatForGoogleCalendar(madridDate);
const endTime = formatForGoogleCalendar(
  parseDate("2025-11-09T00:30:00", undefined, "Europe/Madrid")
);

const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  eventTitle
)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(
  eventDescription
)}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;

console.log("\nGoogle Calendar URL:");
console.log(googleCalendarUrl);
