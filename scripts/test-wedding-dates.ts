import { processDateFields } from "./date-parser";
import {
  parseDate,
  formatDate,
  formatDateWithDay,
  DEFAULT_TIMEZONE,
} from "../src/lib/date-utils";

// Sample wedding data with dates
const weddingData = {
  slug: "test-wedding",
  summary: {
    couple: {
      person1: { name: "Person1" },
      person2: { name: "Person2" },
    },
    date: "2025-11-08",
    ceremonyStart: "2025-11-08T13:00:00",
    ceremonyEnd: "2025-11-09T00:30:00",
  },
  sections: [
    {
      id: "ceremony",
      date: "2025-11-08T00:00:00",
      timezone: "Europe/Madrid",
      countdown: true,
    },
  ],
};

console.log("Testing date handling with timezone information\n");

// Test parsing dates from the wedding data
console.log("Original wedding data dates:");
console.log(`Date: ${weddingData.summary.date}`);
console.log(`Ceremony Start: ${weddingData.summary.ceremonyStart}`);
console.log(`Ceremony End: ${weddingData.summary.ceremonyEnd}`);
console.log(`Section Date: ${weddingData.sections[0].date}`);
console.log(`Section Timezone: ${weddingData.sections[0].timezone}`);
console.log();

// Parse dates using date-utils
console.log("Parsed dates using date-utils:");
const parsedDate = parseDate(weddingData.summary.date);
const parsedCeremonyStart = parseDate(weddingData.summary.ceremonyStart);
const parsedCeremonyEnd = parseDate(weddingData.summary.ceremonyEnd);
const parsedSectionDate = parseDate(
  weddingData.sections[0].date,
  undefined,
  weddingData.sections[0].timezone
);

console.log(`Default timezone: ${DEFAULT_TIMEZONE}`);
console.log(`Date: ${parsedDate.toISOString()} (${parsedDate.toString()})`);
console.log(
  `Ceremony Start: ${parsedCeremonyStart.toISOString()} (${parsedCeremonyStart.toString()})`
);
console.log(
  `Ceremony End: ${parsedCeremonyEnd.toISOString()} (${parsedCeremonyEnd.toString()})`
);
console.log(
  `Section Date: ${parsedSectionDate.toISOString()} (${parsedSectionDate.toString()})`
);
console.log();

// Format dates using date-utils
console.log("Formatted dates using date-utils:");
console.log(`Date: ${formatDate(parsedDate, "yyyy-MM-dd HH:mm:ss")}`);
console.log(
  `Ceremony Start: ${formatDate(parsedCeremonyStart, "yyyy-MM-dd HH:mm:ss")}`
);
console.log(
  `Ceremony End: ${formatDate(parsedCeremonyEnd, "yyyy-MM-dd HH:mm:ss")}`
);
console.log(
  `Section Date: ${formatDate(parsedSectionDate, "yyyy-MM-dd HH:mm:ss", {
    timezone: weddingData.sections[0].timezone,
  })}`
);
console.log();

// Process wedding data using date-parser
console.log("Processing wedding data with date-parser:");
const processedData = processDateFields(weddingData);

// Display processed timestamps
console.log("Processed timestamps:");
if (processedData.summary.date && "seconds" in processedData.summary.date) {
  const date = new Date(processedData.summary.date.seconds * 1000);
  console.log(`Date: ${date.toISOString()} (${date.toString()})`);
}

if (
  processedData.summary.ceremonyStart &&
  "seconds" in processedData.summary.ceremonyStart
) {
  const ceremonyStart = new Date(
    processedData.summary.ceremonyStart.seconds * 1000
  );
  console.log(
    `Ceremony Start: ${ceremonyStart.toISOString()} (${ceremonyStart.toString()})`
  );
}

if (
  processedData.summary.ceremonyEnd &&
  "seconds" in processedData.summary.ceremonyEnd
) {
  const ceremonyEnd = new Date(
    processedData.summary.ceremonyEnd.seconds * 1000
  );
  console.log(
    `Ceremony End: ${ceremonyEnd.toISOString()} (${ceremonyEnd.toString()})`
  );
}

if (
  processedData.sections[0].date &&
  "seconds" in processedData.sections[0].date
) {
  const sectionDate = new Date(processedData.sections[0].date.seconds * 1000);
  console.log(
    `Section Date: ${sectionDate.toISOString()} (${sectionDate.toString()})`
  );
}

console.log(`Section Timezone: ${processedData.sections[0].timezone}`);
