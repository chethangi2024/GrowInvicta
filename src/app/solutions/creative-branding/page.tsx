import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Target } from "lucide-react";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";

export const metadata: Metadata = {
  title: "Brand Identity, Canva Templates & Print Collateral | Grow Invicta",
  description:
    "Cohesive visual identity systems, corporate brochures, promotional flyers & 100% editable Canva master links with print-ready CMYK 300 DPI exports.",
  alternates: {
    canonical: "https://growinvicta.com/solutions/creative-branding",
  },
  keywords: [
    "Canva Brand Identity Design",
    "Corporate Brochure Design Service",
    "Print Ready Flyer Design Agency",
    "Editable Canva Templates for Business",
    "Brand Style Guide Development",
    "Visual Identity Agency Bangalore",
  ],
  openGraph: {
    type: "website",
    siteName: "Grow Invicta",
    title: "Brand Identity, Canva Templates & Print Collateral | Grow Invicta",
    description:
      "Cohesive visual identity systems, corporate brochures, promotional flyers & 100% editable Canva master links with print-ready CMYK 300 DPI exports.",
    url: "https://growinvicta.com/solutions/creative-branding",
    images: [
      {
        url: "https://growinvicta.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta Brand Identity, Canva Templates and Collateral",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Identity, Canva Templates & Print Collateral | Grow Invicta",
    description:
      "Cohesive visual identity systems, corporate brochures, promotional flyers & 100% editable Canva master links with print-ready CMYK 300 DPI exports.",
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
      name: "Creative & Branding",
      item: "https://growinvicta.com/solutions/creative-branding",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://growinvicta.com/solutions/creative-branding#service",
  name: "Visual Identity & Print Collateral Design",
  serviceType: "Brand Identity Design & Print Collateral",
  provider: {
    "@type": "ProfessionalService",
    "@id": "https://growinvicta.com/#organization",
    name: "Grow Invicta",
    url: "https://growinvicta.com",
  },
  url: "https://growinvicta.com/solutions/creative-branding",
  description:
    "Cohesive brand identity systems, custom corporate brochures, promotional flyers, and 100% editable Canva master links with print-ready CMYK 300 DPI exports.",
};

const faqs: FaqItem[] = [
  {
    q: "Why do you deliver Canva links instead of only Illustrator files?",
    a: "Canva links empower your internal team to make quick text, price, or date adjustments in seconds without requiring specialized graphic software or agency fees.",
  },
  {
    q: "What design assets and file formats do we receive?",
    a: "You receive 100% editable Canva team master links, print-ready CMYK 300 DPI PDF files with crop marks/bleed, web-optimized PNG/SVG vectors, and complete typography/color guidelines.",
  },
  {
    q: "Can our internal team easily edit the brochures and flyers after delivery?",
    a: "Yes. Because every design is delivered directly via 100% editable Canva master links, your team can update prices, phone numbers, physician bios, or promotional text in seconds without hiring a designer.",
  },
  {
    q: "Do we get full intellectual property and ownership rights?",
    a: "Yes. You retain 100% unrestricted intellectual property ownership of all custom logos, brand guidelines, brochure templates, flyer layouts, and export assets with zero ongoing royalty fees.",
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
    title: "Comprehensive Visual Identity Guide",
    description:
      "Primary and secondary logo suites, typography pairings, color palette hex codes, and usage rules.",
  },
  {
    title: "Custom Canva Corporate Brochure Design",
    description:
      "Multi-page, bi-fold, or tri-fold brochure layouts tailored for clinic services, corporate capabilities, and product overviews.",
  },
  {
    title: "High-Impact Promotional Flyer Templates",
    description:
      "Event flyers, promotional discount banners, and physical hand-out designs optimized for print and social distribution.",
  },
  {
    title: "100% Editable Canva Master Link Handover",
    description:
      "Direct Canva team template links transferred so non-designers can update copy, dates, and images in real time.",
  },
  {
    title: "Print-Ready 300 DPI CMYK Exports",
    description:
      "Industry-standard high-resolution PDF print exports with crop marks and bleed margins ready for commercial printing.",
  },
  {
    title: "4 Brand Strategy Editorial Articles",
    description:
      "In-depth brand positioning and design system articles loaded onto your digital platform to establish aesthetic authority.",
  },
];

export default function CreativeBrandingPage() {
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
              <span>VISUAL IDENTITY &amp; CANVA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              Creative &amp; Branding
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] tracking-tight leading-snug mb-6">
              Brand Identity Systems, Corporate Brochures, Flyers &amp; 100% Editable Canva Master Links
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Establish a cohesive visual brand that commands respect across every touchpoint. We craft full brand identity kits, corporate brochures, clinic service guides, and social collateral—delivered with 100% editable Canva master links and 300 DPI CMYK print-ready files.
            </p>
          </div>

          {/* Hero Telemetry */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] bg-[#0a0a0a] divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                DELIVERY SPRINT
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                3–7 Days Express Handover
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                FULL HANDOVER
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                100% Vector &amp; Canva Links
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                PRINT STANDARDS
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                300 DPI CMYK + Bleed Marks
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
                  100% Editable Canva Master Links
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Never wait on an agency for a phone number or price change. Live master links allow non-designers to make updates in seconds.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Commercial Print Standards
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Exported in 300 DPI CMYK with exact bleed margins and crop marks, ensuring commercial print shops reproduce vibrant, crisp collateral.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Complete Brand Asset Systems
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Cohesive typography rules, color formulas, and logo formats (SVG, PNG, EPS) structured for unified digital and physical presentation.
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
                  100% intellectual property and vector source file handover. You own all copyrights to your logo, layouts, and Canva templates.
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
                  Medical clinics, corporate enterprises, consulting firms, and growing retail brands requiring print brochures, sales sheets, and cohesive branding.
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
