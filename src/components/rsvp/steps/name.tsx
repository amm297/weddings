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

export default function NameStep({
  form,
}: {
  form: UseFormReturn<RSVPFormValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre completo</FormLabel>
          <FormControl>
            <Input placeholder="Tu nombre y apellidos" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
