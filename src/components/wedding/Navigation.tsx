"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/hooks/use-navigation";
import { useWeddingConfig } from "@/hooks/use-wedding-config";

export function Navigation() {
  const config = useWeddingConfig();
  const pathname = usePathname();

  // Extract the slug from the pathname
  const slug = pathname.split("/")[1];

  // Define navigation items with dynamic paths based on slug
  const navItems = [
    { label: "Detalles", href: "#details" },
    // { label: "Galería", href: "#gallery" },
    // { label: "Registro", href: "#registry" },
    { label: "Cuenta atrás", href: "#countdown" },
    { label: "FAQ", href: "#faq" },
    { label: "Hoteles", href: "#hotels" },
    { label: "Cuenta bancaria", href: "#bank-account" },
    { label: "RSVP", href: `/${slug}/rsvp` },
  ];

  const { isScrolled, activeSection } = useNavigation(navItems);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-accent"
        // isScrolled
        //   ? "bg-background/95 backdrop-blur-sm shadow-sm py-2"
        //   : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div id="home" className="flex items-center justify-between">
          <Link
            href={`/${slug}`}
            className="font-sageffine text-2xl text-foreground text-bold"
          >
            {config.couple.person1.name} & {config.couple.person2.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive =
                (item.href.startsWith("/") && pathname === item.href) ||
                (item.href.startsWith("#") &&
                  activeSection === item.href.substring(1));

              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    "text-base relative border-b-2 border-transparent transition-all",
                    isActive &&
                      "text-primary font-medium border-b-2 border-accent",
                    "hover:text-primary hover:font-medium hover:border-accent"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              );
            })}
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
                    (item.href.startsWith("/") && pathname === item.href) ||
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
                        "justify-start text-lg relative border-b-2 border-transparent transition-all",
                        isActive && "text-primary font-medium",
                        isActive && !isHome && "border-accent",
                        "hover:text-primary hover:font-medium hover:border-accent"
                      )}
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
