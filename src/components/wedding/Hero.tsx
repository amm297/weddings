"use client";

import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { formatDate } from "@/lib/date-utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Hero() {
  const config = useWeddingConfig();
  const pathname = usePathname();

  // Extract the slug from the pathname
  const slug = pathname.split("/")[1];

  console.log(config);

  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-accent">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Card className="max-w-3xl mx-auto bg-background/50 backdrop-blur-sm border-primary/20">
          <CardContent className="pt-6 pb-8 px-6 md:px-10">
            <p className="font-headline text-lg md:text-xl text-foreground/80 mb-4 tracking-widest">
              Nos Casamos
            </p>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
              {config.couple.person1.name} &amp; {config.couple.person2.name}
            </h1>
            <div className="mt-8 flex items-center justify-center gap-4 text-foreground/90">
              <Calendar className="w-6 h-6 text-primary" />
              <p className="font-headline text-2xl md:text-3xl">
                {formatDate(config.date?.date, "EEEE, d 'de' MMMM 'de' yyyy")}
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
                <Link href={`/${slug}/rsvp`}>RSVP</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
