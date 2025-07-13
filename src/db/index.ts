// Export base model and types
export * from "./base-model";

// Export model classes
export * from "./rsvp-model";
export * from "./wedding-model";

// Create instances for direct use
import { RSVPModel } from "./rsvp-model";
import { WeddingModel } from "./wedding-model";

// Singleton instances
export const rsvpModel = new RSVPModel();
export const weddingModel = new WeddingModel();
