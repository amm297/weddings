import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { RSVPFormValues } from "@/types/RSVP";
import { useFormSteps } from "./use-form-steps";

export function useRSVPFormSteps(form: UseFormReturn<RSVPFormValues>) {
  const isAttending = form.watch("attendance") === "yes";

  // Define the initial form steps
  const initialSteps = [
    { name: "name", label: "Nombre completo" },
    { name: "email", label: "Email" },
    { name: "attendance", label: "Asistencia" },
    ...(isAttending
      ? [
          { name: "guests", label: "Acompañantes" },
          { name: "dietaryRestrictions", label: "Restricciones alimentarias" },
        ]
      : []),
    { name: "message", label: "Mensaje" },
  ];

  const formSteps = useFormSteps<RSVPFormValues>({
    form,
    initialSteps,
  });

  // Update steps when attendance changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "attendance") {
        const isUserAttending = value.attendance === "yes";
        const newSteps = [
          { name: "name", label: "Nombre completo" },
          { name: "email", label: "Email" },
          { name: "attendance", label: "Asistencia" },
          ...(isUserAttending
            ? [
                { name: "guests", label: "Acompañantes" },
                {
                  name: "dietaryRestrictions",
                  label: "Restricciones alimentarias",
                },
              ]
            : []),
          { name: "message", label: "Mensaje" },
        ];
        formSteps.updateSteps(newSteps);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, formSteps]);

  // Handle final submission
  const handleSubmit = async (
    onSubmit: (data: RSVPFormValues) => Promise<void>
  ) => {
    // Validate all fields before submission
    const isValid = await form.trigger();
    if (!isValid) {
      // Find the first field with an error and navigate to that step
      const fieldNames = Object.keys(form.formState.errors) as Array<
        keyof RSVPFormValues
      >;
      if (fieldNames.length > 0) {
        const errorField = fieldNames[0];
        const errorStepIndex = formSteps.steps.findIndex(
          (s) => s.name === errorField
        );
        if (errorStepIndex >= 0) {
          formSteps.goToStep(errorStepIndex);
          return;
        }
      }
      return;
    }

    // If all validations pass, submit the form
    form.handleSubmit(onSubmit)();
  };

  // Render the current step based on its name
  const renderStep = (components: {
    name: React.ReactNode;
    email: React.ReactNode;
    attendance: React.ReactNode;
    guests: React.ReactNode;
    dietaryRestrictions: React.ReactNode;
    message: React.ReactNode;
    [key: string]: React.ReactNode;
  }) => {
    const currentStepName = formSteps.currentStep?.name;
    return components[currentStepName] || null;
  };

  return {
    ...formSteps,
    handleSubmit,
    renderStep,
  };
}
