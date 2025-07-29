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
import sharp from "sharp";
import { processDateFields } from "./date-parser";
import crypto from "crypto";
import processImage from "./processos/image";

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

// Public images directory
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public", "images");

// Ensure the images directory exists
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
  console.log(`Created directory: ${PUBLIC_IMAGES_DIR}`);
}

// Helper function to check if a string is a file path
function isImagePath(str: string): boolean {
  if (typeof str !== "string") return false;

  // Extract just the file path part (before any parameters)
  const filePath = str.split(" ")[0];

  // Check if the string looks like a file path with image extension
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"];
  const hasImageExtension = imageExtensions.some((ext) =>
    filePath.toLowerCase().endsWith(ext)
  );

  // Check if the file exists (for local paths)
  const exists =
    hasImageExtension &&
    (fs.existsSync(filePath) ||
      fs.existsSync(path.join(process.cwd(), filePath)));

  return exists;
}

// Helper function to generate a unique filename
function generateUniqueFilename(
  originalPath: string,
  format: string,
  weddingId?: string
): string {
  const hash = crypto
    .createHash("md5")
    .update(originalPath + Date.now().toString())
    .digest("hex")
    .substring(0, 8);

  const originalFilename = path.basename(originalPath.split(" ")[0]);
  const nameWithoutExt = originalFilename.substring(
    0,
    originalFilename.lastIndexOf(".")
  );

  // Create the directory path for the image, organized by wedding ID if provided
  const imageDir = weddingId
    ? path.join(PUBLIC_IMAGES_DIR, weddingId)
    : PUBLIC_IMAGES_DIR;

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  // Generate the filename for storage
  const filename = `${nameWithoutExt}-${hash}.${format}`;

  // Return the URL path that will be used in the app (relative to public)
  return weddingId ? `/images/${weddingId}/${filename}` : `/images/${filename}`;
}

// Helper function to process image paths in the wedding data
async function processImagePaths(data: any, weddingId: string): Promise<any> {
  if (!data || typeof data !== "object") {
    return data;
  }

  // If it's an array, process each element
  if (Array.isArray(data)) {
    const results = [];
    for (const item of data) {
      results.push(await processImagePaths(item, weddingId));
    }
    return results;
  }

  // Process object properties
  const result: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string" && isImagePath(value)) {
      // Process image path and get public URL
      console.log(`Found image path in field "${key}": ${value}`);

      // Format: "path width height format"
      const parts = value.split(" ");
      const filePath = parts[0];
      const width = parts.length > 1 ? parseInt(parts[1], 10) : 0;
      const height = parts.length > 2 ? parseInt(parts[2], 10) : 0;
      const format = parts.length > 3 ? parts[3] : "webp";
      const quality = 100; // Default quality

      // Generate the URL path for Firestore
      const urlPath = generateUniqueFilename(filePath, format, weddingId);

      // Create the full filesystem path for the image
      const outputFilePath = path.join(process.cwd(), "public", urlPath);

      // Process the image and store the URL
      await processImage(filePath, {
        outputPath: outputFilePath,
        width,
        height,
        quality,
        format,
        preserveAspectRatio: true,
        preserveResolution: false,
      });

      // Store the URL path in the result
      result[key] = urlPath;
    } else if (typeof value === "object") {
      // Recursively process nested objects
      result[key] = await processImagePaths(value, weddingId);
    } else {
      // Keep other values as is
      result[key] = value;
    }
  }

  return result;
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
    const dataWithDates = processDateFields(weddingData);

    // Get the document ID or use the slug as ID
    const docId = dataWithDates.id || dataWithDates.slug;

    if (!docId) {
      throw new Error("Wedding data must have an id or slug field");
    }

    // Process image paths in the wedding data
    console.log("Processing image paths...");
    const processedData = await processImagePaths(dataWithDates, docId);

    // Add timestamps
    const timestamp = Timestamp.now();
    const dataWithTimestamps = {
      ...processedData,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Import the data to Firestore
    await setDoc(doc(db, "weddings", docId), dataWithTimestamps);
    console.log(`Successfully imported wedding data with ID: ${docId}`);
    console.log(`Images processed and saved to: public/images/${docId}/`);

    process.exit(0);
  } catch (error) {
    console.error("Error importing wedding data:", error);
    process.exit(1);
  }
}

// Run the import function
importWeddingData().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
