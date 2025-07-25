"use client";

import { Calendar, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { formatDate } from "@/lib/date-utils";
import { useNavigationSections } from "@/hooks/use-navigation-sections";

export function Footer() {
  const { summary } = useWeddingConfig();
  const sections = useNavigationSections();
  const currentYear = new Date().getFullYear();

  const coupleName = `${summary?.couple?.person1?.name} & ${summary?.couple?.person2?.name}`;

  return (
    <footer className="bg-accent py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="font-sageffine text-2xl text-primary">{coupleName}</p>
            <p className="text-sm mt-1 text-foreground/70 flex items-center justify-center md:justify-start gap-1">
              <Calendar className="w-3 h-3" />
              <span className="first-letter:uppercase">
                {formatDate(summary?.date, "EEEE, d 'de' MMMM 'de' yyyy")}
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="default" size="sm" asChild>
              <Link href={`mailto:${summary?.contact?.email}`}>
                <Mail className="mr-2 h-4 w-4" /> Contáctanos
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="my-6 bg-primary/20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className="text-center md:text-left hover:cursor-pointer"
            onClick={() => {
              window.open(summary?.location?.googleMapsUrl, "_blank");
            }}
          >
            <h3 className="font-headline text-lg mb-2">Lugar</h3>
            <p className="text-sm text-foreground/70">
              {summary?.location?.name}
            </p>
            <p className="text-sm text-foreground/70">
              {summary?.location?.address}
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-headline text-lg mb-2">Enlaces rápidos</h3>
            <nav className="flex flex-col gap-1">
              {sections?.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  {section.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-6 bg-primary/20" />

        <div className="text-center text-sm text-foreground/60">
          <p>
            © {currentYear} {coupleName}
          </p>
        </div>
      </div>
    </footer>
  );
}
