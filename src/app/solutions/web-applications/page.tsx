import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Target } from "lucide-react";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";

export const metadata: Metadata = {
  title: "Custom Web Application & Portal Development | Grow Invicta",
  description:
    "Custom full-stack web applications, SaaS MVPs, and client portals. Secure RBAC authentication, real-time database architecture & 100% code repository handover.",
  alternates: {
    canonical: "https://growinvicta.com/solutions/web-applications",
  },
  keywords: [
    "Custom Web Application Development",
    "SaaS MVP Development Agency",
    "Client Portal Development",
    "Next.js Full-Stack Web Apps",
    "Internal Dashboard Engineering",
    "Full-Stack Web Engineering Bangalore",
  ],
  openGraph: {
    type: "website",
    siteName: "Grow Invicta",
    title: "Custom Web Application & Portal Development | Grow Invicta",
    description:
      "Custom full-stack web applications, SaaS MVPs, and client portals. Secure RBAC authentication, real-time database architecture & 100% code repository handover.",
    url: "https://growinvicta.com/solutions/web-applications",
    images: [
      {
        url: "https://growinvicta.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta Custom Web Applications and Portals",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Web Application & Portal Development | Grow Invicta",
    description:
      "Custom full-stack web applications, SaaS MVPs, and client portals. Secure RBAC authentication, real-time database architecture & 100% code repository handover.",
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
      name: "Custom Web Applications",
      item: "https://growinvicta.com/solutions/web-applications",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://growinvicta.com/solutions/web-applications#service",
  name: "Custom Full-Stack Web Application Development",
  serviceType: "Full-Stack Web Application Development",
  provider: {
    "@type": "ProfessionalService",
    "@id": "https://growinvicta.com/#organization",
    name: "Grow Invicta",
    url: "https://growinvicta.com",
  },
  url: "https://growinvicta.com/solutions/web-applications",
  description:
    "Scalable full-stack web applications, business dashboards, and SaaS portals engineered with secure role-based access control, real-time database architecture, REST/GraphQL APIs, and 100% source repository ownership.",
};

const faqs: FaqItem[] = [
  {
    q: "What type of custom web applications and portals do you build?",
    a: "We build multi-tenant SaaS MVPs, client management portals, internal operational dashboards, booking and scheduling engines, and automated workflow web applications tailored to your specific business logic.",
  },
  {
    q: "Who owns the database and backend cloud infrastructure?",
    a: "You do. Everything is deployed directly to your cloud infrastructure (AWS, Supabase, PostgreSQL, Vercel), ensuring zero third-party lock-in.",
  },
  {
    q: "How are security, authentication, and user permissions handled?",
    a: "We implement enterprise-grade authentication with Role-Based Access Control (RBAC), multi-factor authentication (MFA), secure session management, encrypted environment variables, and strict API route rate-limiting to protect sensitive data.",
  },
  {
    q: "Do we receive 100% ownership of the database, code, and infrastructure?",
    a: "Yes. Upon milestone completion, 100% of the source code repositories, database schemas, cloud infrastructure accounts, and API keys are handed over directly to you. We charge $0 ongoing license fees or vendor markups.",
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
    title: "Custom Full-Stack Architecture",
    description:
      "Modular front-end interfaces coupled with scalable backend API endpoints and optimized database schemas.",
  },
  {
    title: "Role-Based Access Control (RBAC)",
    description:
      "Granular user permission levels (Admin, Member, Viewer, Custom) with secure token-based authentication and session handling.",
  },
  {
    title: "Real-Time Data & API Routing",
    description:
      "Custom REST and GraphQL endpoints, webhook integrations, and real-time state synchronization for instant user interactions.",
  },
  {
    title: "Technical SEO & Public Marketing Shell",
    description:
      "Dynamic meta tags, OpenGraph preview generation, JSON-LD schemas, and sitemap.xml for all public-facing application pages.",
  },
  {
    title: "4 Pre-Loaded Technical Product Articles",
    description:
      "Four in-depth documentation and feature guides published to establish immediate product authority and search visibility.",
  },
  {
    title: "100% Git Repository & Database Handover",
    description:
      "Complete handover of GitHub/GitLab repositories, database migration scripts, environment configurations, and comprehensive written system documentation.",
  },
];

export default function WebApplicationsPage() {
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
              <span>FULL-STACK APPS &amp; SAAS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              Custom Web Applications
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] tracking-tight leading-snug mb-6">
              Full-Stack Portals, SaaS MVPs &amp; Business Dashboards Engineered for Scale &amp; Security
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              We design and engineer bespoke web applications with secure user authentication, role-based access control, real-time database architecture, and frictionless external API webhooks. Deploy directly to your cloud infrastructure with 100% intellectual property ownership from day one.
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
                100% Code &amp; Database Ownership
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                AUTHENTICATION &amp; DB
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                NextAuth + PostgreSQL / Supabase
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
                  Granular RBAC &amp; Authentication
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Enterprise-level user access controls, role inheritance, secure cookies, and API token validation for complete data protection.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Real-Time Database Architecture
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  High-performance relational and NoSQL database schemas with instant state propagation and automated daily backups.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  API &amp; Third-Party Webhook Routing
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Clean endpoints connecting directly to Stripe, payment gateways, CRM engines, messaging APIs, and external enterprise tools.
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
                  100% intellectual property, code repository, and database ownership transferred to your organisation. Zero proprietary runtime locks.
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
                  Tech startups launching SaaS MVPs, professional service firms deploying client portals, and companies streamlining internal workflows with software.
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
