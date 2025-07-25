"use client";

import { useState, useEffect, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { getTimeDifference, parseDate } from "@/lib/date-utils";
import { toZonedTime } from "date-fns-tz";

// Define CEST timezone
const CEST_TIMEZONE = "Europe/Paris";

export function TimerClean() {
  const { summary } = useWeddingConfig();

  // Parse the date once and memoize it to prevent re-renders
  const targetDate = useMemo(
    () => parseDate(summary.ceremonyStart, undefined, CEST_TIMEZONE),
    [summary.ceremonyStart]
  );

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    percentComplete: 0,
    isToday: false,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Calculate the percentage separately to avoid infinite loop
    const calculatePercentage = () => {
      // Create a date 1 year before the wedding for percentage calculation
      const weddingAnnouncement = new Date(targetDate);
      weddingAnnouncement.setFullYear(weddingAnnouncement.getFullYear() - 1);

      const now = toZonedTime(new Date(), CEST_TIMEZONE);
      const totalDuration = +targetDate - +weddingAnnouncement;
      const elapsed = +now - +weddingAnnouncement;

      return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    };

    const updateTimeLeft = () => {
      const diff = getTimeDifference(targetDate, new Date(), CEST_TIMEZONE);
      const percentage = calculatePercentage();

      setTimeLeft({
        ...diff,
        percentComplete: percentage,
      });
    };

    // Initial update
    updateTimeLeft();

    const timer = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isClient]);

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <>
      {timeLeft.isToday ? (
        <div className="text-center py-8">
          <p className="text-3xl md:text-4xl font-headline text-primary">
            ¡Llegó el día de nuestra boda!
          </p>
          <p className="text-lg mt-4 text-muted-foreground">
            Gracias por compartir este momento especial con nosotros
          </p>
        </div>
      ) : (
        <div className="flex justify-center space-x-2 sm:space-x-4 md:space-x-8 text-center">
          {isClient
            ? timeUnits.map((unit) => (
                <div
                  key={unit.label}
                  className={cn(
                    "flex flex-col items-center p-2 rounded-lg w-20 md:w-28",
                    "transition-all duration-300 ease-out border-primary/20",
                    "hover:border-primary/50 hover:shadow-md"
                  )}
                >
                  <span className="text-4xl md:text-6xl font-pinyon text-primary">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base text-foreground/80 mt-1">
                    {unit.label}
                  </span>
                </div>
              ))
            : timeUnits.map((unit) => (
                <div
                  key={unit.label}
                  className="flex flex-col items-center p-2 rounded-lg w-20 md:w-28"
                >
                  <Skeleton className="w-16 h-16 md:w-24 md:h-24" />
                  <Skeleton className="w-12 h-4 mt-2" />
                </div>
              ))}
        </div>
      )}
    </>
  );
}
