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
  const isUp = imagePosition === "up";

  const renderImage = () => {
    return (
      <div className={cn("w-full max-w-[120px] md:max-w-none")}>
        <img src={image} alt={text} className="w-full h-auto object-contain" />
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex items-center h-full justify-between gap-8 w-full",
        isUp ? "flex-row md:flex-col" : "flex-row-reverse md:flex-col-reverse"
      )}
    >
      {renderImage()}

      <div className={cn("flex flex-col items-center text-center gap-1")}>
        <p className="text-xl uppercase tracking-wider font-light font-sageffine">
          {text}
        </p>
        <p className="text-lg font-medium font-pinyon">{subtext}</p>
      </div>
    </div>
  );
};
