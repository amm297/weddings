import { Timeline } from "@/db";
import { cn } from "@/lib/utils";

export interface TimelineStepProps {
  timeline: Timeline;
  isMobile?: boolean;
}

export const TimelineStep = ({
  timeline,
  isMobile = false,
}: TimelineStepProps) => {
  const { image, text, subtext, imagePosition } = timeline;

  return (
    <div
      className={cn(
        "flex flex-col items-center px-2",
        isMobile && "flex-row justify-between",
        !isMobile && "min-w-[120px] max-w-[150px] mx-1"
      )}
    >
      {/* Icon/Image - Show if imagePosition is "up" */}
      {imagePosition === "up" && (
        <div className={cn("mb-6", isMobile && "mb-0 ml-4")}>
          <img src={image} alt={text} className="w-20 h-20 object-contain" />
        </div>
      )}

      {/* Text Content */}
      <div
        className={cn(
          "flex flex-col items-center text-center gap-1",
          imagePosition === "down" && "mt-6",
          isMobile && "mt-0"
        )}
      >
        <p className="text-base uppercase tracking-wider font-light font-sageffine">
          {text}
        </p>
        <p className="text-xs font-medium font-pinyon">{subtext}</p>
      </div>

      {/* Icon/Image - Show if imagePosition is "down" */}
      {imagePosition === "down" && (
        <div className={cn("mt-6", isMobile && "mt-0 mr-4")}>
          <img src={image} alt={text} className="w-20 h-20 object-contain" />
        </div>
      )}
    </div>
  );
};
