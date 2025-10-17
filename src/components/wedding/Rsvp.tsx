"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import { WeddingLayout } from "./WeddingLayout";
import { RsvpSection } from "@/db/wedding-model";
import RSVPForm from "../rsvp/form";
import { isDatePassed } from "@/lib/date-utils";

export function RSVP({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("rsvp") as RsvpSection;
  const { title, subtitle, form, deadline, expiredMessage } = section;

  if (!title || !form) return null;

  return (
    <WeddingLayout id="rsvp" title={title} subtitle={subtitle} isEven={isEven}>
      {deadline && !isDatePassed(deadline) && (
        <>
          {form ? (
            <iframe
              src={form}
              width="100%"
              height="700px"
              className="font-hoves"
            >
              Cargando...
            </iframe>
          ) : (
            <RSVPForm />
          )}
        </>
      )}
      {deadline && isDatePassed(deadline) && (
        <p className="text-center text-foreground/80 mb-4">
          {expiredMessage ||
            "La fecha para confirmar tu asistencia ha pasado, pero tu cariño y buenos deseos son igualmente importantes para nosotros. ¡Gracias por estar en nuestros pensamientos en este día tan especial!"}
        </p>
      )}
    </WeddingLayout>
  );
}
