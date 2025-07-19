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
}

export function WeddingLayout({
  isEven,
  id,
  children,
  title,
  subtitle,
  sectionStyle,
}: WeddingLayoutProps) {
  const hasBackgroundImage =
    Boolean(sectionStyle?.image) &&
    sectionStyle?.imagePosition === "background";

  const hasSideImage =
    Boolean(sectionStyle?.image) &&
    ["left", "right"].includes(sectionStyle?.imagePosition || "");

  const imagePosition = sectionStyle?.imagePosition || "";

  if (id == "faq") {
    console.log(sectionStyle);
  }

  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-20 relative scroll-mt-20 overflow-hidden",
        isEven ? "bg-background" : "bg-primary/10"
      )}
    >
      <ImageBackground {...(sectionStyle ?? {})} />
      <ImageSide id={id} {...(sectionStyle ?? {})} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={cn(
            "max-w-6xl mx-auto",
            hasSideImage && imagePosition === "left" && "text-right",
            hasSideImage && imagePosition === "right" && "text-left"
          )}
        >
          <h2
            className={cn(
              "text-3xl md:text-5xl font-sectionHeadline uppercase tracking-wider mb-2",
              !hasSideImage && "text-center",
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
                !hasSideImage && "text-center",
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
            "max-w-6xl mx-auto mt-8 relative min-h-[400px] flex",
            hasBackgroundImage && "text-white",
            hasSideImage && imagePosition === "left" && "justify-end",
            hasSideImage && imagePosition === "right" && "justify-start"
          )}
        >
          <div
            className={cn(
              "flex-1",
              hasSideImage ? "max-w-[50%] px-8" : "w-full"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
