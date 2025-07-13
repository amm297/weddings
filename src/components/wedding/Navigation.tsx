"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/hooks/use-navigation";

const navItems = [
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "Registry", href: "#registry" },
  { label: "RSVP", href: "#rsvp" },
];

export function Navigation() {
  const { isScrolled, activeSection } = useNavigation(navItems);
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div id="home" className="flex items-center justify-between">
          <Link
            href="#home"
            className="font-headline text-2xl font-bold text-primary"
          >
            O&L
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href.startsWith("#") &&
                  activeSection === item.href.substring(1));

              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    "font-headline text-base relative border-b-2 border-transparent transition-all",
                    isActive &&
                      "text-primary font-medium border-b-2 border-accent",
                    "hover:text-primary hover:font-medium hover:border-accent"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              );
            })}
            <Button
              variant="default"
              size="sm"
              className="ml-2 font-headline"
              asChild
            >
              <Link href="#rsvp">RSVP Now</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href.startsWith("#") &&
                      activeSection === item.href.substring(1));
                  const isHome = item.href === "#home";

                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      size="lg"
                      asChild
                      className={cn(
                        "justify-start font-headline text-lg relative border-b-2 border-transparent transition-all",
                        isActive && "text-primary font-medium",
                        isActive && !isHome && "border-accent",
                        "hover:text-primary hover:font-medium hover:border-accent"
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  );
                })}
                <Button
                  variant="default"
                  size="lg"
                  className="mt-4 font-headline w-full"
                  asChild
                >
                  <Link href="#rsvp">RSVP Now</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
