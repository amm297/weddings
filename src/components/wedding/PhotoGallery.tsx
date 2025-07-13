"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const photos = [
  {
    src: "https://placehold.co/600x400.png",
    alt: "Couple smiling",
    hint: "couple smiling",
  },
  {
    src: "https://placehold.co/400x600.png",
    alt: "Couple holding hands",
    hint: "couple hands",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Couple on a beach",
    hint: "couple beach",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Couple laughing",
    hint: "couple laughing",
  },
  {
    src: "https://placehold.co/600x400.png",
    alt: "Proposal moment",
    hint: "proposal ring",
  },
];

const galleryGroups = {
  engagement: photos,
  together: photos.slice().reverse(),
  childhood: photos.slice(1, 4),
};

export function PhotoGallery() {
  return (
    <section id="gallery" className="py-12 md:py-20 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-8 md:mb-12 text-foreground">
          Our Moments
        </h2>

        <Tabs defaultValue="carousel" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="carousel" className="font-headline">
              Carousel
            </TabsTrigger>
            <TabsTrigger value="grid" className="font-headline">
              Grid
            </TabsTrigger>
          </TabsList>

          <TabsContent value="carousel" className="space-y-8">
            <Tabs defaultValue="engagement" className="w-full">
              <TabsList className="w-full justify-center mb-6">
                <TabsTrigger value="engagement" className="font-headline">
                  Engagement
                </TabsTrigger>
                <TabsTrigger value="together" className="font-headline">
                  Together
                </TabsTrigger>
                <TabsTrigger value="childhood" className="font-headline">
                  Childhood
                </TabsTrigger>
              </TabsList>

              {Object.entries(galleryGroups).map(([key, images]) => (
                <TabsContent key={key} value={key} className="space-y-4">
                  <Carousel className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                      {images.map((photo, index) => (
                        <CarouselItem
                          key={index}
                          className="md:basis-1/2 lg:basis-1/3"
                        >
                          <div className="p-1">
                            <Card className="border-primary/20 overflow-hidden">
                              <CardContent className="flex aspect-square items-center justify-center p-0">
                                <Image
                                  src={photo.src}
                                  alt={photo.alt}
                                  width={600}
                                  height={400}
                                  data-ai-hint={photo.hint}
                                  className="w-full h-full object-cover"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="grid">
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
              {photos.map((photo, index) => (
                <Card
                  key={index}
                  className={cn(
                    "overflow-hidden border-primary/20",
                    index === 0 && "md:col-span-2",
                    index === 1 && "md:row-span-2",
                    index === 2 && "md:col-span-2"
                  )}
                >
                  <CardContent className="p-0 h-full">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={600}
                      height={400}
                      data-ai-hint={photo.hint}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
