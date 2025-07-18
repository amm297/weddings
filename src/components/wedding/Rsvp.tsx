"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import { WeddingLayout } from "./WeddingLayout";
import { RsvpSection } from "@/db/wedding-model";
import RSVPForm from "../rsvp/form";

export function RSVP({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("rsvp") as RsvpSection;
  const { title, subtitle, form } = section;

  if (!title || !form) return null;

  return (
    <WeddingLayout id="rsvp" title={title} subtitle={subtitle} isEven={isEven}>
      {form ? (
        <iframe src={form} width="100%" height="700px" className="font-hoves">
          Cargando...
        </iframe>
      ) : (
        <RSVPForm />
      )}
    </WeddingLayout>
  );
}
