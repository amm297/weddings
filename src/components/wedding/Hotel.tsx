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

export function Hotel() {
  const config = useWeddingConfig();
  const { title, subtitle, hotels } = config.hotel || {};

  if (!title || !hotels?.length) return null;

  return (
    <section id="hotels" className="py-12 md:py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-sectionHeadline text-center mb-8 md:mb-12 text-foreground">
          {title}
        </h2>
        <p className="text-center text-foreground/80 mb-12">{subtitle}</p>

        <div className="max-w-5xl mx-auto">
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
        </div>
      </div>
    </section>
  );
}
