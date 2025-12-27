"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { BankAccount } from "@/db";
import { formatAccountNumber } from "@/utils/string";

export const BankAccountItem = ({
  bankAccount,
}: {
  bankAccount: BankAccount;
}) => {
  const { buttonText, accountNumber, holderName } = bankAccount;
  const [isVisible, setIsVisible] = useState(false);

  const renderHolderName = () => {
    if (holderName) {
      return <p className="text-foreground/80 text-center">{holderName}</p>;
    }
    return "";
  };

  if (buttonText) {
    return (
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {!isVisible ? (
          <Button className="text-white" onClick={() => setIsVisible(true)}>
            {buttonText}
          </Button>
        ) : (
          <p className="mt-2 text-center font-mono tracking-wider text-primary bg-white/90 p-4 rounded-lg">
            {formatAccountNumber(accountNumber)} {renderHolderName()}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-center md:items-center md:gap-4 mt-4">
      <p className="font-mono tracking-wider text-center text-primary italic">
        {formatAccountNumber(accountNumber)}
      </p>
      {renderHolderName()}
    </div>
  );
};
