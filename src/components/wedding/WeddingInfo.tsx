"use client";

import {
  MapPin,
  Shirt,
  Sparkles,
  MapPinned,
  Info,
  Hotel,
  Gift,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { formatDateWithDay } from "@/lib/date-utils";
import { WeddingVenue } from "./weddingInfo/WeddingVenu";
import { WeddingTimeline } from "./weddingInfo/WeddingTimeline";
import { WeddingInformation } from "./weddingInfo/WeddingInformation";

const InfoCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="w-full transition-transform hover:-translate-y-1 border-primary/20">
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6 bg-primary/5">
      <div className="text-primary">{icon}</div>
      <CardTitle className="font-headline text-2xl text-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6 text-foreground/80 space-y-2">
      {children}
    </CardContent>
  </Card>
);

export function WeddingInfo() {
  const config = useWeddingConfig();
  const { location, date, dressCode, additionalInfo } = config;
  const weddingDate = formatDateWithDay(date.date);


  return (
    <section id="details" className="py-12 md:py-20 bg-accent scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-8 md:mb-12 text-foreground">
          Detalles
        </h2>

        <Tabs defaultValue="venue" className="w-full max-w-4xl mx-auto mb-10">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="venue" className="font-headline">
              Lugar
            </TabsTrigger>
            <TabsTrigger value="schedule" className="font-headline">
              Cronograma
            </TabsTrigger>
            <TabsTrigger value="info" className="font-headline">
              Información
            </TabsTrigger>
          </TabsList>

          <TabsContent value="venue" className="space-y-4">
            <WeddingVenue />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <WeddingTimeline />
          </TabsContent>

          <TabsContent value="info" className="grid gap-8 md:grid-cols-2">
            <WeddingInformation />
          </TabsContent>
        </Tabs>

        <div className="grid gap-8 md:grid-cols-2">
          <InfoCard icon={<Info className="w-8 h-8" />} title="The Ceremony">
            <p>
              <strong>Hora:</strong> {date.ceremonyTime}
            </p>
            <p>
              <strong>Lugar:</strong> {location.name}
            </p>
            <p>
              {location.address}, {location.city}
              {location.state ? `, ${location.state}` : ""}
            </p>
          </InfoCard>

          <InfoCard
            icon={<Sparkles className="w-8 h-8" />}
            title="The Reception"
          >
            <p>
              <strong>Hora:</strong> {date.receptionTime} onwards
            </p>
            <p>
              <strong>Lugar:</strong> {location.name}
            </p>
            <p>Join us for dinner, drinks, and dancing!</p>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
