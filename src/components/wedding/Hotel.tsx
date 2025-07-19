"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import { HotelCard } from "./hotel/HotelCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WeddingLayout } from "./WeddingLayout";
import { HotelSection } from "@/db/wedding-model";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMemo } from "react";

export function Hotel({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("hotel") as HotelSection;
  const { title, subtitle, hotels } = section;
  const isMobile = useIsMobile();

  const carouselOptions = useMemo(
    () => ({
      loop: true,
      dragFree: isMobile,
      align: "center" as const,
      containScroll: "trimSnaps" as const,
    }),
    [isMobile]
  );

  if (!title || !hotels?.length) return null;

  return (
    <WeddingLayout id="hotel" title={title} subtitle={subtitle} isEven={isEven}>
      <Carousel
        opts={carouselOptions}
        className="flex flex-row items-center justify-center gap-4"
      >
        {!isMobile && (
          <CarouselPrevious className="hover:bg-primary/20 transition-colors" />
        )}

        <CarouselContent className={`min-h-16 ${isMobile ? "px-4" : ""}`}>
          {hotels?.map((hotel) => (
            <CarouselItem
              key={hotel.name}
              className={isMobile ? "basis-[85%] md:basis-full" : "basis-full"}
            >
              <div className="p-1">
                <HotelCard hotel={hotel} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {!isMobile && (
          <CarouselNext className="hover:bg-primary/20 transition-colors" />
        )}
      </Carousel>
    </WeddingLayout>
  );
}
