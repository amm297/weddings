import { Button } from "@/components/ui/button";
import { Section } from "@/db";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function BlankSection({ section }: { section: Section }) {
  const { description, cta } = section;

  const renderDescription = () => {
    if (Array.isArray(description)) {
      return (
        <div className="flex flex-col text-foreground/80 mb-12 gap-2">
          {description.map((item, index) => (
            <p key={`ba-desc-${index}`}>{item}</p>
          ))}
        </div>
      );
    } else {
      return (
        <p className="text-center text-foreground/80 mb-12">{description}</p>
      );
    }
  };

  return (
    <div>
      {description && renderDescription()}
      {cta && (
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button
            variant="default"
            size="lg"
            asChild
            className={cn("font-headline tracking-wide ")}
          >
            <Link href={cta.link}>{cta.text}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
