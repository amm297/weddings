"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import { WeddingLayout } from "./WeddingLayout";
import { CeremonySection, Section } from "@/db/wedding-model";
import { Ceremony } from "./ceremony/Ceremony";
import { Card, CardContent } from "../ui/card";
import { BlankSection } from "./blankSeciton/BlankSection";

export function DefaultSection({
  id,
  isEven,
}: {
  id: string;
  isEven: boolean;
}) {
  const section = useWeddingSection(id) as Section;
  const { title, subtitle } = section;

  const renderSection = () => {
    switch (id) {
      case "ceremony":
        return <Ceremony section={section as CeremonySection} />;
      default:
        return <BlankSection section={section} />;
    }
  };

  return (
    <WeddingLayout
      id={id}
      title={title}
      subtitle={subtitle}
      isEven={isEven}
      backgroundImage={section.backgroundImage}
      overlay={section.overlay}
    >
      <Card className="max-w-3xl mx-auto bg-background/50 backdrop-blur-sm border-primary/20 bg-accent">
        <CardContent className="pt-6 pb-8 px-6 md:px-10">
          {renderSection()}
        </CardContent>
      </Card>
    </WeddingLayout>
  );
}
