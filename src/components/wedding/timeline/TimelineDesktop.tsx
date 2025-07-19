import { Timeline } from "@/db";
import { TimelineStep } from "./TimelineStep";
import { cn } from "@/lib/utils";

export default function TimelineDesktop({
  timeline,
  transitionImage,
}: {
  timeline: Timeline[];
  transitionImage?: string;
}) {
  const w = 1 / timeline.length;
  return (
    <div className="flex flex-row w-full flex-grow p-5">
      {timeline.map((step, index) => (
        <div
          className={cn("flex flex-row flex-grow justify-center items-center")}
        >
          <TimelineStep key={step.text} timeline={step} />
          {transitionImage && index < timeline.length - 1 && (
            <img
              src={transitionImage}
              alt={`transition-${step.text?.toLowerCase()}`}
              className={cn(
                "w-20 h-20 z-20 scale-110",
                index % 2 == 0 ? "rotate-[-35deg]" : "rotate-[35deg]"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
