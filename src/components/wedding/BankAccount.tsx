"use client";

import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { BankAccountItem } from "./bankAccount/BankAccountItem";

export function BankAccount() {
  const config = useWeddingConfig();
  const { title, subtitle, bankAccount } = config.bankAccount || {};

  if (!title || !bankAccount) return null;

  return (
    <section
      id="bank-account"
      className="py-12 md:py-20 bg-background scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-sectionHeadline text-center mb-8 md:mb-12 text-foreground">
          {title}
        </h2>
        <p className="text-center text-foreground/80 mb-12">{subtitle}</p>

        <div className="max-w-5xl mx-auto">
          <BankAccountItem bankAccount={bankAccount} />
        </div>
      </div>
    </section>
  );
}
