"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import { WeddingLayout } from "./WeddingLayout";
import { SideSection as SideSectionType } from "@/db/wedding-model";
import { SideSection } from "./sides/SideSection";
import { cn } from "@/lib/utils";

export function Sides({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("sides") as SideSectionType;
  const { sections } = section;
  return (
    <WeddingLayout id="sides" isEven={isEven}>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {sections?.map((section, idx) => (
          <SideSection section={section} index={idx} />
        ))}
      </div>
    </WeddingLayout>
  );
}
