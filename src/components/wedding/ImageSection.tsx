"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import { WeddingLayout } from "./WeddingLayout";
import { Section } from "@/db/wedding-model";

export function ImageSection({ id, isEven }: { id: string; isEven: boolean }) {
  const section = useWeddingSection(id) as Section;
  const { title, subtitle } = section;

  return (
    <WeddingLayout
      id={id}
      title={title}
      subtitle={subtitle}
      isEven={isEven}
      sectionStyle={section.style}
    >
      <></>
    </WeddingLayout>
  );
}
