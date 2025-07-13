"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RSVPFormValues } from "@/db/rsvp-model";

export default function DietaryStep({
  form,
}: {
  form: UseFormReturn<RSVPFormValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="dietaryRestrictions"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Restricciones alimentarias</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Por favor, indícanos si tienes alguna restricción alimentaria o alergia"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
