import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a hex color to HSL format for CSS variables
 * @param hex Hex color code (e.g., "#D4AF37")
 * @returns HSL values as a string in the format "H S% L%"
 */
export function hexToHsl(hex: string): string {
  // Remove the # if present
  hex = hex.replace(/^#/, "");

  // Parse the hex values
  let r = parseInt(hex.slice(0, 2), 16) / 255;
  let g = parseInt(hex.slice(2, 4), 16) / 255;
  let b = parseInt(hex.slice(4, 6), 16) / 255;

  // Find the minimum and maximum values to calculate the lightness
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Calculate the lightness
  let l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    // Calculate the saturation
    s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

    // Calculate the hue
    if (max === r) {
      h = (g - b) / (max - min) + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / (max - min) + 2;
    } else {
      h = (r - g) / (max - min) + 4;
    }

    h = Math.round(h * 60);
  }

  // Round the values
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}
