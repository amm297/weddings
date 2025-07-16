"use client";

import {  Calendar, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { formatDate } from "@/lib/date-utils";
import { fromCamelCaseToWords } from "@/utils/string";

export function Footer() {
  const { couple, date, location, sections } = useWeddingConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent py-12 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="font-sageffine text-2xl text-primary">
              {couple.person1.name} & {couple.person2.name}
            </p>
            <p className="text-sm mt-1 text-foreground/70 flex items-center justify-center md:justify-start gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {formatDate(date.date, "EEEE, d 'de' MMMM 'de' yyyy")}
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="default" size="sm">
              <Mail className="mr-2 h-4 w-4" /> Contactanos
            </Button>
          </div>
        </div>

        <Separator className="my-6 bg-primary/20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center md:text-left">
            <h3 className="font-headline text-lg mb-2">Lugar</h3>
            <p className="text-sm text-foreground/70">{location.name}</p>
            <p className="text-sm text-foreground/70">
              {location.address}
            </p>
            <p className="text-sm text-foreground/70">{location.city}</p>
          </div>

          <div className="text-center">
            <h3 className="font-headline text-lg mb-2">Enlaces rápidos</h3>
            <nav className="flex flex-col gap-1">
              {sections?.filter((item) => item !== "hero")?.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  {fromCamelCaseToWords(item)}
                </Link>
              ))}
            </nav>
          </div>

        </div>

        <Separator className="my-6 bg-primary/20" />

        <div className="text-center text-sm text-foreground/60">
          <p>
            © {currentYear} {couple.person1.name} & {couple.person2.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
