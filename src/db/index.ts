// Export base model and types
export * from "./base-model";

// Export model classes
export * from "./rsvp-model";

// Create instances for direct use
import { RSVPModel } from "./rsvp-model";

// Singleton instances
export const rsvpModel = new RSVPModel();
