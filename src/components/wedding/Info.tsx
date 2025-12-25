"use client";

import { WeddingLayout } from "./WeddingLayout";
import { useWeddingSection } from "@/hooks/use-wedding-section";
import { Section, DescriptionItem, SectionCTA } from "@/db/wedding-model";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export function Info({ isEven, id }: { isEven: boolean; id: string }) {
  const section = useWeddingSection(id) as Section;

  const { title, subtitle, description, style, icon, cta } = section;

  const renderDescriptionItem = (
    item: string | DescriptionItem,
    index: number
  ) => {
    if (typeof item === "string") {
      return <p key={`ba-desc-${index}`}>{item}</p>;
    }
    return (
      <p key={`ba-desc-${index}`} className={cn(item.itemStyle)}>
        {item.text}
      </p>
    );
  };

  const renderDescription = () => {
    if (typeof description === "string") {
      return (
        <p className="text-center text-foreground/80 mb-12">{description}</p>
      );
    }
    if (Array.isArray(description)) {
      return (
        <div className="flex flex-col text-center text-foreground/80 mb-12 gap-2">
          {description.map((item, index) => renderDescriptionItem(item, index))}
        </div>
      );
    }
  };

  const renderCTAItem = (item: SectionCTA, index: number) => {
    return (
      <Button key={`cta-${index}`} variant="default" asChild>
        <Link href={item.link} target={item.target}>
          {item.text}
        </Link>
      </Button>
    );
  };
  const renderCTA = () => {
    if (!cta) return <></>;

    if (Array.isArray(cta)) {
      return cta.map((item, index) => renderCTAItem(item, index));
    }
    return renderCTAItem(cta as SectionCTA, 0);
  };
  return (
    <WeddingLayout
      id={id}
      isEven={isEven}
      title={title}
      subtitle={subtitle}
      sectionStyle={style}
      icon={icon}
    >
      <div className="max-w-2xl mx-auto">{renderDescription()}</div>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        {renderCTA()}
      </div>
    </WeddingLayout>
  );
}
