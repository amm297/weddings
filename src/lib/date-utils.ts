import {
  format,
  formatDistance,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isAfter,
  isBefore,
  parseISO,
  Locale,
  parse,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";

/**
 * Date formatting utilities - façade for date-fns
 */

// Default settings for Spain
export const DEFAULT_LOCALE = es;
export const DEFAULT_TIMEZONE = "Europe/Madrid";

export const parseDate = (
  date: string | undefined | Date | { seconds: number; nanoseconds: number },
  format?: string
): Date => {
  if (!date) return new Date();

  // If it's already a Date object, return it
  if (date instanceof Date) {
    return date;
  }

  // If it's a string
  if (typeof date === "string") {
    // Check if it looks like an ISO date (contains T and Z)
    if (date.includes("T") && (date.includes("Z") || date.includes("+"))) {
      return parseISO(date);
    }

    // If format is provided, use parse
    if (format) {
      return parse(date, format, new Date(), { locale: DEFAULT_LOCALE });
    }

    // Default to parseISO for other string formats
    return parseISO(date);
  }

  // Handle Firebase Timestamp
  if (typeof date === "object" && "seconds" in date && "nanoseconds" in date) {
    return new Date(date.seconds * 1000);
  }

  // Fallback
  return new Date();
};

/**
 * Convert Firebase Timestamp or Date object to serializable format
 * This helps avoid "Only plain objects can be passed to Client Components from Server Components" errors
 */
export const serializeDate = (date: any): string => {
  if (!date) return "";

  // Handle Firebase Timestamp
  if (
    date &&
    typeof date === "object" &&
    "seconds" in date &&
    "nanoseconds" in date
  ) {
    return new Date(date.seconds * 1000).toISOString();
  }

  // Handle regular Date objects
  if (date instanceof Date) {
    return date.toISOString();
  }

  // If it's already a string, return as is
  if (typeof date === "string") {
    return date;
  }

  // Fallback
  return "";
};

/**
 * Format a date with the specified format string
 */
export const formatDate = (
  date: Date | string | number,
  formatStr: string,
  options?: { locale?: Locale }
): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: DEFAULT_LOCALE, ...options });
};

/**
 * Get time difference between two dates in days, hours, minutes, seconds
 */
export const getTimeDifference = (
  targetDate: Date | string,
  baseDate: Date | string = new Date()
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  percentComplete: number;
  isToday: boolean;
} => {
  const target =
    typeof targetDate === "string" ? parseISO(targetDate) : targetDate;
  const base = typeof baseDate === "string" ? parseISO(baseDate) : baseDate;

  if (isBefore(target, base)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      percentComplete: 100, // If target date is in the past, percentage is 100%
      isToday: false,
    };
  }

  const days = differenceInDays(target, base);
  const hours = differenceInHours(target, base) % 24;
  const minutes = differenceInMinutes(target, base) % 60;
  const seconds = differenceInSeconds(target, base) % 60;
  const totalSeconds = differenceInSeconds(target, base);
  // Don't calculate percentComplete here, it will be calculated in the component
  const percentComplete = 0;
  const isToday = isSameDay(target, base);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    percentComplete,
    isToday,
  };
};

/**
 * Format a date in a human-readable format (Month Day, Year)
 */
export const formatFullDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "MMMM d, yyyy", { locale: DEFAULT_LOCALE });
};

/**
 * Format a date with day of week (Day of Week, Month Day, Year)
 */
export const formatDateWithDay = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "EEEE, MMMM d, yyyy", { locale: DEFAULT_LOCALE });
};

/**
 * Format a date in short format (MM/DD/YYYY)
 */
export const formatShortDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, "dd/MM/yyyy", { locale: DEFAULT_LOCALE });
};

/**
 * Get a human-readable relative time message
 */
export const getRelativeTime = (
  date: Date | string,
  baseDate: Date | string = new Date()
): string => {
  const target = typeof date === "string" ? parseISO(date) : date;
  const base = typeof baseDate === "string" ? parseISO(baseDate) : baseDate;

  return formatDistance(target, base, {
    addSuffix: true,
    locale: DEFAULT_LOCALE,
  });
};

/**
 * Check if a date has passed
 */
export const isDatePassed = (date: Date | string | undefined): boolean => {
  if (!date) return false;
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return isAfter(new Date(), dateObj);
};

/**
 * Format time (assumes 12-hour format with AM/PM)
 */
export const formatTime = (timeStr: string): string => {
  // This is a pass-through function in case we need to modify time formatting later
  return timeStr;
};
