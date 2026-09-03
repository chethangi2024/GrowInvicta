"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

export interface FaqItem {
  q: string;
  a: string;
}

interface CapabilityFaqAccordionProps {
  faqs: FaqItem[];
}

export default function CapabilityFaqAccordion({ faqs }: CapabilityFaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <div className="space-y-3 max-w-4xl">
      {faqs.map((faq, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <BorderGlow
            key={idx}
            borderRadius={2}
            glowRadius={25}
            glowIntensity={isOpen ? 1.2 : 0.9}
            colors={["#7C3AED", "#FF6A00"]}
            backgroundColor={isOpen ? "#151820" : "#111318"}
          >
            <button
              type="button"
              onClick={() => toggleIndex(idx)}
              aria-expanded={isOpen}
              className="w-full py-5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--border)]"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="font-mono text-xs text-[var(--text-muted)] mt-0.5 shrink-0">
                  0{idx + 1}
                </span>
                <span className="text-sm sm:text-base font-semibold text-[var(--text-primary)] tracking-tight">
                  {faq.q}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[var(--text-secondary)] shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[var(--text-primary)]" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-6 sm:px-8 pb-6 pt-1 border-t border-[var(--border-subtle)]">
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pl-7 sm:pl-8">
                  {faq.a}
                </p>
              </div>
            )}
          </BorderGlow>
        );
      })}
    </div>
  );
}
