import { Heart, Calendar, MapPin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent py-12 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="font-headline text-2xl text-primary">Olivia & Liam</p>
            <p className="text-sm mt-1 text-foreground/70 flex items-center justify-center md:justify-start gap-1">
              <Calendar className="w-3 h-3" />
              <span>September 20, 2025</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
            </Button>
            <Button variant="default" size="sm">
              <Mail className="mr-2 h-4 w-4" /> Contact Us
            </Button>
          </div>
        </div>

        <Separator className="my-6 bg-primary/20" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center md:text-left">
            <h3 className="font-headline text-lg mb-2">Venue</h3>
            <p className="text-sm text-foreground/70">The Grand Estate</p>
            <p className="text-sm text-foreground/70">123 Love Lane</p>
            <p className="text-sm text-foreground/70">Celebration City</p>
          </div>

          <div className="text-center">
            <h3 className="font-headline text-lg mb-2">Quick Links</h3>
            <nav className="flex flex-col gap-1">
              {["Details", "Gallery", "Registry", "RSVP"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-center md:text-right">
            <h3 className="font-headline text-lg mb-2">Follow Our Journey</h3>
            <div className="flex justify-center md:justify-end gap-4 mt-2">
              {["facebook", "instagram", "twitter"].map((social) => (
                <Button
                  key={social}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                  asChild
                >
                  <Link href="#">
                    <span className="sr-only">{social}</span>
                    <Heart className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-primary/20" />

        <div className="text-center text-sm text-foreground/60">
          <p>
            © {currentYear} Olivia & Liam's Wedding | Made with{" "}
            <Heart className="inline h-3 w-3 text-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
}
