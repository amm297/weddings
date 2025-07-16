"use client";

import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { HotelCard } from "./hotel/HotelCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WeddingLayout } from "./WeddingLayout";

export function Hotel({ isEven }: { isEven: boolean }) {
  const { hotel } = useWeddingConfig();
  const { title, subtitle, hotels } = hotel || {};

  if (!title || !hotels?.length) return null;

  return (
    <WeddingLayout id="hotel" title={title} subtitle={subtitle} isEven={isEven}>
      <Carousel
        opts={{ loop: true }}
        className="flex flex-row items-center justify-center gap-4"
      >
        <CarouselPrevious className="hover:bg-primary/20 transition-colors" />

        <CarouselContent className="min-h-16">
          {hotels?.map((hotel) => (
            <CarouselItem key={hotel.name}>
              <div className="p-1">
                <HotelCard hotel={hotel} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext className="hover:bg-primary/20 transition-colors" />
      </Carousel>
    </WeddingLayout>
  );
}
