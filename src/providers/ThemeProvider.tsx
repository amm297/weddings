"use client";

import React, { createContext, ReactNode, useEffect } from "react";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { hexToHsl } from "@/lib/utils";

interface ThemeContextType {
  updateTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  updateTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { colorScheme } = useWeddingConfig();

  const updateTheme = () => {
    // Convert hex colors to HSL format for CSS variables
    const primaryHsl = hexToHsl(colorScheme.primary);
    const secondaryHsl = hexToHsl(colorScheme.secondary);
    const accentHsl = hexToHsl(colorScheme.accent);
    const backgroundHsl = hexToHsl(colorScheme.background);
    const textHsl = hexToHsl(colorScheme.text);

    // Update CSS variables
    document.documentElement.style.setProperty("--primary", primaryHsl);
    document.documentElement.style.setProperty("--secondary", secondaryHsl);
    document.documentElement.style.setProperty("--accent", accentHsl);
    document.documentElement.style.setProperty("--background", backgroundHsl);
    document.documentElement.style.setProperty("--foreground", textHsl);

    // Set complementary colors for foregrounds
    document.documentElement.style.setProperty(
      "--primary-foreground",
      backgroundHsl
    );
    document.documentElement.style.setProperty(
      "--secondary-foreground",
      backgroundHsl
    );
    document.documentElement.style.setProperty("--accent-foreground", textHsl);
  };

  // Apply theme when component mounts and when colorScheme changes
  useEffect(() => {
    updateTheme();
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
