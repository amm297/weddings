import { Gift, ShoppingBag, Plane, Home } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const registryItems = [
  {
    name: "Amazon",
    url: "#",
    description: "For a variety of home goods and fun gadgets.",
    icon: <ShoppingBag className="w-6 h-6" />,
    popular: true,
  },
  {
    name: "Crate & Barrel",
    url: "#",
    description: "To help us build our dream kitchen and dining space.",
    icon: <Home className="w-6 h-6" />,
  },
  {
    name: "Honeymoon Fund",
    url: "#",
    description: "Contribute to our dream getaway adventure!",
    icon: <Plane className="w-6 h-6" />,
  },
];

export function Registry() {
  return (
    <section id="registry" className="py-12 md:py-20 bg-accent scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <Badge
            variant="outline"
            className="mb-4 font-headline border-primary/30 text-primary px-3 py-1"
          >
            GIFTS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-headline mb-4 text-foreground">
            Wedding Registry
          </h2>
          <p className="mx-auto text-foreground/80">
            Your presence at our wedding is the greatest gift of all. However,
            if you wish to honor us with a gift, we have registered at the
            following places.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {registryItems.map((item) => (
            <Card
              key={item.name}
              className={cn(
                "flex flex-col border-primary/20 overflow-hidden",
                "transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              )}
            >
              <CardHeader className="bg-primary/5 pb-4">
                <div className="flex justify-between items-start">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    {item.icon}
                  </div>
                  {item.popular && (
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground"
                    >
                      Popular
                    </Badge>
                  )}
                </div>
                <CardTitle className="font-headline text-xl mt-4">
                  {item.name}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-grow py-4">
                <ul className="text-left text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Easy online ordering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Free shipping options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Gift tracking</span>
                  </li>
                </ul>
              </CardContent>

              <CardFooter className="pt-0">
                <Button asChild className="w-full">
                  <Link href={item.url}>View Registry</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
