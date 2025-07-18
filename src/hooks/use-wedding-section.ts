"use client";

import { useContext } from "react";
import { Section } from "../db/wedding-model";
import { WeddingConfigContext } from "../providers/WeddingConfigProvider";

export const useWeddingSection = (sectionId: string): Section | undefined => {
  const context = useContext(WeddingConfigContext);
  return context.sections?.find((section) => section.id === sectionId);
};
