"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { formatDate } from "@/lib/date-utils";
import RSVPForm from "@/components/rsvp/form";

export default function RSVPPage() {
  const config = useWeddingConfig();

  return (
    <div className="py-20 md:py-32 bg-accent min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-2xl mx-auto bg-background/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl">
              RSVP
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Por favor, confirma tu asistencia antes del{" "}
              {config.rsvpDeadline &&
                formatDate(config.rsvpDeadline, "d 'de' MMMM 'de' yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RSVPForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
