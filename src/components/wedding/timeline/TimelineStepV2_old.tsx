import { Timeline } from "@/db";
import { cn } from "@/lib/utils";

export interface TimelineStepProps {
  timeline: Timeline;
  index: number;
}

export const TimelineStep = ({ timeline, index }: TimelineStepProps) => {
  const { image, text, subtext } = timeline;
  // Determine if the text branch goes to the right or left
  const isRight = index % 2 !== 0;

  const renderImage = (padding?: string) => {
    return (
      <div
        className={cn(
          "w-50 h-50 md:w-40 md:h-40 flex justify-center items-center",
          padding ?? ""
        )}
      >
        <img
          src={image}
          alt={text}
          className="w-full h-full object-contain scale-150 md:scale-100"
        />
      </div>
    );
  };
  return (
    <div className="relative w-full grid grid-cols-2 min-h-[160px] md:min-h-[200px]">
      {/* LEFT COLUMN */}
      <div
        className={cn(
          "flex items-center px-4 md:px-8 bg-yellow-500",
          isRight ? "justify-end" : "justify-center"
        )}
      >
        {!isRight ? (
          /* Text on the Left */
          <div className="flex flex-col items-end text-right bg-blue-500">
            <p className="text-xl md:text-2xl font-light font-sageffine tracking-widest uppercase bg-pink-500">
              {text}
            </p>
            <p className="text-lg md:text-xl font-pinyon italic bg-green-500">
              {subtext}
            </p>
          </div>
        ) : (
          /* Icon on the Left */
          renderImage()
        )}
      </div>

      {/* HORIZONTAL CONNECTOR LINE */}
      <div
        className={cn(
          "absolute top-1/2 h-[1px] bg-gray-900 z-0",
          // Line spans from center to approximately 35% of the side
          isRight
            ? "left-1/2 w-[50%] md:w-[35%]"
            : "right-1/2 w-[50%] md:w-[35%]"
        )}
      />

      {/* END CAP DOT */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-900 z-10",
          isRight ? "left-[100%] md:left-[85%]" : "right-[100%] md:right-[85%]"
        )}
      />

      {/* RIGHT COLUMN */}
      <div
        className={cn(
          "flex items-center px-4",
          isRight ? "justify-center" : "justify-start"
        )}
      >
        {isRight ? (
          /* Text on the Right */
          <div className="flex flex-col items-start text-left  bg-red-500">
            <p className="text-xl md:text-2xl font-light font-sageffine tracking-widest  uppercase">
              {text}
            </p>
            <p className="text-lg md:text-xl font-pinyon  italic">{subtext}</p>
          </div>
        ) : (
          /* Icon on the Right */
          renderImage()
        )}
      </div>
    </div>
  );
};
