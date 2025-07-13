"use client";

import { Gift, Hotel, Info, MapPin, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { InfoCard } from "../shared/InfoCard";

export function WeddingInformation() {
  const config = useWeddingConfig();
  const { additionalInfo, location } = config;

  const getAdditionalInfoIcon = (icon: string) => {
    switch (icon) {
      case "shirt":
        return <Shirt className="w-8 h-8" />;
      case "hotel":
        return <Hotel className="w-8 h-8" />;
      case "gift":
        return <Gift className="w-8 h-8" />;
      default:
        return <Info className="w-8 h-8" />;
    }
  };

  return (
    <>
      <InfoCard icon={<MapPin className="w-8 h-8" />} title="Getting There">
        <p>{location.parking}</p>
        {location.googleMapsUrl && (
          <Button
            variant="link"
            className="p-0 h-auto text-primary"
            onClick={() => window.open(location.googleMapsUrl, "_blank")}
          >
            Ver en mapa
          </Button>
        )}
      </InfoCard>

      {additionalInfo &&
        Object.keys(additionalInfo).map((key) => (
          <InfoCard
            key={key}
            icon={getAdditionalInfoIcon(additionalInfo[key].icon ?? "")}
            title={additionalInfo[key].title}
          >
            <p>{additionalInfo[key].description}</p>
          </InfoCard>
        ))}
    </>
  );
}
