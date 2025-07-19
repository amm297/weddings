import { Timeline } from "@/db";
import { TimelineStep } from "./TimelineStep";

export default function TimelineMobile({
  timeline,
  transitionImage,
}: {
  timeline: Timeline[];
  transitionImage?: string;
}) {
  return (
    <div className="flex flex-col justify-between items-center relative">
      <div className="flex flex-col w-full z-10 relative py-8 px-4 md:px-0 gap-8 md:gap-16">
        {timeline.map((step) => (
          <TimelineStep key={step.text} timeline={step} isMobile={true} />
        ))}
      </div>
    </div>
  );
}
