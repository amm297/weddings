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
  const { buttonText, accountNumber } = bankAccount;
  const [isVisible, setIsVisible] = useState(false);

  if (buttonText) {
    return (
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {!isVisible ? (
          <Button className="text-white" onClick={() => setIsVisible(true)}>
            {buttonText}
          </Button>
        ) : (
          <p className="mt-2 text-center font-mono tracking-wider text-primary">
            {formatAccountNumber(accountNumber)}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono tracking-wider">
        {formatAccountNumber(accountNumber)}
      </p>
    </div>
  );
};
