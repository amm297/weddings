import { auth, db, storage } from "./firebase";
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";

// Track whether we've already connected to emulators
let emulatorsConnected = false;

/**
 * Connect to Firebase emulators in development environment
 */
export function connectToEmulators() {
  // Only connect once and only in development
  if (emulatorsConnected || process.env.NODE_ENV !== "development") {
    return;
  }

  try {
    console.log("Connecting to Firebase emulators...");

    // Connect to Auth emulator
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });

    // Connect to Firestore emulator
    connectFirestoreEmulator(db, "localhost", 8080);

    // Connect to Storage emulator
    connectStorageEmulator(storage, "localhost", 9199);

    emulatorsConnected = true;
    console.log("Connected to Firebase emulators successfully");
  } catch (error) {
    console.error("Error connecting to Firebase emulators:", error);
  }
}
