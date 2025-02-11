import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode } from "react";

export function AppAccordion({
  items,
  openFirstItemByDefault,
}: {
  items: { label: string; value: string; contents: ReactNode }[];
  openFirstItemByDefault?: boolean;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={openFirstItemByDefault ? items[0].value : undefined}
      className="w-full space-y-4"
    >
      {items.map((item) => (
        <AccordionItem
          value={item.value}
          key={item.value}
          className="border-none outline-none space-y-2"
        >
          <AccordionTrigger className="border rounded-lg p-3 flex items-center justify-between w-full no-underline hover:no-underline text-xs">
            {item.label}
          </AccordionTrigger>
          <AccordionContent>{item.contents}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
