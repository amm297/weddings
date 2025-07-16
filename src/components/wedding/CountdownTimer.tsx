"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useWeddingConfig } from "@/hooks/use-wedding-config";

export function CountdownTimer() {
  const config = useWeddingConfig();
  const targetDate = config.date.date;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    percentComplete: 0,
    isWeddingDay: false,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = +targetDate - +now;
      let newTimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        percentComplete: 0,
        isWeddingDay: false,
      };

      if (difference > 0) {
        // Calculate total seconds from wedding announcement (1 year before wedding)
        const weddingAnnouncement = new Date(targetDate);
        weddingAnnouncement.setFullYear(weddingAnnouncement.getFullYear() - 1);
        const totalDuration = +targetDate - +weddingAnnouncement;
        const elapsed = +now - +weddingAnnouncement;
        const percentComplete = Math.min(
          100,
          Math.max(0, (elapsed / totalDuration) * 100)
        );

        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          totalSeconds: Math.floor(difference / 1000),
          percentComplete,
          isWeddingDay: false,
        };
      } else {
        // It's the wedding day or after
        newTimeLeft = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
          percentComplete: 100,
          isWeddingDay: true,
        };
      }

      return newTimeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const currentTimeLeft = calculateTimeLeft();
      setTimeLeft(currentTimeLeft);

      // Clear interval if it's wedding day
      if (currentTimeLeft.isWeddingDay) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isClient]);

  const timeUnits = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-sectionHeadline text-center mb-8 md:mb-12 text-foreground">
          {timeLeft.isWeddingDay
            ? "¡Llegó el día de nuestra boda!"
            : "Cuenta atrás para nuestra boda"}
        </h2>

        <Card className="max-w-4xl mx-auto border-primary/20">
          <CardContent className="p-6 md:p-8">
            <div className="mb-6">
              <Progress value={timeLeft.percentComplete} className="h-2" />
              <p className="text-sm text-muted-foreground text-center mt-2">
                {timeLeft.isWeddingDay
                  ? "¡Es hoy!"
                  : `${timeLeft.percentComplete.toFixed(0)}% de la boda!`}
              </p>
            </div>

            {timeLeft.isWeddingDay ? (
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
                      <Card
                        key={unit.label}
                        className={cn(
                          "flex flex-col items-center p-2 rounded-lg w-20 md:w-28",
                          "transition-all duration-300 ease-out border-primary/20",
                          "hover:border-primary/50 hover:shadow-md"
                        )}
                      >
                        <span className="text-4xl md:text-6xl font-bold font-headline text-primary">
                          {String(unit.value).padStart(2, "0")}
                        </span>
                        <span className="text-sm md:text-base text-foreground/80 mt-1">
                          {unit.label}
                        </span>
                      </Card>
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
