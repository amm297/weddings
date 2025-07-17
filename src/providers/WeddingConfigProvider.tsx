"use client";

import React, { createContext, ReactNode, useState, useEffect } from "react";
import { WeddingConfig } from "../db/wedding-model";
import { weddingModel } from "../db";
import { LoadingIndicator } from "@/components/ui/loading-indicator";

// Create a default empty wedding config
const defaultWeddingConfig: WeddingConfig = {
  couple: {
    person1: { name: "Loading..." },
    person2: { name: "Loading..." },
  },
  date: {
    date: new Date(),
    ceremonyTime: "",
    receptionTime: "",
    timezone: "",
  },
  location: {
    name: "",
    address: "",
    city: "",
    country: "",
  },
  colorScheme: {
    primary: "#000000",
    secondary: "#000000",
    accent: "#000000",
    background: "#FFFFFF",
    text: "#000000",
    subtext: "#000000",
    accentText: "#000000",
  },
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
    // // If config is provided directly, use it
    // if (config) {
    //   setWeddingConfig(config);
    //   setLoading(false);
    //   return;
    // }

    // // If slug is provided, fetch from Firestore
    // if (slug) {
    //   const fetchWedding = async () => {
    //     try {
    //       const wedding = await weddingModel.findBySlug(slug);
    //       if (wedding) {
    //         setWeddingConfig(wedding);
    //       } else {
    //         console.error(`Wedding with slug "${slug}" not found`);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching wedding config:", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchWedding();
    // }
  }, [slug, config]);

  return (
    <WeddingConfigContext.Provider value={weddingConfig}>
      {loading ? <LoadingIndicator /> : null}
      {children}
    </WeddingConfigContext.Provider>
  );
};

export default WeddingConfigProvider;
