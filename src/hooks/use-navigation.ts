import { useState, useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

export function useNavigation(navItems: NavItem[]) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = navItems
        .filter((item) => item.href.startsWith("#"))
        .map((item) => item.href.substring(1));

      // Find the current section in view
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Element is in view if its top is near the top of the viewport
          // We use a small offset to give some leeway
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    // Smooth scroll function for anchor links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100, // Offset for header
            behavior: "smooth",
          });
          // Update URL without reload
          window.history.pushState({}, "", href);
        }
      }
    };

    // Add click event listeners to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", handleLinkClick as EventListener);
    });

    window.addEventListener("scroll", handleScroll);
    // Initial check for active section
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", handleLinkClick as EventListener);
      });
    };
  }, [navItems]);

  return { isScrolled, activeSection };
}
