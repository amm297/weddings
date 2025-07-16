import { Timeline } from "@/db";
import { TimelineStep } from "./TimelineStep";

export default function TimelineMobile({ timeline }: { timeline: Timeline[] }) {
  return (
    <div className="flex flex-col justify-between items-center relative">
      {/* Timeline line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5  z-0">
        {/* Connecting curved lines */}
        <svg className="h-full w-16 absolute" preserveAspectRatio="none">
          <path
            d="M8,0 C30,100 -14,200 8,300 C30,400 -14,500 8,600 C30,700 -14,800 8,900 C30,1000 -14,1100 8,1200"
            stroke="black"
            fill="transparent"
            strokeWidth="1.5"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      {/* Timeline steps */}
      <div className="flex flex-col w-full z-10 relative py-8 px-4 md:px-0 gap-8 md:gap-16">
        {timeline.map((step) => (
          <TimelineStep key={step.text} timeline={step} isMobile={true} />
        ))}
      </div>
    </div>
  );
}
