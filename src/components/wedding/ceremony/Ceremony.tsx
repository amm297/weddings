import { Button } from "@/components/ui/button";
import { CeremonySection } from "@/db";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import Link from "next/link";

export function Ceremony({ section }: { section: CeremonySection }) {
  const { couple, date } = section;

  return (
    <div>
      <p className="font-sectionHeadline text-center text-lg md:text-xl text-foreground/80 mb-4 tracking-widest">
        ¡Nos Casamos!
      </p>
      <h1 className="font-sageffine text-5xl md:text-7xl">
        <div className="flex justify-center items-center">
          <span className="flex-1 text-right pr-4">{couple.person1.name}</span>
          <span className="mx-2">&amp;</span>
          <span className="flex-1 text-left pl-4">{couple.person2.name}</span>
        </div>
      </h1>
      <div className="mt-8 flex items-center justify-center gap-4 text-foreground/90">
        <p className="font-pinyon text-2xl md:text-4xl">
          {formatDate(date, "dd.MM.yyyy")}
        </p>
      </div>
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
          <Link href={`#rsvp`}>RSVP</Link>
        </Button>
      </div>
    </div>
  );
}
