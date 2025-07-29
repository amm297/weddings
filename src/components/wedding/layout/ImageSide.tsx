import { SectionStyle } from "@/db";
import { cn } from "@/lib/utils";

export interface ImageSideProps extends SectionStyle {
  id: string;
}

export function ImageSide({ image, imagePosition, id }: ImageSideProps) {
  if (!image) return <></>;
  if (imagePosition && !["left", "right"].includes(imagePosition)) return <></>;

  return (
    <div
      className={cn(
        "hidden md:block absolute top-0 bottom-0 w-[50vw] h-full",
        imagePosition === "left" ? "left-0" : "right-0"
      )}
    >
      <img
        src={image}
        alt={`${id}-image-${imagePosition}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
