import { Timeline } from "@/db";
import { TimelineStep } from "./TimelineStep";
import { cn } from "@/lib/utils";

export default function TimelineLayout({
  rotateDegrees,
  timeline,
  transitionImage,
}: {
  timeline: Timeline[];
  transitionImage?: string;
  rotateDegrees?: number;
}) {
  const w = 1 / timeline.length;
  return (
    <div className="flex w-full flex-grow p-5 flex-col md:flex-row">
      {timeline.map((step, index) => (
        <div
          key={`timeline-${step.text}`}
          className={cn(
            "flex flex-grow justify-center items-center flex-col md:flex-row"
          )}
        >
          <TimelineStep key={step.text} timeline={step} />
          {transitionImage && index < timeline.length - 1 && (
            <img
              src={transitionImage}
              key={`transition-${step.text?.toLowerCase()}`}
              alt={`transition-${step.text?.toLowerCase()}`}
              className={cn(
                "w-20 h-20 z-20 scale-110",
                index % 2 == 0
                  ? `rotate-[-${rotateDegrees}deg]`
                  : `rotate-[${rotateDegrees}deg]`
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
