import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";
import PricingMatrix from "@/components/pricing/PricingMatrix";
import { PRICING_FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Transparent Web Development & Growth Pricing | Grow Invicta",
  description:
    "Transparent pricing in INR & USD for Next.js, WordPress, Shopify, SEO & video editing. Fast-track 3-7 day live staging & 100% full asset ownership.",
  alternates: {
    canonical: "https://growinvicta.com/pricing",
  },
  keywords: [
    "Web Development Pricing",
    "Transparent Agency Packages",
    "Next.js Development Cost",
    "Elementor WordPress Pricing",
    "Shopify Store Setup Cost",
    "Digital Growth Packages INR USD",
  ],
  openGraph: {
    type: "website",
    siteName: "Grow Invicta",
    title: "Transparent Web Development & Growth Pricing | Grow Invicta",
    description:
      "Transparent pricing in INR & USD for Next.js, WordPress, Shopify, SEO & video editing. Fast-track 3-7 day live staging & 100% full asset ownership.",
    url: "https://growinvicta.com/pricing",
    images: [
      {
        url: "https://growinvicta.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta Transparent Pricing & Sprint Packages",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparent Web Development & Growth Pricing | Grow Invicta",
    description:
      "Transparent pricing in INR & USD for Next.js, WordPress, Shopify, SEO & video editing. Fast-track 3-7 day live staging & 100% full asset ownership.",
    images: ["https://growinvicta.com/images/og-home.jpg"],
  },
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
      name: "Pricing",
      item: "https://growinvicta.com/pricing",
    },
  ],
};

const priceSpecSchema = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  "@id": "https://growinvicta.com/pricing#pricing-structure",
  name: "Grow Invicta Transparent Sprint Packages",
  description:
    "Milestone-driven sprint pricing in INR and USD with 3-7 day live staging, $0 markup hosting infrastructure, and 100% asset handover.",
  priceCurrency: "USD",
  validFrom: "2026-01-01",
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function PricingPage() {
  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)]">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(priceSpecSchema) }}
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
        <section className="mb-20 sm:mb-24 lg:mb-28 gsap-reveal-header">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[var(--border-subtle)] border border-[var(--border)] text-[11px] font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
              <span>SPRINT PACKAGES &amp; CAPABILITIES</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              Fixed-scope pricing. Zero agency lock-in.
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
              Transparent, milestone-based sprint pricing with 100% full source code and root infrastructure handover upon final sign-off.
            </p>
          </div>
        </section>

        {/* Pricing Matrix with Interactive Currency Switcher */}
        <section className="mb-20 sm:mb-24 lg:mb-28">
          <PricingMatrix />
        </section>

        {/* Pricing FAQs Section */}
        <section className="mb-14 sm:mb-16">
          <div className="max-w-3xl mb-10 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              CLARIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Frequently Asked Questions About Pricing
            </h2>
          </div>

          <div className="gsap-reveal-card">
            <CapabilityFaqAccordion faqs={PRICING_FAQS} />
          </div>

          <div className="mt-8 flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
            <span className="text-xs text-[var(--text-muted)] font-mono">
              Have technical or deliverable questions?
            </span>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>View all FAQs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
