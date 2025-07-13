"use client";

import React, { createContext, ReactNode } from "react";
import weddingConfig, { WeddingConfig } from "../config/wedding";

// Create context with default value
export const WeddingConfigContext = createContext<WeddingConfig>(weddingConfig);

interface WeddingConfigProviderProps {
  children: ReactNode;
  config?: WeddingConfig; // Optional override for testing or custom configs
}

export const WeddingConfigProvider: React.FC<WeddingConfigProviderProps> = ({
  children,
  config = weddingConfig, // Use default config if none provided
}) => {
  return (
    <WeddingConfigContext.Provider value={config}>
      {children}
    </WeddingConfigContext.Provider>
  );
};

export default WeddingConfigProvider;
