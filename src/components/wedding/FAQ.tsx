"use client";

import { useWeddingSection } from "@/hooks/use-wedding-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WeddingLayout } from "./WeddingLayout";
import { FAQSection } from "@/db/wedding-model";

export function FAQ({ isEven }: { isEven: boolean }) {
  const section = useWeddingSection("faq") as FAQSection;
  const { title, subtitle, faqs, style } = section;

  if (!title) return null;

  return (
    <WeddingLayout
      id="faq"
      title={title}
      subtitle={subtitle}
      isEven={isEven}
      sectionStyle={style}
    >
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
