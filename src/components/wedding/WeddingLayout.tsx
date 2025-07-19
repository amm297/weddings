import { cn } from "@/lib/utils";
import { SectionStyle } from "@/db";

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
  const hasBackgroundImage = Boolean(sectionStyle?.image);

  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-20 relative scroll-mt-20",
        isEven ? "bg-background" : "bg-primary/10"
      )}
    >
      {sectionStyle?.image && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${sectionStyle.image})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
          }}
        >
          {sectionStyle.overlay && (
            <div className="absolute inset-0 bg-overlay/[74%]" />
          )}
        </div>
      )}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2
          className={cn(
            "text-3xl md:text-5xl font-sectionHeadline text-center uppercase tracking-wider mb-2",
            hasBackgroundImage ? "text-white drop-shadow-md" : "text-foreground"
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "text-center",
              hasBackgroundImage
                ? "text-white/90 drop-shadow-md"
                : "text-foreground/40"
            )}
          >
            {subtitle}
          </p>
        )} 

        <div
          className={cn(
            "max-w-6xl mx-auto mt-8",
            hasBackgroundImage && "text-white"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
