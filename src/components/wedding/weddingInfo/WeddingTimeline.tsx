"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { formatDate, formatDateWithDay } from "@/lib/date-utils";

export function WeddingTimeline() {
  const config = useWeddingConfig();
  const { date } = config;
  const weddingDate = formatDateWithDay(date.date);

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline">Cronograma de la boda</CardTitle>
        <CardDescription>{weddingDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-start gap-2">
            <span className="font-bold">{date.ceremonyTime}:</span>
            <span>Comienza la ceremonia</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">{formatDate(date.date, "HH:mm")}</span>
            <span>Hora de la cena</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">{date.receptionTime}:</span>
            <span>Cena de la recepción</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">{formatDate(date.date, "HH:mm")}</span>
            <span>Comienza la fiesta</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold">{formatDate(date.date, "HH:mm")}</span>
            <span>Despedida</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
