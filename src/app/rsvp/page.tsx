"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/date-utils";

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

export default function RSVPPage() {
  const { toast } = useToast();
  const config = useWeddingConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      attendance: "yes",
      guests: 0,
      dietaryRestrictions: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your backend/Firebase
      console.log(data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "RSVP enviado",
        description: "Gracias por confirmar tu asistencia.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Hubo un problema al enviar tu RSVP. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="py-20 md:py-32 bg-accent min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-2xl mx-auto bg-background/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl">
              RSVP
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Por favor, confirma tu asistencia antes del{" "}
              {config.rsvpDeadline &&
                formatDate(config.rsvpDeadline, "d 'de' MMMM 'de' yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            <FormLabel className="font-normal">
                              Sí, asistiré
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              No podré asistir
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("attendance") === "yes" && (
                  <>
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de acompañantes</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
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
                  </>
                )}

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje para los novios (opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Deja un mensaje para los novios"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full font-headline"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar RSVP"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
