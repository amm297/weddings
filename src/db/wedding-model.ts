import { DocumentSnapshot, where } from "firebase/firestore";
import { BaseModel, BaseDocument } from "./base-model";
import { serializeDate } from "@/lib/date-utils";

export interface Person {
  name: string;
}

export interface Couple {
  person1: Person;
  person2: Person;
}

export interface Location {
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
  googleMapsUrl?: string;
  description?: string;
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

export interface Section {
  id: string;
  name?: string;
  layout?:
    | "main"
    | "default"
    | "timeline"
    | "faq"
    | "hotel"
    | "bankaccount"
    | "rsvp";
  title?: string;
  subtitle?: string;
  description?: string | string[];
  icon?: string;
  backgroundImage?: string;
  overlay?: boolean;
  cta?: SectionCTA;
}

export interface SectionCTA {
  text: string;
  link: string;
}

export interface CeremonySection extends Section {
  couple: Couple;
  location: Location;
  date: Date;
  timezone: string;
}

export interface FAQSection extends Section {
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface HotelSection extends Section {
  hotels: Hotel[];
}

export interface Hotel {
  name: string;
  promoCode?: string;
  address?: string;
  phone?: string;
  website?: string;
  imageUrl?: string;
  description?: string;
  parking?: string;
  directions?: string;
}

export interface BankAccountSection extends Section {
  bankAccount: BankAccount;
}
export interface BankAccount {
  buttonText?: string;
  accountNumber: string;
}

export interface TimelineSection extends Section {
  transitionImage: string;
  timeline: Timeline[];
}
export interface Timeline {
  image: string;
  imagePosition: "up" | "down";
  text: string;
  subtext: string;
}

export interface RsvpSection extends Section {
  deadline: Date;
  form?: string;
}

export interface Summary {
  couple: Couple;
  date: Date;
  location: string;
}

export interface WeddingConfig {
  colorScheme: ColorScheme;
  summary: Summary;
  sections?: Section[];
}

export interface WeddingDocument extends BaseDocument, WeddingConfig {
  slug: string;
}

export class WeddingModel extends BaseModel<WeddingDocument> {
  protected collectionName = "weddings";

  protected fromFirestore(snapshot: DocumentSnapshot): WeddingDocument | null {
    if (!snapshot.exists()) return null;

    const data = snapshot.data();

    // Check if data exists
    if (!data) return null;

    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    console.log("data at form firestore");
    console.log(data);

    return {
      id: snapshot.id,
      slug: data?.slug || "",
      summary: data?.summary || {},
      colorScheme: data?.colorScheme || {},
      sections: data?.sections || [],
    };
  }

  /**
   * Find a wedding by its slug
   */
  async findBySlug(slug: string): Promise<WeddingDocument | null> {
    try {
      console.log("Finding wedding by slug:", slug);
      const results = await this.find([where("slug", "==", slug)]);
      return results.length > 0
        ? this.serializeWeddingDates(results[0])!
        : null;
    } catch (error) {
      console.error("Error finding wedding by slug:", error);
      return null;
    }
  }

  /**
   * Serialize all date objects in the wedding data to avoid
   * "Only plain objects can be passed to Client Components" error
   */
  serializeWeddingDates(
    wedding: WeddingDocument | null
  ): WeddingDocument | undefined {
    if (!wedding) return undefined;

    const serialized = { ...wedding } as any;

    // Serialize summary date
    if (serialized.summary?.date) {
      serialized.summary = {
        ...serialized.summary,
        date: serializeDate(serialized.summary.date),
      };
    }

    // Serialize dates in sections
    if (serialized.sections && Array.isArray(serialized.sections)) {
      serialized.sections = serialized.sections.map((section: any) => {
        const newSection = { ...section };

        // Handle ceremony date
        if (newSection.date) {
          newSection.date = serializeDate(newSection.date);
        }

        // Handle RSVP deadline
        if (newSection.deadline) {
          newSection.deadline = serializeDate(newSection.deadline);
        }

        return newSection;
      });
    }

    return serialized;
  }
}
