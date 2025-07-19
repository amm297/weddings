"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import { WeddingLayout } from "./WeddingLayout";
import { TimelineSection } from "@/db/wedding-model";
import TimelineLayout from "./timeline/TimelineLayout";

export function Timeline({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("timeline") as TimelineSection;
  const { title, subtitle, timeline, transitionImage } = section;

  if (!title || !timeline?.length) return null;

  return (
    <WeddingLayout
      id="timeline"
      title={title}
      subtitle={subtitle}
      isEven={isEven}
    >
      <TimelineLayout timeline={timeline} transitionImage={transitionImage} />
    </WeddingLayout>
  );
}
