import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "SEO & Delivery Disclaimer | Grow Invicta",
  description: "Official Growth & Delivery Disclaimer for Grow Invicta. Details honest 60–90 day SEO expectations and delivery dependencies.",
};

export default function DisclaimerPage() {
  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="mb-14 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
            Transparency Disclosure
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            SEO &amp; Delivery Disclaimer
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-3">
            Last Updated: August 2026 • Grow Invicta (Bengaluru, India)
          </p>
        </div>

        <div className="space-y-10 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">1. No Instant Ranking Guarantees</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Grow Invicta explicitly rejects unethical &ldquo;overnight #1 Google ranking&rdquo; claims. Modern search engines (Google, Bing) and Generative AI engines (ChatGPT Search, Perplexity AI, Claude) operate on complex crawl budgets, semantic authority validation, and user experience signals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">2. The Realistic 60–90 Day Organic Timeframe</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              While all Grow Invicta web builds include rigorous technical SEO architecture, structured JSON-LD Schema markup, and four pre-loaded authority articles, organic indexation and keyword compounding typically unfold over a 60 to 90 day window.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">3. Delivery Dependencies</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Our 3–7 day express staging and Day 10 handover targets reflect active engineering sprints. Timelines are dependent upon timely client submission of required brand assets, domain DNS access, and milestone approvals.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
