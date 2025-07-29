import { serializeDate } from "../src/lib/date-utils";

// Test the serializeDate function with different date formats
console.log("Testing serializeDate function with different formats:");

// Test with DD/MM/YYYY HH:MM:SS format
const dateString1 = "09/11/2025 00:30:00";
console.log(`Input: "${dateString1}" => Output: "${serializeDate(dateString1)}"`);

// Test with DD/MM/YYYYTHH:MM:SS format
const dateString2 = "09/11/2025T00:30:00";
console.log(`Input: "${dateString2}" => Output: "${serializeDate(dateString2)}"`);

// Test with ISO format
const dateString3 = "2025-11-09T00:30:00.000Z";
console.log(`Input: "${dateString3}" => Output: "${serializeDate(dateString3)}"`);

// Test with Date object
const dateObj = new Date(2025, 10, 9, 0, 30, 0); // Note: month is 0-based
console.log(`Input: Date object (${dateObj}) => Output: "${serializeDate(dateObj)}"`); 