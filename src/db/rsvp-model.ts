import * as z from "zod";
import { where, DocumentSnapshot } from "firebase/firestore";
import { BaseModel, BaseDocument } from "./base-model";

// RSVP Schema definition using Zod
export const rsvpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Por favor, introduce tu nombre completo" }),
  email: z.string().email({ message: "Por favor, introduce un email válido" }),
  attendance: z.enum(["yes", "no"], {
    message: "Por favor, indica si asistirás",
  }),
  guests: z.number().min(0).max(10),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
});

export type RSVPFormValues = z.infer<typeof rsvpSchema>;

// RSVP Document type for Firestore
export interface RSVPDocument extends BaseDocument {
  name: string;
  email: string;
  attendance: "yes" | "no";
  guests: number;
  dietaryRestrictions?: string;
  message?: string;
}

export class RSVPModel extends BaseModel<RSVPDocument> {
  protected collectionName = "rsvps";

  protected fromFirestore(snapshot: DocumentSnapshot): RSVPDocument | null {
    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data?.name || "",
      email: data?.email || "",
      attendance: data?.attendance || "no",
      guests: data?.guests || 0,
      dietaryRestrictions: data?.dietaryRestrictions,
      message: data?.message,
      createdAt: data?.createdAt,
      updatedAt: data?.updatedAt,
    };
  }

  /**
   * Find RSVPs by attendance status
   */
  async findByAttendance(attendance: "yes" | "no"): Promise<RSVPDocument[]> {
    return this.find([where("attendance", "==", attendance)]);
  }

  /**
   * Find RSVP by email
   */
  async findByEmail(email: string): Promise<RSVPDocument | null> {
    const results = await this.find([where("email", "==", email)]);
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Get total guest count from confirmed RSVPs
   */
  async getTotalGuestCount(): Promise<number> {
    const confirmedRsvps = await this.findByAttendance("yes");
    return confirmedRsvps.reduce((total, rsvp) => total + rsvp.guests + 1, 0);
  }
}
