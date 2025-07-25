import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hotel } from "@/db";
import { Car, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  const [showPromoCode, setShowPromoCode] = useState(false);

  return (
    <Card className="w-full transition-transform hover:-translate-y-1 border-primary/20">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6 bg-primary/5">
        <CardTitle className="font-headline text-2xl text-foreground">
          {hotel.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-foreground/80 space-y-4">
        <div className="flex flex-col md:flex-row gap-10">
          {hotel?.imageUrl && (
            <img
              src={hotel.imageUrl}
              alt={hotel.name}
              className="w-full md:w-1/4"
            />
          )}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col gap-2">
              <p className="text-sm mb-4">{hotel.description}</p>
              {hotel?.parking && (
                <p className="text-sm mb-4">{hotel.parking}</p>
              )}
            </div>
            <div className="flex flex-col  gap-2">
              {hotel.address && (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${hotel.address}`,
                      "_blank"
                    );
                  }}
                >
                  <div className="flex flex-row items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <p className="font-medium">Dirección:</p>
                  </div>
                  <p className="ml-6 text-sm">{hotel.address}</p>
                </div>
              )}

              {hotel.phone && (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    if (hotel.phone) {
                      window.open(
                        `tel:${hotel.phone.replace(/\s+/g, "")}`,
                        "_blank"
                      );
                    }
                  }}
                >
                  <div className="flex flex-row items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <p className="font-medium">Teléfono:</p>
                  </div>
                  <p className="ml-6 text-sm">{hotel.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row justify-end gap-2">
        {hotel.promoCode && (
          <div className="w-full md:min-w-24 md:w-auto">
            {!showPromoCode ? (
              <Button
                onClick={() => setShowPromoCode(true)}
                className="w-full md:w-auto"
              >
                Ver código promocional
              </Button>
            ) : (
              <p className="font-mono bg-primary/10 px-4 py-2 rounded text-sm text-primary bg-white border border-primary/20 w-full text-center md:w-auto">
                {hotel.promoCode}
              </p>
            )}
          </div>
        )}
        <Button variant="outline" asChild className="w-full md:w-auto">
          <Link href={hotel.website || ""} target="_blank" className="w-full">
            Reservar
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
