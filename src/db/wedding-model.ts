import { DocumentSnapshot, where } from "firebase/firestore";
import { BaseModel, BaseDocument } from "./base-model";

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
  layout?: "default" | "timeline" | "faq" | "hotel" | "bankaccount" | "rsvp";
  title?: string;
  subtitle?: string;
  description?: string | string[];
  icon?: string;
  backgroundImage?: string;
  overlay?: boolean
  cta?: SectionCTA
}

export interface SectionCTA {
  text: string;
  link: string;
}

export interface Ceremony extends Section {
  couple: Couple,
  location: Location,
  date: Date,
  timezone: string
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
  deadline: Date
  form?: string
}

export interface WeddingConfig {
  colorScheme: ColorScheme;
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

    return {
      id: snapshot.id,
      slug: data?.slug || "",
      colorScheme: data?.colorScheme || {},
      sections: data?.sections || [],
    }
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
