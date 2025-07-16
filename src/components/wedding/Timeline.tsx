"use client";

import { useWeddingConfig } from "@/hooks/use-wedding-config";
import TimelineDesktop from "./timeline/TimelineDesktop";
import TimelineMobile from "./timeline/TimelineMobile";
import { useIsMobile } from "@/hooks/use-mobile";
import { WeddingLayout } from "./WeddingLayout";

export function Timeline({ isEven }: { isEven: boolean }) {
  const config = useWeddingConfig();
  const { title, subtitle, timeline } = config.timeline || {};
  const isMobile = useIsMobile();

  if (!title || !timeline?.length) return null;

  return (
    <WeddingLayout
      id="timeline"
      title={title}
      subtitle={subtitle}
      isEven={isEven}
    >
      {isMobile ? (
        <TimelineMobile timeline={timeline} />
      ) : (
        <TimelineDesktop timeline={timeline} />
      )}
    </WeddingLayout>
  );
}
