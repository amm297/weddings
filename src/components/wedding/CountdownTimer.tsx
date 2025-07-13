'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return newTimeLeft;
    };
    
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isClient]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-8 md:mb-12 text-foreground">
          Countdown to Our Big Day
        </h2>
        <div className="flex justify-center space-x-2 sm:space-x-4 md:space-x-8 text-center">
          {isClient ? (
            timeUnits.map((unit) => (
              <div key={unit.label} className="flex flex-col items-center p-2 rounded-lg w-20 md:w-28 transition-all duration-300 ease-out">
                <span className="text-4xl md:text-6xl font-bold font-headline text-primary">{String(unit.value).padStart(2, '0')}</span>
                <span className="text-sm md:text-base text-foreground/80 mt-1">{unit.label}</span>
              </div>
            ))
          ) : (
            timeUnits.map((unit) => (
              <div key={unit.label} className="flex flex-col items-center p-2 rounded-lg w-20 md:w-28">
                <Skeleton className="w-16 h-16 md:w-24 md:h-24" />
                <Skeleton className="w-12 h-4 mt-2" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
