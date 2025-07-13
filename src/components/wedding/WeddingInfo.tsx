import { MapPin, Clapperboard, Shirt, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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
  return (
    <section id="details" className="py-12 md:py-20 bg-accent scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-headline text-center mb-8 md:mb-12 text-foreground">
          The Details
        </h2>

        <Tabs defaultValue="venue" className="w-full max-w-4xl mx-auto mb-10">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="venue" className="font-headline">
              Venue
            </TabsTrigger>
            <TabsTrigger value="schedule" className="font-headline">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="info" className="font-headline">
              Information
            </TabsTrigger>
          </TabsList>

          <TabsContent value="venue" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="font-headline">
                  The Grand Estate
                </CardTitle>
                <CardDescription>Our beautiful wedding venue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The Grand Estate is a beautiful venue nestled in the heart of
                  Celebration City, offering stunning views and elegant spaces
                  for our ceremony and reception.
                </p>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  View on Map
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="font-headline">
                  Wedding Day Timeline
                </CardTitle>
                <CardDescription>September 20, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3:30 PM:</span>
                    <span>Guests Arrive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">4:00 PM:</span>
                    <span>Ceremony Begins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">5:00 PM:</span>
                    <span>Cocktail Hour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">6:00 PM:</span>
                    <span>Reception Dinner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">7:30 PM:</span>
                    <span>Dancing Begins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">11:00 PM:</span>
                    <span>Farewell</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="grid gap-8 md:grid-cols-2">
            <InfoCard
              icon={<MapPin className="w-8 h-8" />}
              title="Getting There"
            >
              <p>
                Ample parking is available at the venue. For those traveling, we
                recommend booking accommodation nearby.
              </p>
              <Button variant="link" className="p-0 h-auto text-primary">
                View on map
              </Button>
            </InfoCard>

            <InfoCard icon={<Shirt className="w-8 h-8" />} title="Dress Code">
              <p>
                <strong>Formal Attire</strong>
              </p>
              <p>
                We invite you to be in your best-dressed! Suits and cocktail
                dresses are perfect.
              </p>
            </InfoCard>
          </TabsContent>
        </Tabs>

        <div className="grid gap-8 md:grid-cols-2">
          <InfoCard
            icon={<Clapperboard className="w-8 h-8" />}
            title="The Ceremony"
          >
            <p>
              <strong>Time:</strong> 4:00 PM
            </p>
            <p>
              <strong>Venue:</strong> The Grand Estate Gardens
            </p>
            <p>123 Love Lane, Celebration City</p>
          </InfoCard>

          <InfoCard
            icon={<Sparkles className="w-8 h-8" />}
            title="The Reception"
          >
            <p>
              <strong>Time:</strong> 6:00 PM onwards
            </p>
            <p>
              <strong>Venue:</strong> The Grand Estate Ballroom
            </p>
            <p>Join us for dinner, drinks, and dancing!</p>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}
