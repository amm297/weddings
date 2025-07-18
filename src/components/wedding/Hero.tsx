"use client";

import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { formatDate } from "@/lib/date-utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Hero() {
  const config = useWeddingConfig();
  const pathname = usePathname();

  // Extract the slug from the pathname
  const slug = pathname.split("/")[1];

  return (
    <section className="w-full py-20 md:py-32 lg:py-40 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/hero-background.png')",
          backgroundSize: "800px",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <Card className="max-w-3xl mx-auto bg-background/50 backdrop-blur-sm border-primary/20 bg-accent">
          <CardContent className="pt-6 pb-8 px-6 md:px-10">
           
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
