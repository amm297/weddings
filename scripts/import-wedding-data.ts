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

// Helper function to process an image and get its base64 string
async function processImage(imagePath: string): Promise<string> {
  try {
    // Parse the image path and parameters
    // Format: "path width height format"
    const parts = imagePath.split(" ");
    const filePath = parts[0];
    const width = parts.length > 1 ? parseInt(parts[1], 10) : 0;
    const height = parts.length > 2 ? parseInt(parts[2], 10) : 0;
    const format = parts.length > 3 ? parts[3] : "webp";
    const quality = 80; // Default quality

    // Resolve the image path if it's relative
    const resolvedPath = fs.existsSync(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);

    console.log(
      `Processing image: ${resolvedPath} (${width}x${height}, ${format})`
    );

    // Process the image directly using Sharp
    let sharpInstance = sharp(resolvedPath);

    // Resize if dimensions are provided
    if (width > 0 || height > 0) {
      sharpInstance = sharpInstance.resize(width || null, height || null, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // Apply format-specific optimizations
    switch (format.toLowerCase()) {
      case "webp":
        sharpInstance = sharpInstance.webp({ quality });
        break;
      case "jpeg":
      case "jpg":
        sharpInstance = sharpInstance.jpeg({ quality, mozjpeg: true });
        break;
      case "png":
        sharpInstance = sharpInstance.png({ quality, compressionLevel: 9 });
        break;
      case "avif":
        sharpInstance = sharpInstance.avif({ quality });
        break;
      default:
        sharpInstance = sharpInstance.webp({ quality });
    }

    // Convert to base64
    const buffer = await sharpInstance.toBuffer();
    const base64Image = `data:image/${format};base64,${buffer.toString(
      "base64"
    )}`;

    return base64Image;
  } catch (error) {
    console.error(`Error processing image ${imagePath}:`, error);
    return imagePath; // Return the original path if processing fails
  }
}

// Helper function to process image paths in the wedding data
async function processImagePaths(data: any): Promise<any> {
  if (!data || typeof data !== "object") {
    return data;
  }

  // If it's an array, process each element
  if (Array.isArray(data)) {
    const results = [];
    for (const item of data) {
      results.push(await processImagePaths(item));
    }
    return results;
  }

  // Process object properties
  const result: any = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string" && isImagePath(value)) {
      // Process image path to base64
      console.log(`Found image path in field "${key}": ${value}`);
      result[key] = await processImage(value);
    } else if (typeof value === "object") {
      // Recursively process nested objects
      result[key] = await processImagePaths(value);
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

    // Process image paths in the wedding data
    console.log("Processing image paths...");
    const processedData = await processImagePaths(dataWithDates);

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
importWeddingData().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
