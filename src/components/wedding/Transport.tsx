"use client";

import { WeddingLayout } from "./WeddingLayout";
import { Transport as TransportComponent } from "./transport/Transport";
import { Section, TransportSection } from "@/db/wedding-model";
import { useWeddingSection } from "@/hooks/use-wedding-section";

export function Transport({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("transport") as Section;
  return (
    <WeddingLayout
      id="transport"
      title={section.title}
      subtitle={section.subtitle}
      isEven={isEven}
    >
      <TransportComponent section={section as TransportSection} />
    </WeddingLayout>
  );
}
