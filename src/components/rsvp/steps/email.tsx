"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RSVPFormValues } from "@/db/rsvp-model";

export default function EmailStep({
  form,
}: {
  form: UseFormReturn<RSVPFormValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="tu@email.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
