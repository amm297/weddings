"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import { WeddingLayout } from "./WeddingLayout";
import {
  DescriptionItem,
  ImageSection as ImageSectionType,
} from "@/db/wedding-model";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date-utils";

export function ImageSection({ id, isEven }: { id: string; isEven: boolean }) {
  const section = useWeddingSection(id) as ImageSectionType;
  const { title, subtitle, image, description } = section;

  const renderDescriptionItem = (
    item: string | DescriptionItem,
    index: number
  ) => {
    if (typeof item === "string") {
      return <p key={`ba-desc-${index}`}>{item}</p>;
    }

    if (typeof item === "object" && item?.dateFormat && item?.date) {
      console.log("DATE", item?.date, item?.dateFormat, item?.timezone);

      return (
        <p key={`ba-desc-${index}`}>
          {formatDate(item?.date, item?.dateFormat, {
            timezone: item?.timezone,
          })}
        </p>
      );
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
    <WeddingLayout
      id={id}
      title={title}
      subtitle={subtitle}
      isEven={isEven}
      sectionStyle={section.style}
    >
      <div className="flex flex-col items-center justify-center">
        {image && (
          <div className="-mx-4 md:mx-0 w-screen md:w-full overflow-hidden mb-6">
            <img
              src={image}
              alt={image}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {renderDescription()}
      </div>
    </WeddingLayout>
  );
}
