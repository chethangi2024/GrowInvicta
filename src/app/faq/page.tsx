"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChevronDown, Search, HelpCircle, MessageSquare } from "lucide-react";
import { ALL_CATEGORIZED_FAQS } from "@/lib/constants";

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Flatten all FAQs for schema and global search
  const allFlatFaqs = ALL_CATEGORIZED_FAQS.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  // Filtered FAQs based on category and search query
  const filteredGroups = ALL_CATEGORIZED_FAQS.map((group) => {
    if (activeCategory !== "all" && group.category !== activeCategory) {
      return null;
    }
    const matchingItems = group.items.filter((item) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query)
      );
    });

    if (matchingItems.length === 0) return null;

    return {
      category: group.category,
      items: matchingItems,
    };
  }).filter(Boolean) as { category: string; items: { q: string; a: string }[] }[];

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFlatFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://growinvicta.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Frequently Asked Questions",
        item: "https://growinvicta.com/faq",
      },
    ],
  };

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)]">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="mb-14 sm:mb-20 gsap-reveal-header">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[var(--border-subtle)] border border-[var(--border)] text-[11px] font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              <span>CENTRAL KNOWLEDGE BASE &amp; CLARIFICATIONS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              Frequently Asked Questions
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] tracking-tight leading-snug mb-6">
              Comprehensive Answers on Delivery Sprints, Technology Stacks, Pricing &amp; Asset Ownership
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Everything you need to know about partnering with Grow Invicta. Browse answers across our web development architectures, e-commerce builds, AI search protocols, transparent billing, and 100% asset handover.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all questions (e.g. Next.js, Elementor, ownership, pricing, timeline)..."
              className="w-full pl-11 pr-4 py-3.5 bg-[#0a0a0a] border border-[var(--border)] focus:border-gi-magenta text-[var(--text-primary)] placeholder:text-zinc-600 text-xs sm:text-sm font-sans focus:outline-none rounded-[2px] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {/* Category Filters Strip */}
        <div className="mb-12 pb-4 border-b border-[var(--border)] overflow-x-auto flex items-center gap-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-[2px] shrink-0 transition-colors ${
              activeCategory === "all"
                ? "bg-white text-black"
                : "bg-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
            }`}
          >
            All Categories ({allFlatFaqs.length})
          </button>
          {ALL_CATEGORIZED_FAQS.map((cat) => (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActiveCategory(cat.category)}
              className={`px-3.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-[2px] shrink-0 transition-colors ${
                activeCategory === cat.category
                  ? "bg-white text-black"
                  : "bg-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
              }`}
            >
              {cat.category} ({cat.items.length})
            </button>
          ))}
        </div>

        {/* Accordions By Category */}
        <div className="space-y-16 max-w-5xl">
          {filteredGroups.length === 0 ? (
            <div className="p-12 neo-card text-center">
              <HelpCircle className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">No matching questions found</h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6">
                We couldn&apos;t find an FAQ matching &ldquo;{searchQuery}&rdquo;. Feel free to reach out directly.
              </p>
              <Link href="/contact" className="btn-primary inline-flex">
                <span>Ask Us Directly</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <section key={group.category} className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                  <span className="w-2 h-2 rounded-full bg-gi-magenta" />
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                    {group.category}
                  </h2>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    ({group.items.length})
                  </span>
                </div>

                <div className="divide-y divide-[var(--border-subtle)] border-b border-[var(--border-subtle)]">
                  {group.items.map((item, idx) => {
                    const itemKey = `${group.category}-${idx}`;
                    const isOpen = openItems[itemKey] ?? (activeCategory !== "all" && idx === 0);

                    return (
                      <div key={idx} className="py-5">
                        <button
                          type="button"
                          onClick={() => toggleItem(itemKey)}
                          className="w-full flex items-start justify-between text-left gap-4 group focus:outline-none cursor-pointer"
                          aria-expanded={isOpen}
                        >
                          <span className="text-base sm:text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors tracking-tight">
                            {item.q}
                          </span>
                          <div
                            className={`w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-200 ${
                              isOpen
                                ? "rotate-180 bg-white text-black border-white"
                                : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--border-hover)]"
                            }`}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="mt-3 pr-8 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                            <p>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
