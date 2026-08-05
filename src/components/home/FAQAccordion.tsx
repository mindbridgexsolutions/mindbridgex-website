"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-[#d2d2d7]/30 overflow-hidden transition-all shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between font-semibold text-[#1d1d1f] hover:text-[#E65100] transition cursor-pointer"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#86868b] transition-transform duration-300 ${
                  isOpen ? "transform rotate-180 text-[#E65100]" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-sm text-[#86868b] leading-relaxed border-t border-[#d2d2d7]/20 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}