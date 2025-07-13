"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RSVPFormValues, rsvpSchema } from "@/types/RSVP";
import { useRSVPFormSteps } from "@/hooks/use-rsvp-form-steps";
import NameStep from "./steps/name";
import EmailStep from "./steps/email";
import AttendanceStep from "./steps/attendance";
import GuestsStep from "./steps/guests";
import DietaryStep from "./steps/dietary";
import MessageStep from "./steps/message";

export default function RSVPForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      email: "",
      attendance: "yes",
      guests: 0,
      dietaryRestrictions: "",
      message: "",
    },
  });

  const {
    currentStep,
    step,
    totalSteps,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
    resetSteps,
    renderStep,
    handleSubmit,
  } = useRSVPFormSteps(form);

  async function onSubmit(data: RSVPFormValues) {
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
      resetSteps();
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
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            Paso {step + 1} de {totalSteps}
          </p>
        </div>

        {renderStep({
          name: <NameStep form={form} />,
          email: <EmailStep form={form} />,
          attendance: <AttendanceStep form={form} />,
          guests: <GuestsStep form={form} />,
          dietaryRestrictions: <DietaryStep form={form} />,
          message: <MessageStep form={form} />,
        })}

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
          >
            Anterior
          </Button>

          {isLastStep ? (
            <Button
              type="button"
              onClick={() => handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar RSVP"}
            </Button>
          ) : (
            <Button type="button" onClick={nextStep}>
              Siguiente
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
