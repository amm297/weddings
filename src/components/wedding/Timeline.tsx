"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import { WeddingLayout } from "./WeddingLayout";
import { TimelineSection } from "@/db/wedding-model";
import TimelineLayout from "./timeline/TimelineLayout";
import TimelineLayoutV2 from "./timeline/TimelineLayoutV2";

export function Timeline({ isEven, v2 }: { isEven: boolean; v2?: boolean }) {
  const section = useWeddingSection("timeline") as TimelineSection;
  const { title, subtitle, timeline, transitionImage, rotateDegrees } = section;

  if (!title || !timeline?.length) return null;

  return (
    <WeddingLayout
      id="timeline"
      title={title}
      subtitle={subtitle}
      isEven={isEven}
    >
      {v2 ? (
        <TimelineLayoutV2
          timeline={timeline}
          transitionImage={transitionImage}
          rotateDegrees={rotateDegrees ?? 35}
        />
      ) : (
        <TimelineLayout
          timeline={timeline}
          transitionImage={transitionImage}
          rotateDegrees={rotateDegrees ?? 35}
        />
      )}
    </WeddingLayout>
  );
}
