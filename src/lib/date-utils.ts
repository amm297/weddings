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
} from "date-fns";
import { es } from "date-fns/locale";

/**
 * Date formatting utilities - façade for date-fns
 */

// Default settings for Spain
export const DEFAULT_LOCALE = es;
export const DEFAULT_TIMEZONE = "Europe/Madrid";

/**
 * Format a date with the specified format string
 */
export const formatDate = (
  date: Date | string | number,
  formatStr: string,
  options?: { locale?: Locale }
): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  console.log("dateObj", dateObj);
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
} => {
  const target =
    typeof targetDate === "string" ? parseISO(targetDate) : targetDate;
  const base = typeof baseDate === "string" ? parseISO(baseDate) : baseDate;

  if (isBefore(target, base)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = differenceInDays(target, base);
  const hours = differenceInHours(target, base) % 24;
  const minutes = differenceInMinutes(target, base) % 60;
  const seconds = differenceInSeconds(target, base) % 60;

  return { days, hours, minutes, seconds };
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
