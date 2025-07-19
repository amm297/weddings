"use client";

import { BankAccountItem } from "./bankAccount/BankAccountItem";
import { WeddingLayout } from "./WeddingLayout";
import { useWeddingSection } from "@/hooks/use-wedding-section";
import { BankAccountSection } from "@/db/wedding-model";
import { cn } from "@/lib/utils";

export function BankAccount({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("bankaccount") as BankAccountSection;

  const { title, description, bankAccount, style } = section;
  const hasBackgroundImage = Boolean(style?.image);

  if (!title || !bankAccount) return null;

  return (
    <WeddingLayout
      id="bankaccount"
      title={title}
      isEven={isEven}
      sectionStyle={style}
    >
      <div className="max-w-2xl mx-auto">
        {Array.isArray(description) ? (
          <div
            className={cn(
              "flex flex-col text-center mb-12 gap-2",
              hasBackgroundImage ? "text-white/90" : "text-foreground/80"
            )}
          >
            {description.map((item, index) => (
              <p key={`ba-desc-${index}`}>{item}</p>
            ))}
          </div>
        ) : (
          <p
            className={cn(
              "text-center mb-12",
              hasBackgroundImage ? "text-white/90" : "text-foreground/80"
            )}
          >
            {description}
          </p>
        )}
      </div>
      <BankAccountItem bankAccount={bankAccount} />
    </WeddingLayout>
  );
}
