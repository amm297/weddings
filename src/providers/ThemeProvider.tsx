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
    // Base colors
    const primaryHsl = hexToHsl(colorScheme.primary);
    const secondaryHsl = hexToHsl(colorScheme.secondary);
    const accentHsl = hexToHsl(colorScheme.accent);
    const backgroundHsl = hexToHsl(colorScheme.background);

    // Text colors
    const textHsl = hexToHsl(colorScheme.text);
    const subtextHsl = hexToHsl(colorScheme.subtext);
    const accentTextHsl = hexToHsl(colorScheme.accentText);

    // Additional colors (with fallbacks)
    const mutedHsl = colorScheme.muted
      ? hexToHsl(colorScheme.muted)
      : accentHsl;
    const borderHsl = colorScheme.border
      ? hexToHsl(colorScheme.border)
      : subtextHsl;
    const inputHsl = colorScheme.input
      ? hexToHsl(colorScheme.input)
      : borderHsl;
    const ringHsl = colorScheme.ring ? hexToHsl(colorScheme.ring) : primaryHsl;
    const destructiveHsl = colorScheme.destructive
      ? hexToHsl(colorScheme.destructive)
      : "0 84.2% 60.2%"; // Default red

    // Update CSS variables
    // Base colors
    document.documentElement.style.setProperty("--primary", primaryHsl);
    document.documentElement.style.setProperty("--secondary", secondaryHsl);
    document.documentElement.style.setProperty("--accent", accentHsl);
    document.documentElement.style.setProperty("--background", backgroundHsl);

    // Text colors
    document.documentElement.style.setProperty("--foreground", textHsl);
    document.documentElement.style.setProperty(
      "--muted-foreground",
      subtextHsl
    );
    document.documentElement.style.setProperty(
      "--accent-foreground",
      accentTextHsl
    );

    // Component foregrounds
    document.documentElement.style.setProperty(
      "--primary-foreground",
      backgroundHsl
    );
    document.documentElement.style.setProperty(
      "--secondary-foreground",
      textHsl
    );
    document.documentElement.style.setProperty(
      "--destructive-foreground",
      backgroundHsl
    );

    // Additional UI component variables
    document.documentElement.style.setProperty("--card", backgroundHsl);
    document.documentElement.style.setProperty("--card-foreground", textHsl);
    document.documentElement.style.setProperty("--popover", backgroundHsl);
    document.documentElement.style.setProperty("--popover-foreground", textHsl);
    document.documentElement.style.setProperty("--muted", mutedHsl);
    document.documentElement.style.setProperty("--border", borderHsl);
    document.documentElement.style.setProperty("--input", inputHsl);
    document.documentElement.style.setProperty("--ring", ringHsl);
    document.documentElement.style.setProperty("--destructive", destructiveHsl);
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
