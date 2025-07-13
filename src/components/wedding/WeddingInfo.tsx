import { MapPin, Clapperboard, Shirt, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InfoCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="w-full bg-card shadow-lg rounded-lg overflow-hidden transition-transform hover:-translate-y-1">
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6 bg-primary/5">
      <div className="text-primary">{icon}</div>
      <CardTitle className="font-headline text-2xl text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-6 text-foreground/80 space-y-2">
      {children}
    </CardContent>
  </div>
);

export function WeddingInfo() {
  return (
    <section className="py-12 md:py-20 bg-accent">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-8 md:mb-12 text-foreground">
          The Details
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <InfoCard icon={<Clapperboard className="w-8 h-8"/>} title="The Ceremony">
            <p><strong>Time:</strong> 4:00 PM</p>
            <p><strong>Venue:</strong> The Grand Estate Gardens</p>
            <p>123 Love Lane, Celebration City</p>
          </InfoCard>

          <InfoCard icon={<Sparkles className="w-8 h-8"/>} title="The Reception">
            <p><strong>Time:</strong> 6:00 PM onwards</p>
            <p><strong>Venue:</strong> The Grand Estate Ballroom</p>
            <p>Join us for dinner, drinks, and dancing!</p>
          </InfoCard>

          <InfoCard icon={<MapPin className="w-8 h-8"/>} title="Getting There">
            <p>Ample parking is available at the venue. For those traveling, we recommend booking accommodation nearby.</p>
            <a href="#" className="text-primary hover:underline font-bold">View on map</a>
          </InfoCard>

          <InfoCard icon={<Shirt className="w-8 h-8"/>} title="Dress Code">
            <p><strong>Formal Attire</strong></p>
            <p>We invite you to be in your best-dressed! Suits and cocktail dresses are perfect.</p>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
