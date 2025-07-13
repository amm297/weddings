import * as z from "zod";

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
