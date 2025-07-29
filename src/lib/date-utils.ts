import {
  formatDistance,
  differenceInSeconds,
  isAfter,
  isBefore,
  parseISO,
  Locale,
  parse,
  isSameDay,
  sub,
} from "date-fns";
import { es } from "date-fns/locale";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

/**
 * Date formatting utilities - façade for date-fns
 */

// Default settings for Spain
export const DEFAULT_LOCALE = es;
export const DEFAULT_TIMEZONE = "Europe/Madrid";

export const parseDate = (
  date: string | undefined | Date | { seconds: number; nanoseconds: number },
  format?: string,
  timezone: string = DEFAULT_TIMEZONE
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
      // Parse ISO date and convert to the specified timezone
      return toZonedTime(parseISO(date), timezone);
    }

    // If format is provided, use parse and convert to the specified timezone
    if (format) {
      const parsedDate = parse(date, format, new Date(), {
        locale: DEFAULT_LOCALE,
      });
      return toZonedTime(parsedDate, timezone);
    }

    // Default to parseISO for other string formats and convert to the specified timezone
    return toZonedTime(parseISO(date), timezone);
  }

  // Handle Firebase Timestamp
  if (typeof date === "object" && "seconds" in date && "nanoseconds" in date) {
    return toZonedTime(new Date(date.seconds * 1000), timezone);
  }

  // Fallback
  return toZonedTime(new Date(), timezone);
};

/**
 * Convert Firebase Timestamp or Date object to serializable format
 * This helps avoid "Only plain objects can be passed to Client Components from Server Components" errors
 */
export const serializeDate = (
  date: any,
  timezone: string = DEFAULT_TIMEZONE
): string => {
  if (!date) return "";

  // Handle Firebase Timestamp
  if (
    date &&
    typeof date === "object" &&
    "seconds" in date &&
    "nanoseconds" in date
  ) {
    const dateObj = toZonedTime(new Date(date.seconds * 1000), timezone);
    return formatInTimeZone(dateObj, timezone, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
      locale: DEFAULT_LOCALE,
    });
  }

  // Handle regular Date objects
  if (date instanceof Date) {
    return formatInTimeZone(date, timezone, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
      locale: DEFAULT_LOCALE,
    });
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
  options?: { locale?: Locale; timezone?: string }
): string => {
  const timezone = options?.timezone || DEFAULT_TIMEZONE;
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  const zonedDate = toZonedTime(dateObj, timezone);
  return formatInTimeZone(zonedDate, timezone, formatStr, {
    locale: DEFAULT_LOCALE,
    ...options,
  });
};

export const formatDateNoLocale = (
  date: Date | string | number,
  formatStr: string,
  options?: { locale?: Locale; timezone?: string }
): string => {
  const timezone = options?.timezone || DEFAULT_TIMEZONE;
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  const zonedDate = toZonedTime(dateObj, timezone);
  return formatInTimeZone(zonedDate, timezone, formatStr, { ...options });
};

/**
 * Get time difference between two dates in days, hours, minutes, seconds
 */

export const getTimeDifference = (
  targetDate: Date | string,
  baseDate: Date | string = new Date(),
  timezone: string = "Europe/Madrid",
  startDate?: Date | string // opcional para porcentaje completado
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  percentComplete: number;
  isToday: boolean;
} => {
  const toDate = (d: Date | string) =>
    typeof d === "string"
      ? toZonedTime(parseISO(d), timezone)
      : toZonedTime(d, timezone);

  const target = toDate(targetDate);
  const base = toDate(baseDate);

  if (isBefore(target, base)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      percentComplete: 100,
      isToday: false,
    };
  }

  const totalSeconds = differenceInSeconds(target, base);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  let percentComplete = 0;
  if (startDate) {
    const start = toDate(startDate);
    const fullRange = differenceInSeconds(target, start);
    const elapsed = differenceInSeconds(base, start);
    percentComplete = Math.min(Math.max((elapsed / fullRange) * 100, 0), 100);
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    percentComplete,
    isToday: isSameDay(target, base),
  };
};

/**
 * Format a date in a human-readable format (Month Day, Year)
 */
export const formatFullDate = (
  date: Date | string,
  timezone: string = DEFAULT_TIMEZONE
): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  const zonedDate = toZonedTime(dateObj, timezone);
  return formatInTimeZone(zonedDate, timezone, "MMMM d, yyyy", {
    locale: DEFAULT_LOCALE,
  });
};

/**
 * Format a date with day of week (Day of Week, Month Day, Year)
 */
export const formatDateWithDay = (
  date: Date | string,
  timezone: string = DEFAULT_TIMEZONE
): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  const zonedDate = toZonedTime(dateObj, timezone);
  return formatInTimeZone(zonedDate, timezone, "EEEE, MMMM d, yyyy", {
    locale: DEFAULT_LOCALE,
  });
};

/**
 * Format a date in short format (MM/DD/YYYY)
 */
export const formatShortDate = (
  date: Date | string,
  timezone: string = DEFAULT_TIMEZONE
): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  const zonedDate = toZonedTime(dateObj, timezone);
  return formatInTimeZone(zonedDate, timezone, "dd/MM/yyyy", {
    locale: DEFAULT_LOCALE,
  });
};

/**
 * Get a human-readable relative time message
 */
export const getRelativeTime = (
  date: Date | string,
  baseDate: Date | string = new Date(),
  timezone: string = DEFAULT_TIMEZONE
): string => {
  const target =
    typeof date === "string"
      ? toZonedTime(parseISO(date), timezone)
      : toZonedTime(date, timezone);
  const base =
    typeof baseDate === "string"
      ? toZonedTime(parseISO(baseDate), timezone)
      : toZonedTime(baseDate, timezone);

  return formatDistance(target, base, {
    addSuffix: true,
    locale: DEFAULT_LOCALE,
  });
};

/**
 * Check if a date has passed
 */
export const isDatePassed = (
  date: Date | string | undefined,
  timezone: string = DEFAULT_TIMEZONE
): boolean => {
  if (!date) return false;
  const dateObj =
    typeof date === "string"
      ? toZonedTime(parseISO(date), timezone)
      : toZonedTime(date, timezone);
  const now = toZonedTime(new Date(), timezone);
  return isAfter(now, dateObj);
};

/**
 * Format time (assumes 12-hour format with AM/PM)
 */
export const formatTime = (timeStr: string): string => {
  // This is a pass-through function in case we need to modify time formatting later
  return timeStr;
};

export const subTime = (
  date: Date | string,
  { hours, minutes }: { hours: number; minutes: number },
  timezone: string = DEFAULT_TIMEZONE
): Date => {
  const dateObj =
    typeof date === "string"
      ? toZonedTime(parseISO(date), timezone)
      : toZonedTime(date, timezone);
  return toZonedTime(sub(dateObj, { hours, minutes }), timezone);
};

/**
 * Format a date for Google Calendar in the correct format with timezone handling
 * Google Calendar expects dates in UTC format
 */
export const formatForGoogleCalendar = (
  date: Date | string,
  timezone: string = DEFAULT_TIMEZONE
): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  // Convert to UTC time for Google Calendar
  return dateObj.toISOString().replace(/[-:]/g, "").substring(0, 15);
};
