"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RSVPFormValues } from "@/db/rsvp-model";

export default function AttendanceStep({
  form,
}: {
  form: UseFormReturn<RSVPFormValues>;
}) {
  return (
    <FormField
      control={form.control}
      name="attendance"
      render={({ field }) => (
        <FormItem>
          <FormLabel>¿Asistirás a nuestra boda?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col space-y-1"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="yes" />
                </FormControl>
                <FormLabel className="font-normal">Sí, asistiré</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="no" />
                </FormControl>
                <FormLabel className="font-normal">No podré asistir</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
