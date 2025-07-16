import { cn } from "@/lib/utils";

export interface WeddingLayoutProps {
  isEven: boolean;
  id: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function WeddingLayout({
  isEven,
  id,
  children,
  title,
  subtitle,
}: WeddingLayoutProps) {
  if (!title) return null;

  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-20 scroll-mt-20",
        isEven ? "bg-background" : "bg-primary/10"
      )}
    >
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
