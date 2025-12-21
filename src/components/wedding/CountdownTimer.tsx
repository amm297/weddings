import { useWeddingSection } from "@/hooks/use-wedding-section";
import { TimerClean } from "./countdown/TimerClean";
import { WeddingLayout } from "./WeddingLayout";
import { DescriptionItem, Section } from "@/db/wedding-model";
import { cn } from "@/lib/utils";

export function CountdownTimer({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("countdown") as Section;

  const { id, title, subtitle, description } = section;

  const renderDescriptionItem = (
    item: string | DescriptionItem,
    index: number
  ) => {
    if (typeof item === "string") {
      return <p key={`ba-desc-${index}`}>{item}</p>;
    }
    return (
      <p key={`ba-desc-${index}`} className={cn(item.itemStyle)}>
        {item.text}
      </p>
    );
  };

  const renderDescription = () => {
    if (typeof description === "string") {
      return (
        <p className="text-center text-foreground/80 mb-12">{description}</p>
      );
    }
    if (Array.isArray(description)) {
      return (
        <div className="flex flex-col text-center text-foreground/80 mb-12 gap-2">
          {description.map((item, index) => renderDescriptionItem(item, index))}
        </div>
      );
    }
  };

  return (
    <WeddingLayout id={id} isEven={isEven} title={title} subtitle={subtitle}>
      {renderDescription()}
      <TimerClean />
    </WeddingLayout>
  );
}
