import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Target } from "lucide-react";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";

export const metadata: Metadata = {
  title: "Custom Shopify Store Development & E-Commerce SEO | Grow Invicta",
  description:
    "High-converting Shopify storefront development. 1-click checkouts, multi-currency routing, e-commerce schema, 3-7 day live staging & 100% store ownership.",
  alternates: {
    canonical: "https://growinvicta.com/solutions/shopify",
  },
  keywords: [
    "Shopify Store Development Agency",
    "Custom Shopify Theme Setup",
    "High-Converting Shopify Design",
    "Shopify Payment Gateway Integration",
    "E-Commerce AI Search SEO",
    "Shopify Store Launch Bangalore",
  ],
  openGraph: {
    type: "website",
    siteName: "Grow Invicta",
    title: "Custom Shopify Store Development & E-Commerce SEO | Grow Invicta",
    description:
      "High-converting Shopify storefront development. 1-click checkouts, multi-currency routing, e-commerce schema, 3-7 day live staging & 100% store ownership.",
    url: "https://growinvicta.com/solutions/shopify",
    images: [
      {
        url: "https://growinvicta.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta High-Converting Shopify Store Development",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Shopify Store Development & E-Commerce SEO | Grow Invicta",
    description:
      "High-converting Shopify storefront development. 1-click checkouts, multi-currency routing, e-commerce schema, 3-7 day live staging & 100% store ownership.",
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
      name: "Solutions",
      item: "https://growinvicta.com/#solutions",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Shopify E-Commerce Stores",
      item: "https://growinvicta.com/solutions/shopify",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://growinvicta.com/solutions/shopify#service",
  name: "High-Converting Shopify Store Development",
  serviceType: "E-Commerce Development & Generative Engine Optimization",
  url: "https://growinvicta.com/solutions/shopify",
  description:
    "High-converting Shopify storefronts engineered with friction-free 1-click checkout, automated tax and shipping rules, e-commerce product schema, and 100% store ownership handover.",
  provider: {
    "@type": "ProfessionalService",
    "@id": "https://growinvicta.com/#organization",
    name: "Grow Invicta",
    url: "https://growinvicta.com",
  },
};

const faqs: FaqItem[] = [
  {
    q: "Can I manage products, inventory, and discounts myself?",
    a: "Yes. Shopify provides an intuitive dashboard, and we provide step-by-step written documentation covering product management, inventory tracking, order processing, and discount creation.",
  },
  {
    q: "Which payment gateways and shipping configurations are included in our Shopify launch?",
    a: "We configure multi-currency payment routing (Stripe, Razorpay, PayPal, Apple Pay, Google Pay), local and international shipping zones, live courier rate calculations, and automated tax rules tailored to your business jurisdiction.",
  },
  {
    q: "Do we receive complete administrative ownership of our Shopify store?",
    a: "Yes. Upon completing the Day 10 milestone handover, 100% of Primary Account Holder permissions, domain DNS controls, product inventory data, and app configurations are transferred directly to your team with zero vendor lock-in.",
  },
  {
    q: "How are product schemas and e-commerce SEO handled?",
    a: "We implement structured Product, Offer, and Breadcrumb JSON-LD schemas, optimize product image alt tags, establish search-friendly collection URLs, and load 4 keyword-optimized authority articles into your Shopify blog to drive organic discovery.",
  },
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const deliverables = [
  {
    title: "Custom Shopify Theme Architecture",
    description:
      "Fast-loading, mobile-optimized storefront styling with cohesive typography, brand colors, and accessible product navigation.",
  },
  {
    title: "High-Conversion Cart & 1-Click Checkout",
    description:
      "Streamlined slide-out cart drawers, dynamic buy buttons (Apple Pay, Google Pay, UPI), upsell triggers, and abandoned cart recovery sequences.",
  },
  {
    title: "Payment Gateways, Shipping & Tax Rules",
    description:
      "Full integration of payment gateways, automated multi-zone shipping rate tables, and compliant regional tax calculations.",
  },
  {
    title: "E-Commerce Product Schema & AI Search Readiness",
    description:
      "Rich structured JSON-LD Product, Offer, AggregateRating, and BreadcrumbList schemas to secure Google Shopping snippets and AI engine citations.",
  },
  {
    title: "4 Pre-Loaded E-Commerce Authority Articles",
    description:
      "Keyword-targeted editorial guides loaded directly into your Shopify blog to establish domain authority and organic search momentum.",
  },
  {
    title: "100% Primary Owner Handover & Written SOPs",
    description:
      "Full transfer of Primary Account Holder credentials, DNS keys, billing controls, and written Shopify store administration guides.",
  },
];

export default function ShopifyPage() {
  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)]">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Link
            href="/#solutions"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Solutions</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="mb-20 sm:mb-24 lg:mb-28 gsap-reveal-header">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[var(--border-subtle)] border border-[var(--border)] text-[11px] font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gi-magenta" />
              <span>SHOPIFY PARTNER</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              Shopify E-Commerce Stores
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] tracking-tight leading-snug mb-6">
              High-Converting E-Commerce Storefronts Engineered for Revenue, Speed &amp; Search Visibility
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              We design and engineer bespoke Shopify storefronts built to scale. From friction-free one-page checkout experiences and conversion-optimized mobile architectures to multi-currency gateways and generative search schema, we build online stores where every detail drives transactions.
            </p>
          </div>

          {/* Hero Telemetry */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] bg-[#0a0a0a] divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                EXPRESS SPRINT
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                3–7 Days Target Staging
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                FULL HANDOVER
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                100% Primary Store Ownership on Day 10
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                ECOMMERCE CONVERSION
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                Slide Cart &amp; Express Checkout
              </div>
            </div>
          </div>
        </section>

        {/* Itemized Deliverables */}
        <section className="mb-20 sm:mb-24 lg:mb-28">
          <div className="max-w-3xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              ITEMIZED DELIVERABLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Itemized Sprint Deliverables
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Everything delivered in this capability package. No hidden add-ons, no recurring agency retainers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gsap-stagger-container">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="neo-card-interactive p-7 flex flex-col justify-between group gsap-stagger-item"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architectural Highlights */}
        <section className="mb-20 sm:mb-24 lg:mb-28">
          <div className="max-w-3xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              ENGINEERING STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Architectural Highlights
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 gsap-reveal-card">
            {/* Card 1 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Conversion-Engineered Checkout
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Fast slide-out cart drawers, dynamic express checkout buttons, and customized promotional callouts designed to minimize cart abandonment.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Global Multi-Currency &amp; Local Tax
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Automated currency conversion and location-specific shipping and tax rates configured to capture international customers seamlessly.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  E-Commerce Schema &amp; GEO AI Readiness
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Structured JSON-LD Product and Offer markup ensuring your inventory displays with star ratings, pricing, and availability across search engines.
                </p>
              </div>
            </div>
          </div>

          {/* 2 Lower Highlight Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 gsap-reveal-card">
            {/* Card 4 */}
            <div className="lg:col-span-6 neo-card-interactive p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--border-subtle)] border border-[var(--border)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-6">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>OWNERSHIP GUARANTEE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Unrestricted Client Property
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  100% primary store ownership transferred directly to you. Pay Shopify subscription directly with zero agency markup or recurring developer lock-in.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="lg:col-span-6 neo-card-interactive p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--border-subtle)] border border-[var(--border)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-6">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span>IDEAL SCOPE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Target Projects
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Direct-to-consumer (DTC) brands, high-growth retail startups, physical clinics selling wellness products, and consumer product innovators.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capability FAQs */}
        <section className="mb-14 sm:mb-16">
          <div className="max-w-3xl mb-10 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              CLARIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Capability FAQs
            </h2>
          </div>

          <div className="gsap-reveal-card">
            <CapabilityFaqAccordion faqs={faqs} />
          </div>

          <div className="mt-8 flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
            <span className="text-xs text-[var(--text-muted)] font-mono">
              Looking for answers on other services or pricing?
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
