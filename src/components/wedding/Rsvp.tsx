"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import { WeddingLayout } from "./WeddingLayout";
import { RsvpSection } from "@/db/wedding-model";
import RSVPForm from "../rsvp/form";
import { isDatePassed } from "@/lib/date-utils";

export function RSVP({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("rsvp") as RsvpSection;
  const { title, subtitle, form, deadline } = section;
  const isDeadlinePassed = isDatePassed(deadline);

  if (!title || !form) return null;

  const renderForm = () => {
    if (isDeadlinePassed) return <></>;
    return form ? (
      <iframe src={form} width="100%" height="700px" className="font-hoves">
        Cargando...
      </iframe>
    ) : (
      <RSVPForm />
    );
  };
  return (
    <WeddingLayout id="rsvp" title={title} subtitle={subtitle} isEven={isEven}>
      {isDeadlinePassed && (
        <div className="text-center max-w-2xl mx-auto">
          <p>
            ¡Gracias por confirmar tu asistencia! Estamos muy felices de
            compartir este día tan especial contigo.
          </p>
          <p className="mt-4">
            Si necesitas ponerte en contacto con nosotros, no dudes en
            escribirnos o llamarnos. ¡Nos vemos muy pronto!
          </p>
        </div>
      )}

      {renderForm()}
    </WeddingLayout>
  );
}
