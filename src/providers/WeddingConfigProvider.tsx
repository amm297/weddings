"use client";

import React, { createContext, ReactNode, useState, useEffect } from "react";
import { WeddingConfig } from "../db/wedding-model";
import { weddingModel } from "../db";

// Create a default empty wedding config
const defaultWeddingConfig: WeddingConfig = {
  colorScheme: {
    primary: "",
    secondary: "",
    accent: "",
    background: "",
    text: "",
    subtext: "",
    accentText: "",
  },
  summary: {
    couple: {
      person1: { name: "" },
      person2: { name: "" },
    },
    date: new Date(),
    location: "",
  },
  sections: [],
};

// Create context with default value
export const WeddingConfigContext =
  createContext<WeddingConfig>(defaultWeddingConfig);

interface WeddingConfigProviderProps {
  children: ReactNode;
  slug?: string; // Wedding slug to fetch from Firestore
  config?: WeddingConfig; // Optional override for testing or custom configs
}

export const WeddingConfigProvider: React.FC<WeddingConfigProviderProps> = ({
  children,
  slug,
  config,
}) => {
  const [weddingConfig, setWeddingConfig] = useState<WeddingConfig>(
    config || defaultWeddingConfig
  );
  const [loading, setLoading] = useState<boolean>(!config && !!slug);

  useEffect(() => {
    // If config is provided directly, use it
    if (config) {
      setWeddingConfig(config);
      setLoading(false);
      return;
    }

    // If slug is provided but no config, fetch from Firestore
    if (slug && !config) {
      const fetchWedding = async () => {
        try {
          console.log("fetching wedding provider");
          const wedding = await weddingModel.findBySlug(slug);
          if (wedding) {
            setWeddingConfig(wedding);
          } else {
            console.error(`Wedding with slug "${slug}" not found`);
          }
        } catch (error) {
          console.error("Error fetching wedding config:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchWedding();
    }
  }, [slug, config]);

  return (
    <WeddingConfigContext.Provider value={weddingConfig}>
      {children}
    </WeddingConfigContext.Provider>
  );
};

export default WeddingConfigProvider;
