"use client";

import { Hero } from "@/components/wedding/Hero";
import { CountdownTimer } from "@/components/wedding/CountdownTimer";
import { FAQ } from "@/components/wedding/FAQ";
import { Hotel } from "@/components/wedding/Hotel";
import { BankAccount } from "@/components/wedding/BankAccount";
import { Timeline } from "@/components/wedding/Timeline";
import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { Fragment } from "react";
import RSVPForm from "../rsvp/form";
import { WeddingLayout } from "./WeddingLayout";

export function WeddingDisplay() {
  const config = useWeddingConfig();
  const { sections, rsvpForm } = config;

  console.log(config);
  const renderSection = (section: string, isEven: boolean) => {
    switch (section?.toLowerCase()) {
      case "hero":
        return <Hero />;
      case "countdown":
        return <CountdownTimer isEven={isEven} />;
      case "faq":
        return <FAQ isEven={isEven} />;
      case "hotel":
        return <Hotel isEven={isEven} />;
      case "bankaccount":
        return <BankAccount isEven={isEven} />;
      case "timeline":
        return <Timeline isEven={isEven} />;
      case "rsvp":
        return (
          <WeddingLayout
            id="rsvp"
            title="Confírmanos tu asistencia"
            isEven={isEven}
          >
            {rsvpForm ? (
              <iframe
                src={rsvpForm}
                width="100%"
                height="700px"
                className="font-hoves"
              >
                Cargando...
              </iframe>
            ) : (
              <RSVPForm />
            )}
          </WeddingLayout>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {sections?.map((section, index) => (
        <Fragment key={index}>
          {renderSection(section, index % 2 === 0)}
        </Fragment>
      ))}
    </div>
  );
}
