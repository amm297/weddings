import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hotel } from "@/db";
import { Car, Gift, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export const HotelCard = ({ hotel }: { hotel: Hotel }) => (
  <Card className="w-full transition-transform hover:-translate-y-1 border-primary/20">
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6 bg-primary/5">
      <CardTitle className="font-headline text-2xl text-foreground">
        {hotel.name}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6 text-foreground/80 space-y-4">
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-2 w-1/4">
          {hotel.address && (
            <div className="space-y-1">
              <div className="flex flex-row items-center gap-2">
                <MapPin className="w-4 h-4" />
                <p className="font-medium">Dirección:</p>
              </div>
              <p className="ml-6 text-sm">{hotel.address}</p>
            </div>
          )}

          {hotel.phone && (
            <div className="space-y-1">
              <div className="flex flex-row items-center gap-2">
                <Phone className="w-4 h-4" />
                <p className="font-medium">Teléfono:</p>
              </div>
              <p className="ml-6 text-sm">{hotel.phone}</p>
            </div>
          )}

          {hotel.parking && (
            <div className="space-y-1">
              <div className="flex flex-row items-center gap-2">
                <Car className="w-4 h-4" />
                <p className="font-medium">Estacionamiento:</p>
              </div>
              <p className="ml-6 text-sm">{hotel.parking}</p>
            </div>
          )}

          {hotel.directions && (
            <div className="space-y-1">
              <div className="flex flex-row items-center gap-2">
                <MapPin className="w-4 h-4" />
                <p className="font-medium">Cómo llegar:</p>
              </div>
              <p className="ml-6 text-sm">{hotel.directions}</p>
            </div>
          )}

          {hotel.promoCode && (
            <div className="space-y-1">
              <div className="flex flex-row items-center gap-2">
                <Gift className="w-4 h-4" />
                <p className="font-medium">Código promocional:</p>
              </div>
              <p className="ml-6 text-sm font-mono bg-primary/10 px-2 py-1 rounded inline-block">
                {hotel.promoCode}
              </p>
            </div>
          )}
        </div>
        <div className="w-3/4">
          <p className="text-sm">{hotel.description}</p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-end">
      <Button variant="outline" asChild>
        <Link href={hotel.website || ""} target="_blank">
          Reservar
        </Link>
      </Button>
    </CardFooter>
  </Card>
);
