"use client";

import { useContext } from "react";
import { WeddingConfig } from "../db/wedding-model";
import { WeddingConfigContext } from "../providers/WeddingConfigProvider";

export const useWeddingConfig = (): WeddingConfig => {
  const context = useContext(WeddingConfigContext);
  return context;
};
