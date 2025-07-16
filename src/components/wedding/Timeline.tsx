"use client";

import { useWeddingConfig } from "@/hooks/use-wedding-config";
import TimelineDesktop from "./timeline/TimelineDesktop";
import TimelineMobile from "./timeline/TimelineMobile";
import { useIsMobile } from "@/hooks/use-mobile";

export function Timeline() {
  const config = useWeddingConfig();
  const { title, subtitle, timeline } = config.timeline || {};
  const isMobile = useIsMobile();

  if (!title || !timeline?.length) return null;

  return (
    <section
      id="timeline"
      className="py-12 md:py-20 bg-background scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-sectionHeadline text-center mb-8 md:mb-16 text-foreground uppercase tracking-wider">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-foreground/80 mb-12">{subtitle}</p>
        )}

        <div className="max-w-6xl mx-auto">
          {isMobile ? (
            <TimelineMobile timeline={timeline} />
          ) : (
            <TimelineDesktop timeline={timeline} />
          )}
        </div>
      </div>
    </section>
  );
}
