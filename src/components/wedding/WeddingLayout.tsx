import { cn } from "@/lib/utils";

export interface WeddingLayoutProps {
  isEven: boolean;
  id: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  overlay?: boolean;
}

export function WeddingLayout({
  isEven,
  id,
  children,
  title,
  subtitle,
  backgroundImage,
  overlay,
}: WeddingLayoutProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-20 relative scroll-mt-20",
        isEven ? "bg-background" : "bg-primary/10"
      )}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "800px",
            backgroundRepeat: "repeat",
          }}
        >
          {overlay && <div className="absolute inset-0 bg-black/30" />}
        </div>
      )}
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-sectionHeadline text-center text-foreground uppercase tracking-wider mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-foreground/40 ">{subtitle}</p>
        )}

        <div className="max-w-6xl mx-auto mt-8">{children}</div>
      </div>
    </section>
  );
}
