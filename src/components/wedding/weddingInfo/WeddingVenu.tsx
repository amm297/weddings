"use client";

import { MapPinned } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWeddingConfig } from "@/hooks/use-wedding-config";

export function WeddingVenue() {
  const config = useWeddingConfig();
  const { location } = config;

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline">{location.name}</CardTitle>
        <CardDescription>Nuestro hermoso lugar de boda</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{location.description}</p>
        {location.googleMapsUrl && (
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => window.open(location.googleMapsUrl, "_blank")}
          >
            View on Map <MapPinned className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
