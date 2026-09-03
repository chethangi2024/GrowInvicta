import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Target } from "lucide-react";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";

export const metadata: Metadata = {
  title: "Elementor WordPress CMS Development & SEO | Grow Invicta",
  description:
    "Custom Elementor WordPress website development. Intuitive drag-and-drop editing, security hardening, 3-7 day live staging & 100% Super Admin ownership.",
  alternates: {
    canonical: "https://growinvicta.com/solutions/wordpress",
  },
  keywords: [
    "Elementor WordPress Development",
    "Custom WordPress CMS Development",
    "WordPress Web Design Agency",
    "Elementor Pro Web Design",
    "AI Search WordPress SEO",
    "Secure WordPress Development",
  ],
  openGraph: {
    type: "website",
    siteName: "Grow Invicta",
    title: "Elementor WordPress CMS Development & SEO | Grow Invicta",
    description:
      "Custom Elementor WordPress website development. Intuitive drag-and-drop editing, security hardening, 3-7 day live staging & 100% Super Admin ownership.",
    url: "https://growinvicta.com/solutions/wordpress",
    images: [
      {
        url: "https://growinvicta.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta Custom Elementor WordPress CMS Development",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elementor WordPress CMS Development & SEO | Grow Invicta",
    description:
      "Custom Elementor WordPress website development. Intuitive drag-and-drop editing, security hardening, 3-7 day live staging & 100% Super Admin ownership.",
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
      name: "WordPress CMS Websites",
      item: "https://growinvicta.com/solutions/wordpress",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://growinvicta.com/solutions/wordpress#service",
  name: "Custom Elementor WordPress CMS Development",
  serviceType: "WordPress CMS Design & Development",
  url: "https://growinvicta.com/solutions/wordpress",
  description:
    "Bespoke WordPress CMS development built strictly with the Elementor visual drag-and-drop builder. Fast page speeds, robust security hardening, automated technical SEO, and 100% Super Admin ownership.",
  provider: {
    "@type": "ProfessionalService",
    "@id": "https://growinvicta.com/#organization",
    name: "Grow Invicta",
    url: "https://growinvicta.com",
  },
};

const faqs: FaqItem[] = [
  {
    q: "What visual builder is used for our WordPress website?",
    a: "All our WordPress websites are built strictly with the Elementor visual drag-and-drop builder. This allows your team to edit text, swap images, create landing pages, and publish blog posts visually without writing any code or dealing with complex block editors.",
  },
  {
    q: "Do you use pre-made ThemeForest templates?",
    a: "Never. We build bespoke custom layouts directly in Elementor tailored to your brand identity, guaranteeing a unique, high-end presentation.",
  },
  {
    q: "How do you protect WordPress sites from security vulnerabilities and bloat?",
    a: "We enforce strict security hardening protocols: disabling XML-RPC, enforcing 2FA, securing login endpoints, configuring Web Application Firewalls (WAF), and using clean, lightweight custom code modules instead of installing dozens of bloated third-party plugins.",
  },
  {
    q: "Will I need to pay Grow Invicta for routine text edits?",
    a: "No! We provide comprehensive written administration guides so your team can manage 100% of day-to-day edits autonomously.",
  },
  {
    q: "Do we get full ownership of our WordPress website?",
    a: "Yes. Upon Day 10 milestone handover, you receive 100% Super Admin credentials, full database access, server access, and master credentials with zero ongoing vendor lock-in.",
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
    title: "Custom Elementor Visual System",
    description:
      "Bespoke drag-and-drop page templates, reusable header/footer global styles, and fluid typography tailored to your brand.",
  },
  {
    title: "Enterprise Security Hardening",
    description:
      "Comprehensive protection including login endpoint relocation, brute-force mitigation, automated SSL/TLS encryption, and database prefix obfuscation.",
  },
  {
    title: "Advanced Speed & Cache Optimization",
    description:
      "Redis object caching, asset minification, critical CSS generation, and WebP image optimization for fast load times and Core Web Vitals compliance.",
  },
  {
    title: "AI Search & Technical SEO Integration",
    description:
      "Generative Engine Optimization (GEO), automated XML sitemaps, rich JSON-LD Schema markup, and OpenGraph social cards.",
  },
  {
    title: "4 Pre-Loaded Topic Cluster Articles",
    description:
      "Four keyword-optimized, high-authority articles loaded into your WordPress blog to seed search indexing and authority from day one.",
  },
  {
    title: "100% Super Admin Handover & Written SOPs",
    description:
      "Full transfer of admin credentials, database files, hosting control, and step-by-step written Elementor editing manuals (zero video tutorials).",
  },
];

export default function WordPressPage() {
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
              <span>WORDPRESS &amp; ELEMENTOR</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              WordPress CMS Websites
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] tracking-tight leading-snug mb-6">
              Custom-Designed WordPress Experiences Powered Strictly by Elementor for Total Editorial Independence
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Eliminate developer dependency forever. We build custom-designed, performance-hardened WordPress websites built exclusively on Elementor visual builder. You get a bespoke, brand-aligned design with full Super Admin credentials and written SOPs to update copy, media, blogs, and landing pages effortlessly.
            </p>
          </div>

          {/* Hero Telemetry */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] bg-[#0a0a0a] divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                DELIVERY SPRINT
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                3–7 Days Live Staging
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                FULL HANDOVER
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                100% Super Admin Ownership on Day 10
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                VISUAL BUILDER
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                100% Elementor Drag &amp; Drop
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
                  Elementor Drag-and-Drop Independence
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Non-technical team members can edit headings, adjust layouts, replace images, and publish new pages in minutes without hiring developers.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Hardened Security &amp; Anti-Malware Protocols
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Zero vulnerability exposure with automated firewalls, restricted admin entry points, and eliminated unnecessary plugin bloat.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  AI Search (GEO) &amp; Schema Authority
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Structured data and semantic entity tagging configured to ensure citation readiness across Google Search, ChatGPT, and Perplexity.
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
                  100% ownership of your WordPress database, themes, media library, and website files. Hosting is separate and set up on your own direct account.
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
                  Growing B2B companies, clinics, professional service practices, and corporate brands needing frequent marketing updates with zero technical friction.
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
