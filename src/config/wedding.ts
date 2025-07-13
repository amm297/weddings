export interface Person {
  name: string;
  description?: string;
  image?: string;
}

export interface WeddingCouple {
  person1: Person;
  person2: Person;
}

export interface WeddingLocation {
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
  googleMapsUrl?: string;
  imageUrl?: string;
  description?: string;
  parking?: string;
}

export interface WeddingDate {
  date: Date;
  ceremonyTime: string;
  receptionTime: string;
  timezone: string;
}

export interface ColorScheme {
  // Base colors
  primary: string;
  secondary: string;
  accent: string;
  background: string;

  // Text colors
  text: string;
  subtext: string;
  accentText: string;

  // Optional additional colors for more tailwind customization
  muted?: string;
  border?: string;
  input?: string;
  ring?: string;
  destructive?: string;
}

export interface DressCode {
  name: string;
  description: string;
}

export interface AdditionalInfo {
  title: string;
  description: string;
  icon?: string;
}

export interface WeddingConfig {
  couple: WeddingCouple;
  date: WeddingDate;
  location: WeddingLocation;
  colorScheme: ColorScheme;
  hashtag?: string;
  rsvpDeadline?: Date;
  dressCode?: DressCode;
  additionalInfo?: {
    [key: string]: AdditionalInfo;
  };
}

// Default wedding configuration
const weddingConfig: WeddingConfig = {
  couple: {
    person1: {
      name: "Partner One",
      description: "Brief description about Partner One",
      image: "/images/partner1.jpg",
    },
    person2: {
      name: "Partner Two",
      description: "Brief description about Partner Two",
      image: "/images/partner2.jpg",
    },
  },
  date: {
    date: new Date("2025-09-20T16:00:00"),
    ceremonyTime: "16:00",
    receptionTime: "18:00",
    timezone: "Europe/Madrid",
  },
  location: {
    name: "Wedding Venue",
    address: "123 Wedding Lane",
    city: "Wedding City",
    state: "WS",
    country: "Country",
    zipCode: "12345",
    googleMapsUrl: "https://maps.google.com/?q=Wedding+Venue",
    imageUrl: "/images/venue.jpg",
    description:
      "A beautiful venue nestled in the heart of Wedding City, offering stunning views and elegant spaces for our ceremony and reception.",
    parking:
      "Ample parking is available at the venue. For those traveling, we recommend booking accommodation nearby.",
  },
  colorScheme: {
    // Base colors
    primary: "#8A9A5B", // Olive Green
    secondary: "#A3B18A", // Sage Green
    accent: "#F5F5F5", // Cream
    background: "#FFFFFF", // White

    // Text colors
    text: "#333333", // Dark gray
    subtext: "#666666", // Medium gray
    accentText: "#333333", // Dark gray for accent backgrounds

    // Additional colors
    muted: "#F0F0F0", // Light gray for muted backgrounds
    border: "#E0E0E0", // Border color
    input: "#DDDDDD", // Input border color
    ring: "#8A9A5B", // Focus ring (same as primary)
    destructive: "#E57373", // Red for destructive actions
  },

  hashtag: "#HappilyEverAfter",
  rsvpDeadline: new Date("2024-11-15"),
  additionalInfo: {
    dressCode: {
      title: "Formal Attire",
      description:
        "We invite you to be in your best-dressed! Suits and cocktail dresses are perfect.",
      icon: "shirt",
    },
    accommodation: {
      title: "Accommodation",
      description:
        "We've arranged special rates at nearby hotels. Please contact us for details.",
      icon: "hotel",
    },
    gifts: {
      title: "Gifts",
      description:
        "Your presence is the greatest gift. If you wish to give something, we have a registry available.",
      icon: "gift",
    },
  },
};

export default weddingConfig;
