import { Button } from "@/components/ui/button";
import { CeremonySection } from "@/db";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import Link from "next/link";
import { TimerClean } from "../countdown/TimerClean";

export function Ceremony({ section }: { section: CeremonySection }) {
  const { couple, date, countdown, dateFormat, innerTitle, innerSubtitle } =
    section;

  return (
    <div>
      {innerTitle && (
        <p className="text-center text-lg md:text-xl text-foreground/80 mb-4 tracking-widest">
          {innerTitle}
        </p>
      )}
      {innerSubtitle && (
        <p className="  text-center text-lg md:text-xl text-foreground/80 mb-4 tracking-widest">
          {innerSubtitle}
        </p>
      )}

      <h1 className="font-sageffine text-5xl md:text-7xl">
        <div className="flex md:justify-center items-center md:flex-row flex-col">
          <span className="flex-1 md:text-right text-center md:pr-4">
            {couple.person1.name}
          </span>
          <span className="mx-2">&amp;</span>
          <span className="flex-1 md:text-left text-center md:pl-4">
            {couple.person2.name}
          </span>
        </div>
      </h1>
      <div className="mt-8 flex items-center justify-center gap-4 text-foreground/90">
        <p className="font-pinyon text-2xl md:text-4xl">
          {formatDate(date, dateFormat ?? "dd.MM.yyyy")}
        </p>
      </div>

      {countdown && (
        <div className="mt-10">
          <TimerClean />
        </div>
      )}
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <Button
          variant="default"
          size="lg"
          asChild
          className={cn(
            "font-headline tracking-wide",
            "hover:bg-primary/90 transition-all"
          )}
        >
          <Link href={`#rsvp`}>Confirmar Asistencia</Link>
        </Button>
      </div>
    </div>
  );
}
