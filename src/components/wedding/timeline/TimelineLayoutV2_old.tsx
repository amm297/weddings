import { Timeline } from "@/db";
import { cn } from "@/lib/utils";

export interface TimelineStepProps {
  timeline: Timeline;
  index: number;
}

export const TimelineStep = ({ timeline, index }: TimelineStepProps) => {
  const { image, text, subtext } = timeline;
  const isRight = index % 2 !== 0;

  const renderImage = () => (
    <div className="w-32 h-32 md:w-48 md:h-48 flex justify-center items-center overflow-visible">
      <img
        src={image}
        alt={text}
        /* Increased scale for that 'hand-drawn' feel from your screenshot */
        className="w-full h-full object-contain scale-125 md:scale-110"
      />
    </div>
  );

  return (
    <div className="relative w-full grid grid-cols-2 min-h-[180px] md:min-h-[240px]">
      {/* LEFT COLUMN */}
      <div
        className={cn(
          "flex items-center px-6",
          isRight ? "justify-end" : "justify-center"
        )}
      >
        {!isRight ? (
          <div className="flex flex-col items-end text-right pr-4 md:pr-10">
            <p className="text-xl md:text-3xl font-light font-sageffine tracking-[0.2em] uppercase text-gray-800">
              {text}
            </p>
            <p className="text-lg md:text-2xl font-pinyon italic text-gray-600">
              {subtext}
            </p>
          </div>
        ) : (
          renderImage()
        )}
      </div>

      {/* HORIZONTAL CONNECTOR LINE - Adjusted widths for desktop constraint */}
      <div
        className={cn(
          "absolute top-1/2 h-[1px] bg-gray-900 z-0",
          isRight
            ? "left-1/2 w-[40%] md:w-[30%]"
            : "right-1/2 w-[40%] md:w-[30%]"
        )}
      />

      {/* END CAP DOT */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-900 z-10",
          isRight ? "left-[90%] md:left-[80%]" : "right-[90%] md:right-[80%]"
        )}
      />

      {/* RIGHT COLUMN */}
      <div
        className={cn(
          "flex items-center px-6",
          isRight ? "justify-center" : "justify-start"
        )}
      >
        {isRight ? (
          <div className="flex flex-col items-start text-left pl-4 md:pl-10">
            <p className="text-xl md:text-3xl font-light font-sageffine tracking-[0.2em] uppercase text-gray-800">
              {text}
            </p>
            <p className="text-lg md:text-2xl font-pinyon italic text-gray-600">
              {subtext}
            </p>
          </div>
        ) : (
          renderImage()
        )}
      </div>
    </div>
  );
};
