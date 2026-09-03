import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Target } from "lucide-react";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";

export const metadata: Metadata = {
  title: "Business Growth & Organic Social Media Management | Grow Invicta",
  description:
    "Strategic organic social management, content calendars, and lead generation funnels. Turn followers into high-intent inbound clients with zero ad spend reliance.",
  alternates: {
    canonical: "https://growinvicta.com/solutions/business-growth",
  },
  keywords: [
    "Organic Social Media Management",
    "B2B Lead Generation Funnels",
    "LinkedIn Brand Authority Agency",
    "Instagram Growth for Clinics",
    "Digital Marketing Bangalore",
    "Organic Inbound Funnel Strategy",
  ],
  openGraph: {
    type: "website",
    siteName: "Grow Invicta",
    title: "Business Growth & Organic Social Media Management | Grow Invicta",
    description:
      "Strategic organic social management, content calendars, and lead generation funnels. Turn followers into high-intent inbound clients with zero ad spend reliance.",
    url: "https://growinvicta.com/solutions/business-growth",
    images: [
      {
        url: "https://growinvicta.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta Business Growth and Social Management",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Growth & Organic Social Media Management | Grow Invicta",
    description:
      "Strategic organic social management, content calendars, and lead generation funnels. Turn followers into high-intent inbound clients with zero ad spend reliance.",
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
      name: "Business Growth & Social Management",
      item: "https://growinvicta.com/solutions/business-growth",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://growinvicta.com/solutions/business-growth#service",
  name: "Business Growth & Social Management",
  serviceType: "Inbound Marketing & Growth Strategy",
  provider: {
    "@type": "ProfessionalService",
    "@id": "https://growinvicta.com/#organization",
    name: "Grow Invicta",
    url: "https://growinvicta.com",
  },
  url: "https://growinvicta.com/solutions/business-growth",
  description:
    "Strategic organic social media management, editorial content calendars, high-converting lead funnels, and bi-weekly performance telemetry designed for sustainable business scaling.",
};

const faqs: FaqItem[] = [
  {
    q: "Do you run paid ad campaigns or focus on organic growth?",
    a: "We specialize in organic authority, high-converting copy, and sustainable inbound funnels that compound over time without requiring continuous ad spend.",
  },
  {
    q: "What platforms and channels are managed under this service?",
    a: "We build and manage targeted growth systems across LinkedIn, Instagram, YouTube Shorts, X (Twitter), and Facebook, depending on where your target audience and decision-makers actively consume content.",
  },
  {
    q: "Do we receive 100% ownership of content calendars, copy, and creative assets?",
    a: "Yes. All editorial calendars, written copy frameworks, graphic assets, and campaign reports are 100% client property. You retain complete direct ownership of all accounts and published materials with zero agency lock-in.",
  },
  {
    q: "How is performance tracked and reported?",
    a: "We provide bi-weekly performance telemetry tracking key business outcomes: qualified inbound leads, profile conversion rates, high-intent inquiries, engagement depth, and referral traffic to your digital platforms.",
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
    title: "Comprehensive Brand Positioning & Funnel Mapping",
    description:
      "In-depth audience profiling, competitor positioning teardowns, and multi-touchpoint customer journey mapping.",
  },
  {
    title: "Monthly Editorial Content Calendars",
    description:
      "Structured content schedules detailing post topics, hooks, storytelling angles, and conversion call-to-actions.",
  },
  {
    title: "High-Converting Copywriting & Creative Assets",
    description:
      "Platform-tailored captions, carousel copy, thought leadership articles, and high-retention graphic layouts.",
  },
  {
    title: "Multi-Channel Lead Capture Architecture",
    description:
      "Seamless integration of profile links, automated DM funnels, calendar booking triggers, and dedicated landing pages.",
  },
  {
    title: "4 SEO Editorial Authority Articles",
    description:
      "Long-form thought leadership articles loaded directly onto your website to bridge social audience interest with search authority.",
  },
  {
    title: "100% Asset Handover & Bi-Weekly Growth Telemetry",
    description:
      "Full ownership of all written frameworks, Figma/Canva design assets, and bi-weekly data reports detailing inbound lead volume.",
  },
];

export default function BusinessGrowthPage() {
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
              <span>ORGANIC GROWTH &amp; FUNNELS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              Business Growth &amp; Social Management
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] tracking-tight leading-snug mb-6">
              Organic Authority, Content Systems &amp; High-Converting Inbound Lead Funnels
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Transform your digital footprint into an automated client acquisition engine. We combine high-authority LinkedIn and Instagram content strategy, cohesive visual identity templates, and friction-free booking funnels to establish category leadership and drive qualified inbound pipeline.
            </p>
          </div>

          {/* Hero Telemetry */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] bg-[#0a0a0a] divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                GROWTH CADENCE
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                Weekly Editorial Content Sprints
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                FULL HANDOVER
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                100% Post Copy &amp; Design Ownership
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                FUNNEL CONVERSION
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                Direct Calendar &amp; Intake Routing
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
                  Strategic Topic Authority Clusters
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Engineered content series that answer core customer pain points, dismantling objections and positioning your offering as the obvious choice.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Friction-Free Inbound Funnels
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Clean profile links, booking page integrations, and direct message routing that convert social attention into scheduled discovery calls.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Transparent Performance Telemetry
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Bi-weekly reporting focused on genuine business metrics—inbound pipeline, qualified inquiries, and audience quality—rather than vanity likes.
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
                  100% ownership of all published posts, calendar documents, graphics, and performance data. Zero proprietary agency asset withholding.
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
                  Founders, B2B agencies, healthcare practices, and executive leadership teams seeking consistent, high-value organic pipeline without ad burn.
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
