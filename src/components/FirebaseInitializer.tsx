"use client";

import { useEffect } from "react";
import { connectToEmulators } from "@/lib/firebase-emulators";

// Connect to emulators immediately in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  connectToEmulators();
}

export default function FirebaseInitializer() {
  useEffect(() => {
    // Connect to emulators on component mount in development
    if (process.env.NODE_ENV === "development") {
      connectToEmulators();
    }
  }, []);

  return null;
}
