"use client";

import { useWeddingConfig } from "@/hooks/use-wedding-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WeddingLayout } from "./WeddingLayout";

export function FAQ({ isEven }: { isEven: boolean }) {
  const { faq } = useWeddingConfig();
  const { title, subtitle, faqs } = faq || {};

  if (!title) return null;

  return (
    <WeddingLayout id="faq" title={title} subtitle={subtitle} isEven={isEven}>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs?.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </WeddingLayout>
  );
}
