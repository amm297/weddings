import { Timeline } from "@/db";
import { TimelineStep } from "./TimelineStep";

export default function TimelineDesktop({
  timeline,
}: {
  timeline: Timeline[];
}) {
  return (
    <div className="flex flex-row justify-between items-start relative">
      {/* Timeline line */}
      <div className="absolute top-24 left-0 right-0 h-0.5 z-0 hidden md:block">
        {/* Connecting curved lines */}
        <svg className="w-full h-16 absolute -top-8" preserveAspectRatio="none">
          <path
            d="M0,16 C150,48 250,-16 400,16 C550,48 650,-16 800,16 C950,48 1050,-16 1200,16"
            stroke="black"
            fill="transparent"
            strokeWidth="1.5"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      {/* Timeline steps */}
      <div className="flex flex-row justify-between w-full z-10 relative overflow-x-auto pb-8 px-4 md:px-0 gap-2 md:gap-4">
        {timeline.map((step) => (
          <TimelineStep key={step.text} timeline={step} />
        ))}
      </div>
    </div>
  );
}
