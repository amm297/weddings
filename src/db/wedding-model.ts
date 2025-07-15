import { DocumentSnapshot, where } from "firebase/firestore";
import { BaseModel, BaseDocument } from "./base-model";

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
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  subtext: string;
  accentText: string;
  muted?: string;
  border?: string;
  input?: string;
  ring?: string;
  destructive?: string;
}

export interface AdditionalInfo {
  title: string;
  description: string;
  icon?: string;
}

export interface FAQSection {
  title: string;
  subtitle: string;
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface WeddingConfig {
  couple: WeddingCouple;
  date: WeddingDate;
  location: WeddingLocation;
  colorScheme: ColorScheme;
  rsvpDeadline?: Date;
  additionalInfo?: {
    [key: string]: AdditionalInfo;
  };
  faq?: FAQSection;
}

export interface WeddingDocument extends BaseDocument, WeddingConfig {
  slug: string;
}

export class WeddingModel extends BaseModel<WeddingDocument> {
  protected collectionName = "weddings";

  protected fromFirestore(snapshot: DocumentSnapshot): WeddingDocument | null {
    if (!snapshot.exists()) return null;

    const data = snapshot.data();

    return {
      id: snapshot.id,
      slug: data?.slug || "",
      couple: data?.couple || {
        person1: { name: "" },
        person2: { name: "" },
      },
      date: {
        date: data.date.date?.toDate(),
        ceremonyTime: data.date.ceremonyTime || "",
        receptionTime: data.date.receptionTime || "",
        timezone: data.date.timezone || "",
      },
      location: data?.location || {
        name: "",
        address: "",
        city: "",
        country: "",
      },
      colorScheme: data?.colorScheme || {
        primary: "#000000",
        secondary: "#000000",
        accent: "#000000",
        background: "#FFFFFF",
        text: "#000000",
        subtext: "#000000",
        accentText: "#000000",
      },
      rsvpDeadline: data?.rsvpDeadline?.toDate(),
      additionalInfo: data?.additionalInfo || {},
      faq: data?.faq || {
        title: "",
        subtitle: "",
        faqs: [],
      },
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    };
  }

  /**
   * Find a wedding by its slug
   */
  async findBySlug(slug: string): Promise<WeddingDocument | null> {
    try {
      console.log("Finding wedding by slug:", slug);
      const results = await this.find([where("slug", "==", slug)]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error("Error finding wedding by slug:", error);
      return null;
    }
  }
}
