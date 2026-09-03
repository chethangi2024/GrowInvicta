import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Target } from "lucide-react";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";

export const metadata: Metadata = {
  title: "AI Search & SEO / GEO Optimization | Grow Invicta",
  description:
    "Generative Engine Optimization (GEO) and technical SEO for Google Search, ChatGPT, Perplexity & AI answer engines. Structured schemas, llms.txt & 100% data ownership.",
  alternates: {
    canonical: "https://growinvicta.com/solutions/ai-search-seo",
  },
  keywords: [
    "Generative Engine Optimization GEO",
    "AI Search Engine Optimization",
    "ChatGPT Citation Optimization",
    "Perplexity AI SEO Agency",
    "Technical SEO Bangalore",
    "JSON-LD Schema Engineering",
  ],
  openGraph: {
    type: "website",
    siteName: "Grow Invicta",
    title: "AI Search & SEO / GEO Optimization | Grow Invicta",
    description:
      "Generative Engine Optimization (GEO) and technical SEO for Google Search, ChatGPT, Perplexity & AI answer engines. Structured schemas, llms.txt & 100% data ownership.",
    url: "https://growinvicta.com/solutions/ai-search-seo",
    images: [
      {
        url: "https://growinvicta.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta AI Search and Generative Engine Optimization",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Search & SEO / GEO Optimization | Grow Invicta",
    description:
      "Generative Engine Optimization (GEO) and technical SEO for Google Search, ChatGPT, Perplexity & AI answer engines. Structured schemas, llms.txt & 100% data ownership.",
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
      name: "AI Search & SEO / GEO",
      item: "https://growinvicta.com/solutions/ai-search-seo",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://growinvicta.com/solutions/ai-search-seo#service",
  name: "Generative Engine Optimization & Technical SEO",
  serviceType: "Search Engine Optimization & AI Citation Readiness",
  provider: {
    "@type": "ProfessionalService",
    "@id": "https://growinvicta.com/#organization",
    name: "Grow Invicta",
    url: "https://growinvicta.com",
  },
  url: "https://growinvicta.com/solutions/ai-search-seo",
  description:
    "Comprehensive Generative Engine Optimization (GEO) and technical SEO engineered to position brands for direct citation across Google Search, ChatGPT, Perplexity, Claude, and AI answer engines.",
};

const faqs: FaqItem[] = [
  {
    q: "What is Generative Engine Optimization (GEO) and how does it differ from traditional SEO?",
    a: "Traditional SEO focuses strictly on keyword placement and backlinks for blue search links. Generative Engine Optimization (GEO) optimizes your site's semantic entity structure, knowledge graph connections, and machine-readable data so AI answer engines (ChatGPT, Perplexity, Gemini, Google AI Overviews) cite and recommend your business directly in synthesized answers.",
  },
  {
    q: "How long does it take for a website to rank on Google and AI search engines?",
    a: "Search engine crawling and initial indexation typically occur within 60 to 90 days of launch. AI answer engines (such as ChatGPT, Perplexity, and Google AI Overviews) ingest structured knowledge graphs and entity data within the same window, while competitive top-tier organic search authority matures over 6 to 12 months.",
  },
  {
    q: "What is an llms.txt manifest and why is it essential?",
    a: "An llms.txt file is a standardized, high-density markdown manifest placed in your website root. It provides AI crawlers with clean, structured summaries of your business, services, pricing, and documentation without forcing the AI to parse heavy HTML and CSS.",
  },
  {
    q: "Do we get full access to all SEO assets, schemas, and accounts?",
    a: "Yes. You maintain 100% direct ownership of your Google Search Console, Bing Webmaster Tools, structured JSON-LD schema files, topic cluster content, and ranking telemetry with zero agency lock-in.",
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
    title: "Generative Engine Optimization (GEO) Architecture",
    description:
      "Entity-level optimization designed to get your brand quoted, cited, and recommended in AI-synthesized answer engines.",
  },
  {
    title: "Machine-Readable llms.txt Manifest",
    description:
      "A high-density markdown directory that guides AI web scrapers and LLMs directly to your core capabilities, pricing, and brand data.",
  },
  {
    title: "Deep JSON-LD Semantic Schema Network",
    description:
      "Rich, interconnected structured data (Organization, ProfessionalService, FAQPage, Service, BreadcrumbList) matching Schema.org standards.",
  },
  {
    title: "Technical Indexation Engine",
    description:
      "Auto-updating XML sitemaps, custom robots.txt crawler routing, canonical URL enforcement, and Core Web Vitals optimization.",
  },
  {
    title: "4 High-Authority Topic Cluster Seed Articles",
    description:
      "Four in-depth, original research and authority guides mapped to primary entity queries to jumpstart indexing and citation momentum.",
  },
  {
    title: "100% Direct Account Ownership & Written SOPs",
    description:
      "Full ownership of Google Search Console, Bing Webmaster Tools, Schema codebases, and step-by-step written search telemetry guides.",
  },
];

export default function AiSearchSeoPage() {
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
              <span>GEO &amp; ORGANIC SEARCH</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              AI Search &amp; SEO / GEO
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] tracking-tight leading-snug mb-6">
              Dual-Engine Search Engineering for Google Search, ChatGPT, Perplexity &amp; Claude
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Future-proof your organic visibility with dual-engine search engineering. We optimize your website not only for traditional Google ranking factors but for the new generative AI search landscape—engineering deep entity schemas, llms.txt manifests, and topic cluster articles that secure citations across OpenAI SearchGPT, Perplexity, and Google AI Overviews.
            </p>
          </div>

          {/* Hero Telemetry */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] bg-[#0a0a0a] divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                DELIVERY SPRINT
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                Sprint Based (By Milestone)
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                FULL HANDOVER
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                100% GSC &amp; Schema Ownership
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                SEARCH PROTOCOLS
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                GEO + JSON-LD Knowledge Graphs
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
                  Generative Engine Optimization (GEO)
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Position your brand for direct citations in ChatGPT, Claude, Perplexity, and Google AI Overviews using structured, factual entity markup.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Semantic Knowledge Graph Schemas
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Deep JSON-LD structured data establishing verified relationships between your organization, services, authors, and local operating jurisdictions.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Realistic 60–90 Day Indexing Roadmap
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Transparent organic milestone pacing based on algorithmic crawl frequencies, zero black-hat risks, and sustainable compounding authority.
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
                  100% direct access and ownership of all Google Search Console profiles, Bing Webmaster tools, Schema files, and performance analytics. Zero vendor lock-in.
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
                  High-growth businesses, medical clinics, B2B technology providers, and eCommerce stores requiring long-term organic authority and generative AI citation.
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
