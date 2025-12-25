import { cn } from "@/lib/utils";
import { SectionStyle } from "@/db";
import { ImageBackground } from "./layout/ImageBackground";
import { ImageSide } from "./layout/ImageSide";

export interface WeddingLayoutProps {
  isEven: boolean;
  id: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  sectionStyle?: SectionStyle;
  icon?: string;
}

export function WeddingLayout({
  isEven,
  id,
  children,
  title,
  subtitle,
  sectionStyle,
  icon,
}: WeddingLayoutProps) {
  const hasBackgroundImage =
    Boolean(sectionStyle?.image) &&
    sectionStyle?.imagePosition === "background";

  const hasSideImage =
    Boolean(sectionStyle?.image) &&
    ["left", "right"].includes(sectionStyle?.imagePosition || "");

  const imagePosition = sectionStyle?.imagePosition || "";

  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-20 relative scroll-mt-20 overflow-hidden",
        isEven ? "bg-background" : "bg-primary/10",
        sectionStyle?.textAlign && `text-${sectionStyle.textAlign}`
      )}
      style={
        sectionStyle?.minHeight
          ? { minHeight: sectionStyle.minHeight }
          : undefined
      }
    >
      <ImageBackground {...(sectionStyle ?? {})} />
      <ImageSide id={id} {...(sectionStyle ?? {})} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          id={`${id}-title-container`}
          className={cn(
            "max-w-6xl mx-auto",
            hasSideImage && "md:w-1/2",
            hasSideImage &&
              imagePosition === "left" &&
              "md:ml-auto md:text-right",
            hasSideImage &&
              imagePosition === "right" &&
              "md:mr-auto md:text-left"
          )}
        >
          <h2
            className={cn(
              "text-3xl md:text-5xl font-sectionHeadline uppercase tracking-wider mb-2",
              "text-center",
              !hasSideImage && "md:text-center",
              hasSideImage && imagePosition === "left" && "md:text-right",
              hasSideImage && imagePosition === "right" && "md:text-left",
              hasBackgroundImage
                ? "text-white drop-shadow-md"
                : "text-foreground"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "text-center",
                !hasSideImage && "md:text-center",
                hasSideImage && imagePosition === "left" && "md:text-right",
                hasSideImage && imagePosition === "right" && "md:text-left",
                hasBackgroundImage
                  ? "text-white/90 drop-shadow-md"
                  : "text-foreground/40"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div
          id={`${id}-content`}
          className={cn(
            "max-w-6xl mx-auto mt-6 relative flex",
            hasBackgroundImage && "text-white",
            hasSideImage && imagePosition === "left" && "md:justify-end",
            hasSideImage && imagePosition === "right" && "md:justify-start"
          )}
        >
          <div
            className={cn(
              "flex-1",
              hasSideImage &&
                imagePosition === "left" &&
                "md:max-w-[50%] md:px-4",
              hasSideImage &&
                imagePosition === "right" &&
                "md:max-w-[50%] md:pl-0 md:pr-4",
              !hasSideImage && "w-full"
            )}
          >
            {icon && (
              <div className="flex justify-center items-center mb-4">
                <img src={icon} alt={icon} className="w-15 h-15" />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
