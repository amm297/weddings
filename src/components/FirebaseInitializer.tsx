"use client";

import { useEffect } from "react";
import { connectToEmulators } from "@/lib/firebase-emulators";

// Connect to emulators immediately in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  connectToEmulators();
}

export default function FirebaseInitializer() {
  useEffect(() => {
    // Log that Firebase is initialized
    console.log("Firebase initialized");
  }, []);

  return null;
}
