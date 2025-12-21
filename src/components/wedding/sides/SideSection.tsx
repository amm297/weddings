import { Button } from "@/components/ui/button";
import { DescriptionItem, SideSectionItem } from "@/db";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function SideSection({ section }: { section: SideSectionItem }) {
  const { id, title, description, cta } = section;

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
        <p className="text-center text-foreground/80 my-4">{description}</p>
      );
    }
    if (Array.isArray(description)) {
      return (
        <div className="flex flex-col text-foreground/80 my-4 gap-2">
          {description.map((item, index) => renderDescriptionItem(item, index))}
        </div>
      );
    }
  };

  return (
    <div
      id={`${id}-side`}
      className="flex flex-1 flex-col items-center justify-center gap-4 w-full"
    >
      {title && <h2 className="text-2xl font-bold ">{title}</h2>}
      {description && renderDescription()}
      {cta && (
        <div className="flex flex-wrap justify-center w-full md:w-auto px-4 md:px-0">
          <Button
            variant="default"
            asChild
            className={cn("font-headline tracking-wide w-full md:w-auto")}
          >
            <Link href={cta.link} target={cta.target}>
              {cta.text}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
