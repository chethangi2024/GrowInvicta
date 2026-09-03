import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Clock } from "lucide-react";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";

export const metadata: Metadata = {
  title: "Custom & Animated Web Development | AI Search SEO | Grow Invicta",
  description:
    "Bespoke Next.js & interactive animated websites engineered for AI search & Google. Sub-second speed, custom motion timelines & 100% code ownership on Day 10.",
  alternates: {
    canonical: "https://growinvicta.com/solutions/custom-coded",
  },
  keywords: [
    "Custom Web Development Services",
    "Interactive Animated Websites",
    "Next.js Motion Development",
    "Generative Engine Optimization GEO",
    "AI Search Optimization",
    "Core Web Vitals Web Design",
  ],
  openGraph: {
    type: "website",
    siteName: "Grow Invicta",
    title: "Custom & Animated Web Development | AI Search SEO | Grow Invicta",
    description:
      "Bespoke Next.js & interactive animated websites engineered for AI search & Google. Sub-second speed, custom motion timelines & 100% code ownership on Day 10.",
    url: "https://growinvicta.com/solutions/custom-coded",
    images: [
      {
        url: "https://growinvicta.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta Custom Coded & Interactive Animated Websites",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom & Animated Web Development | AI Search SEO | Grow Invicta",
    description:
      "Bespoke Next.js & interactive animated websites engineered for AI search & Google. Sub-second speed, custom motion timelines & 100% code ownership on Day 10.",
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
      name: "Custom Coded & Interactive Animated Websites",
      item: "https://growinvicta.com/solutions/custom-coded",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom & Interactive Animated Website Development",
  serviceType: "Next.js Custom Development & Generative Engine Optimization",
  url: "https://growinvicta.com/solutions/custom-coded",
  description:
    "Bespoke Next.js & interactive animated websites engineered for AI search & Google. Sub-second speed, custom motion timelines & 100% code ownership on Day 10.",
  provider: {
    "@type": "ProfessionalService",
    "@id": "https://growinvicta.com/#organization",
    name: "Grow Invicta",
    url: "https://growinvicta.com",
  },
};

const faqs: FaqItem[] = [
  {
    q: "What tech stack do you use for custom coded builds?",
    a: "We leverage Next.js (App Router), React, TypeScript, Tailwind CSS / Vanilla CSS design tokens, and deploy on modern cloud platforms like Vercel or AWS.",
  },
  {
    q: "Do you build interactive animated websites, and how do delivery timelines vary?",
    a: "Yes. We build high-performance interactive animated websites utilizing GSAP, ScrollTrigger, and custom 60FPS motion systems. Standard custom web architectures deploy to staging in 3–7 business days, while complex interactive storytelling and bespoke animated web platforms deliver within 7–15 business days depending on motion complexity.",
  },
  {
    q: "How do we make content updates without a traditional CMS?",
    a: "We implement structured MDX or headless CMS integration along with comprehensive, step-by-step written documentation and standard operating procedures (SOPs). This allows your internal team to effortlessly update text, publish blog articles, and add media without writing code or incurring agency fees.",
  },
  {
    q: "Do we receive 100% source code ownership on Day 10?",
    a: "Yes. On milestone completion and Day 10 handover, we perform a 100% transfer of the GitHub/GitLab repository, production deployment, and all master design assets with zero vendor lock-in.",
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
    title: "Next.js App Router Core",
    description:
      "Clean, modular React component tree with sub-second page transitions, responsive layouts, and zero layout shifts.",
  },
  {
    title: "Interactive Motion & Animation Systems",
    description:
      "Custom kinetic physics, smooth scroll-triggered storytelling, micro-interactions, and 60FPS hardware-accelerated animations tailored to your brand identity.",
  },
  {
    title: "Generative Engine Optimization (GEO)",
    description:
      "Deep semantic entity structure, llms.txt AI manifest, and automated schema that feeds Google AI Overviews, Perplexity, and ChatGPT.",
  },
  {
    title: "Built-In Technical SEO Foundation",
    description:
      "Auto-generating dynamic XML sitemaps, robots.txt directives, self-referencing canonical URLs, and OpenGraph social cards.",
  },
  {
    title: "4 Pre-Loaded Topic Cluster Articles",
    description:
      "High-authority, keyword-optimized SEO articles to establish initial search authority and indexation signals.",
  },
  {
    title: "100% Full Git Repository Transfer & Written SOPs",
    description:
      "Complete GitHub repository transfer, cloud host deployment configuration, and step-by-step written administration manuals.",
  },
];

export default function CustomCodedPage() {
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
              <span>NEXT.JS / REACT &amp; MOTION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              Custom Coded &amp; Interactive Animated Websites
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] tracking-tight leading-snug mb-6">
              High-Performance Next.js Experiences Engineered for AI Search, Smooth Motion &amp; Google Visibility
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Engineered from the ground up on Next.js App Router architecture. We build zero-bloat, ultra-fast web experiences and bespoke interactive animated interfaces with fluid motion physics, scalable component structures, and predictive semantic markup that converts visitors and dominates Generative Search algorithms (GEO).
            </p>
          </div>

          {/* Hero Telemetry */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] bg-[#0a0a0a] divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                DELIVERY SPRINT
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                3–7 Days (Standard) | 7–15 Days (Animated)
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                FULL HANDOVER
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                100% Handover on Milestone Completion
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                DEVELOPER ENGAGEMENT
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                Direct Principal Execution (Zero Middlemen)
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="mb-20 sm:mb-24 lg:mb-28">
          <div className="max-w-3xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              SCOPE SPECIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Deliverables &amp; Core Standards
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Everything delivered in this capability package. No hidden add-ons, no recurring code-lock retainers.
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
                  Sub-Second Load Times &amp; Core Web Vitals
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Built with zero-heavy CMS bloat, static optimization, and server-side rendering for instant page transitions that pass Core Web Vitals automatically.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Bespoke Motion, 3D &amp; Kinetic Animation
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Fluid interactive web experiences built with physics-based transitions, cursor-reactive elements, and high-performance visual motion without compromising speed.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  AI Search (GEO) &amp; Semantic Schemas
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Native JSON-LD structured schemas, entity knowledge graph mapping, and machine-readable data structures engineered for modern AI search citation.
                </p>
              </div>
            </div>
          </div>

          {/* 2 Lower Highlight Cards with Stronger Emphasis */}
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
                  You own 100% of the source code, repository, assets, animations, and hosting accounts with zero proprietary lock-in or ongoing maintenance mandates.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="lg:col-span-6 neo-card-interactive p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--border-subtle)] border border-[var(--border)] text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-6">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>TIMELINE BY SCOPE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Target Projects &amp; Timelines
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Standard business web architectures deploy to staging in 3–7 business days; rich animated storytelling and interactive web platforms deliver within 7–15 business days based on motion complexity.
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
