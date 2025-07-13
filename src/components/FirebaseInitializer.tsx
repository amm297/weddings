"use client";

import { useEffect } from "react";
import { connectToEmulators } from "@/lib/firebase-emulators";

export default function FirebaseInitializer() {
  useEffect(() => {
    // Connect to emulators in development
    connectToEmulators();
  }, []);

  return null;
}
