"use client";

import { WeddingLayout } from "./WeddingLayout";
import { useWeddingSection } from "@/hooks/use-wedding-section";
import { Section, DescriptionItem } from "@/db/wedding-model";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export function Info({ isEven, id }: { isEven: boolean; id: string }) {
  const section = useWeddingSection(id) as Section;

  const { title, description, style, icon, cta } = section;

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

  return (
    <WeddingLayout
      id={id}
      title={title}
      isEven={isEven}
      sectionStyle={style}
      icon={icon}
    >
      <div className="max-w-2xl mx-auto">{renderDescription()}</div>
      {cta && (
        <div className="flex justify-center">
          <Button variant="default" size="lg" asChild>
            <Link href={cta.link} target={cta.target}>
              {cta.text}
            </Link>
          </Button>
        </div>
      )}
    </WeddingLayout>
  );
}
