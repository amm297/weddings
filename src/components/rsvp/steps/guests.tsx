"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RSVPFormValues } from "@/types/RSVP";

export default function GuestsStep({
  form,
}: {
  form: UseFormReturn<RSVPFormValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="guests"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Número de acompañantes</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(parseInt(value))}
            value={field.value.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el número de acompañantes" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>Sin incluirte a ti</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
