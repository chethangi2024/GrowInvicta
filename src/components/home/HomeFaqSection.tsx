"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { HOME_FAQS } from "@/lib/constants";

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="spatial-section py-24 sm:py-32 bg-[#080808] border-t border-[var(--border)]" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Everything you need to know about our sprint model.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Straightforward answers about our 3–7 day staging cycle, complete asset ownership handover, and $0 markup infrastructure policies.
          </p>
        </div>

        <div className="max-w-4xl divide-y divide-[var(--border)] border-t border-b border-[var(--border)] gsap-stagger-container">
          {HOME_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-6 gsap-stagger-item">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left group gap-4 py-2 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors tracking-tight">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-white text-black border-white" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-12 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Subtle View All FAQs Link */}
        <div className="mt-10 max-w-4xl flex items-center justify-between pt-4">
          <span className="text-xs text-[var(--text-muted)] font-mono">
            Have a question not listed here?
          </span>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>View all FAQs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
