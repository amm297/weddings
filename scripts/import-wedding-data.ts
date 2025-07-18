import * as fs from "fs";
import * as path from "path";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  connectFirestoreEmulator,
} from "firebase/firestore";
import dotenv from "dotenv";

// Parse command line arguments
const args = process.argv.slice(2);
const prod = args.includes("--prod");
const useEmulator = args.includes("--use-emulator");

// Load environment variables
if (prod) {
  console.log("Run for production");
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config();
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate Firebase configuration
const requiredFields = ["apiKey", "projectId", "appId"] as const;
const missingFields = requiredFields.filter((field) => !firebaseConfig[field]);

if (missingFields.length > 0) {
  console.error(
    `Error: Missing required Firebase configuration fields: ${missingFields.join(
      ", "
    )}`
  );
  console.error(
    "Make sure your .env or .env.production file contains these variables"
  );
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Connect to Firebase emulator if specified
if (useEmulator) {
  connectFirestoreEmulator(db, "localhost", 8080);
  console.log("Connected to Firestore emulator");
}

async function importWeddingData() {
  try {
    // Read the wedding data JSON file
    const dataPath = path.join(process.cwd(), ".wedding-data.json");

    // Check if the file exists
    if (!fs.existsSync(dataPath)) {
      console.error(`Error: Wedding data file not found at ${dataPath}`);
      console.error(
        "Please create a .wedding-data.json file in the project root"
      );
      process.exit(1);
    }

    const rawData = fs.readFileSync(dataPath, "utf8");
    const weddingData = JSON.parse(rawData);

    console.log("Importing wedding data...");

    // Process dates in the wedding data
    const processedData = processDateFields(weddingData);

    // Add timestamps
    const timestamp = Timestamp.now();
    const dataWithTimestamps = {
      ...processedData,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Get the document ID or use the slug as ID
    const docId = processedData.id || processedData.slug;

    if (!docId) {
      throw new Error("Wedding data must have an id or slug field");
    }

    // Import the data to Firestore
    await setDoc(doc(db, "weddings", docId), dataWithTimestamps);
    console.log(`Successfully imported wedding data with ID: ${docId}`);

    process.exit(0);
  } catch (error) {
    console.error("Error importing wedding data:", error);
    process.exit(1);
  }
}

// Helper function to process date fields in the wedding data
function processDateFields(data: any): any {
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

// Run the import function
importWeddingData();
