"use client";

import { useWeddingConfig } from "@/hooks/use-wedding-config";
import { BankAccountItem } from "./bankAccount/BankAccountItem";
import { WeddingLayout } from "./WeddingLayout";

export function BankAccount({ isEven }: { isEven: boolean }) {
  const config = useWeddingConfig();

  const { title, description, bankAccount } = config.bankAccount || {};

  if (!title || !bankAccount) return null;

  return (
    <WeddingLayout id="bankaccount" title={title} isEven={isEven}>
      <div className="max-w-2xl mx-auto">
        {Array.isArray(description) ? (
          <div className="flex flex-col text-center text-foreground/80 mb-12 gap-2">
            {description.map((item, index) => (
              <p key={`ba-desc-${index}`}>{item}</p>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/80 mb-12">{description}</p>
        )}
      </div>
      <BankAccountItem bankAccount={bankAccount} />
    </WeddingLayout>
  );
}
