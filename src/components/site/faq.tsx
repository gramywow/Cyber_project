"use client";

import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/motion-primitives/accordion";
import { faq } from "@/content/site";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-titre"
      className="mx-auto grid max-w-[84rem] scroll-mt-16 gap-x-10 gap-y-8 px-4 pb-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:pb-28"
    >
      <h2 id="faq-titre" className="display text-[clamp(2.25rem,5.2vw,3.75rem)] lg:col-span-5">
        {faq.heading}
      </h2>
      <Accordion
        className="border-t-[1.5px] border-rule-strong lg:col-span-7"
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {faq.items.map((item) => (
          <AccordionItem key={item.q} value={item.q} className="border-b border-rule">
            <AccordionTrigger className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-xl font-semibold leading-7 transition-colors duration-200 hover:text-minium-deep">
              {item.q}
              <Plus
                className="size-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[expanded]:rotate-45"
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </AccordionTrigger>
            <AccordionContent>
              <p className="max-w-[38rem] pb-6 text-ink-soft">{item.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
