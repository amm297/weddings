"use client";

import { FAQ } from "@/components/wedding/FAQ";
import { Hotel } from "@/components/wedding/Hotel";
import { BankAccount } from "@/components/wedding/BankAccount";
import { Timeline } from "@/components/wedding/Timeline";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { Fragment } from "react";
import { Section } from "@/db";
import { RSVP } from "./Rsvp";
import { DefaultSection } from "./DefaultSection";
import { CountdownTimer } from "./CountdownTimer";
import { Transport } from "./Transport";
import { ImageSection } from "./ImageSection";

export function WeddingDisplay() {
  const config = useWeddingConfig();
  const { sections } = config;

  const renderSection = (section: Section, isEven: boolean) => {
    if (!section) return null;

    switch (section?.layout?.toLowerCase()) {
      case "default":
        return <DefaultSection id={section.id} isEven={isEven} />;
      case "countdown":
        return <CountdownTimer isEven={isEven} />;
      case "timeline":
        return <Timeline isEven={isEven} />;
      case "faq":
        return <FAQ isEven={isEven} />;
      case "hotel":
        return <Hotel isEven={isEven} />;
      case "bankaccount":
        return <BankAccount isEven={isEven} />;
      case "rsvp":
        return <RSVP isEven={isEven} />;
      case "transport":
        return <Transport isEven={isEven} />;
      case "image":
        return <ImageSection id={section.id} isEven={isEven} />;
      default:
        return <></>;
    }
  };

  return (
    <div>
      {sections?.map((section, index) => (
        <Fragment key={index}>
          {renderSection(section, !(index % 2 === 0))}
        </Fragment>
      ))}
    </div>
  );
}
