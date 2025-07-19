"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import TimelineDesktop from "./timeline/TimelineDesktop";
import TimelineMobile from "./timeline/TimelineMobile";
import { useIsMobile } from "@/hooks/use-mobile";
import { WeddingLayout } from "./WeddingLayout";
import { TimelineSection } from "@/db/wedding-model";

export function Timeline({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("timeline") as TimelineSection;
  const { title, subtitle, timeline, transitionImage } = section;
  const isMobile = useIsMobile();

  if (!title || !timeline?.length) return null;

  return (
    <WeddingLayout
      id="timeline"
      title={title}
      subtitle={subtitle}
      isEven={isEven}
    >
      <TimelineDesktop timeline={timeline} transitionImage={transitionImage} />
    </WeddingLayout>
  );
}
