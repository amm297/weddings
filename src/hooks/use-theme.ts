"use client";

import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useWeddingConfig } from "./use-wedding-config";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  const { colorScheme } = useWeddingConfig();

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return {
    ...context,
    colorScheme,
  };
};
