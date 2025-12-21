import { Timeline } from "@/db";
import { TimelineStep } from "./TimelineStepV2";

export default function TimelineLayout({ timeline }: { timeline: Timeline[] }) {
  return (
    // Added a subtle parchment-like background color matching the image
    <div className="relative w-full flex-grow p-4 md:py-16 md:p-48">
      {/* Central Vertical Line (Mobile & Desktop) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-gray-900 -translate-x-1/2" />

      {/* End Caps */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2.5 h-2.5 rounded-full bg-gray-900" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2.5 h-2.5 rounded-full bg-gray-900" />

      <div className="flex flex-col relative z-10">
        {timeline.map((step, index) => (
          <TimelineStep key={step.text} timeline={step} index={index} />
        ))}
      </div>
    </div>
  );
}
