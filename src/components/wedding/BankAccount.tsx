"use client";

import { BankAccountItem } from "./bankAccount/BankAccountItem";
import { WeddingLayout } from "./WeddingLayout";
import { useWeddingSection } from "@/hooks/use-wedding-section";
import { BankAccountSection, DescriptionItem } from "@/db/wedding-model";
import { cn } from "@/lib/utils";

export function BankAccount({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("bankaccount") as BankAccountSection;

  const { title, description, bankAccount, bankAccounts, style, icon } =
    section;
  const hasBackgroundImage = Boolean(style?.image);

  if (!title || (!bankAccount && !bankAccounts)) return null;

  const renderDescriptionItem = (
    item: string | DescriptionItem,
    index: number
  ) => {
    if (typeof item === "string") {
      return <p key={`ba-desc-${index}`}>{item}</p>;
    }
    return (
      <p key={`ba-desc-${index}`} className={cn(item.itemStyle)}>
        {item.text}
      </p>
    );
  };

  const renderDescription = () => {
    if (typeof description === "string") {
      return (
        <p className="text-center text-foreground/80 mb-12">{description}</p>
      );
    }
    if (Array.isArray(description)) {
      return (
        <div className="flex flex-col text-center text-foreground/80 mb-12 gap-2">
          {description.map((item, index) => renderDescriptionItem(item, index))}
        </div>
      );
    }
  };

  return (
    <WeddingLayout
      id="bankaccount"
      title={title}
      isEven={isEven}
      sectionStyle={style}
      icon={icon}
    >
      <div className="max-w-2xl mx-auto">{renderDescription()}</div>
      {bankAccounts?.map((bankAccount) => (
        <BankAccountItem
          key={bankAccount.accountNumber}
          bankAccount={bankAccount}
        />
      ))}
      {bankAccount && <BankAccountItem bankAccount={bankAccount} />}
    </WeddingLayout>
  );
}
