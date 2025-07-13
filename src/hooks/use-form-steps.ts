import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface Step {
  name: string;
  label: string;
}

export interface UseFormStepsOptions<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  initialSteps: Step[];
  onStepsChange?: (steps: Step[]) => void;
}

export function useFormSteps<T extends Record<string, any>>({
  form,
  initialSteps,
  onStepsChange,
}: UseFormStepsOptions<T>) {
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  const totalSteps = steps.length;

  const updateSteps = (newSteps: Step[]) => {
    setSteps(newSteps);
    if (onStepsChange) {
      onStepsChange(newSteps);
    }
    
    // Ensure current step is valid with new steps
    if (step >= newSteps.length) {
      setStep(Math.max(0, newSteps.length - 1));
    }
  };

  const nextStep = async () => {
    const currentFieldName = steps[step].name as keyof T;
    
    // Validate the current field before proceeding
    const result = await form.trigger(currentFieldName as any);
    if (!result) return;
    
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < totalSteps) {
      setStep(index);
    }
  };

  const goToStepByName = (name: string) => {
    const index = steps.findIndex(s => s.name === name);
    if (index >= 0) {
      setStep(index);
    }
  };

  const resetSteps = () => {
    setStep(0);
  };

  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;
  const currentStep = steps[step];

  return {
    step,
    steps,
    totalSteps,
    currentStep,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    goToStepByName,
    updateSteps,
    resetSteps,
  };
} 