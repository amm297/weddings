import { Hero } from "@/components/wedding/Hero";
import { CountdownTimer } from "@/components/wedding/CountdownTimer";
import { WeddingInfo } from "@/components/wedding/WeddingInfo";
import { PhotoGallery } from "@/components/wedding/PhotoGallery";
import { Registry } from "@/components/wedding/Registry";
import { GuestBook } from "@/components/wedding/GuestBook";
import { Footer } from "@/components/wedding/Footer";
import { Separator } from "@/components/ui/separator";

export default function WeddingPage() {
  const weddingDate = new Date("2025-09-20T16:00:00");

  return (
    <div id="home" className="flex flex-col min-h-dvh bg-background font-body">
      <main className="flex-grow">
        <Hero />
        <CountdownTimer targetDate={weddingDate} />
        <WeddingInfo />
        <Separator className="my-12 md:my-20 bg-primary/20 max-w-4xl mx-auto" />
        <PhotoGallery />
        <Separator className="my-12 md:my-20 bg-primary/20 max-w-4xl mx-auto" />
        <Registry />
        <Separator className="my-12 md:my-20 bg-primary/20 max-w-4xl mx-auto" />
        <GuestBook />
      </main>
      <Footer />
    </div>
  );
}
