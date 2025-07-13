import { auth, db, storage } from "./firebase";
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";

/**
 * Connect to Firebase emulators in development environment
 */
export function connectToEmulators() {
  if (process.env.NODE_ENV === "development") {
    try {
      // Connect to Auth emulator
      connectAuthEmulator(auth, "http://localhost:9099");

      // Connect to Firestore emulator
      connectFirestoreEmulator(db, "localhost", 8080);

      // Connect to Storage emulator
      connectStorageEmulator(storage, "localhost", 9199);

      console.log("Connected to Firebase emulators");
    } catch (error) {
      console.error("Error connecting to Firebase emulators:", error);
    }
  }
}
