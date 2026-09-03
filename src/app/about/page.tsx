import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ShieldCheck, MapPin } from "lucide-react";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";
import PrincipalProfileImage from "@/components/about/PrincipalProfileImage";
import BorderGlow from "@/components/ui/BorderGlow";

export const metadata: Metadata = {
  title: "About Grow Invicta | Chethan N — Principal Web Practice",
  description:
    "Learn about Grow Invicta & Chethan N. An independent digital engineering practice building high-speed Next.js web systems & funnels with 100% client ownership.",
  alternates: {
    canonical: "https://growinvicta.com/about",
  },
  keywords: [
    "About Grow Invicta",
    "Chethan N Web Developer",
    "Independent Digital Engineering Studio",
    "Principal Web Engineer Bengaluru",
    "Next.js Specialist India",
    "Direct Web Engineering Practice",
  ],
  openGraph: {
    type: "website",
    siteName: "Grow Invicta",
    title: "About Grow Invicta | Chethan N — Principal Web Practice",
    description:
      "Learn about Grow Invicta & Chethan N. An independent digital engineering practice building high-speed Next.js web systems & funnels with 100% client ownership.",
    url: "https://growinvicta.com/about",
    images: [
      {
        url: "https://growinvicta.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta Digital Engineering Practice & Principal Chethan N",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Grow Invicta | Chethan N — Principal Web Practice",
    description:
      "Learn about Grow Invicta & Chethan N. An independent digital engineering practice building high-speed Next.js web systems & funnels with 100% client ownership.",
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
      name: "About",
      item: "https://growinvicta.com/about",
    },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://growinvicta.com/about#principal",
  name: "Chethan N",
  jobTitle: "Founder & Digital Consultant",
  worksFor: {
    "@type": "Organization",
    "@id": "https://growinvicta.com/#organization",
    name: "Grow Invicta",
    url: "https://growinvicta.com",
  },
  organization: {
    "@type": "Organization",
    name: "Grow Invicta",
    url: "https://growinvicta.com",
  },
  url: "https://growinvicta.com/about",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  description:
    "Lead digital engineer and founder of Grow Invicta, engineering high-performance Next.js web applications, Elementor WordPress platforms, and growth engines with radical transparency.",
};

const aboutFaqs: FaqItem[] = [
  {
    q: "Why work with an independent practice instead of a traditional agency?",
    a: "When you work with Grow Invicta, you communicate directly with the engineer building your platform—zero account managers, zero outsourced junior handoffs, and zero inflated markups. Every sprint is executed with high velocity, personal accountability, and complete asset transparency.",
  },
  {
    q: "How does Grow Invicta compare to hiring a full-time in-house developer?",
    a: "Hiring in-house takes months and comes with heavy recurring payroll, benefits, and management overhead. With Grow Invicta, you get senior principal engineering execution immediately on a fixed-scope milestone model with zero long-term liabilities.",
  },
  {
    q: "What is the 10-Day Complete Handover guarantee?",
    a: "Upon reaching milestone completion, 100% of Git repositories, Super Admin credentials, domain DNS controls, editable Canva master links, and written operational manuals are transferred directly to your team with zero vendor lock-in.",
  },
  {
    q: "Where is the practice based and who do you work with?",
    a: "The practice operates from Bengaluru, Karnataka, India, engineering custom web applications, high-converting platforms, and growth engines for startups, healthcare clinics, and modern businesses globally.",
  },
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aboutFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const commitments = [
  {
    number: "01",
    title: "Direct Principal Execution",
    description:
      "No middlemen or junior handoffs. You collaborate directly with me on strategy, architecture, and deployment.",
  },
  {
    number: "02",
    title: "3–7 Day Express Staging",
    description:
      "Fast-track milestone velocity. You review interactive, working software in days rather than waiting months for wireframe approvals.",
  },
  {
    number: "03",
    title: "Dedicated Website Care & Direct Hosting",
    description:
      "Continuous website maintenance, security, and daily backups included in our subscription model, while hosting is set up directly on your own account.",
  },
  {
    number: "04",
    title: "100% Asset Handover & Written SOPs",
    description:
      "Zero vendor lock-in. Complete Git repositories, super-admin logins, and step-by-step written administration manuals are handed over to you on Day 10.",
  },
];

const engineeringArsenal = [
  {
    category: "FRONTEND & WEB APPS",
    description: "Next.js (App Router), React, Tailwind CSS, TypeScript, Serverless APIs.",
  },
  {
    category: "CONTENT MANAGEMENT",
    description: "WordPress strictly built with Elementor for intuitive visual drag-and-drop management.",
  },
  {
    category: "COMMERCE SYSTEMS",
    description: "Custom Shopify themes, 1-Click checkout optimizations, multi-currency routing.",
  },
  {
    category: "DESIGN & MEDIA PRODUCTION",
    description: "Editable Canva master link systems, CapCut post-production, print-ready CMYK collateral.",
  },
  {
    category: "SEARCH & DISCOVERY",
    description: "Generative Engine Optimization (GEO), llms.txt manifests, deep JSON-LD semantic schema networks.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)]">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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

        {/* Hero / Identity Section */}
        <section className="mb-20 sm:mb-24 lg:mb-28 gsap-reveal-header">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[var(--border-subtle)] border border-[var(--border)] text-[11px] font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                <span>ABOUT GROW INVICTA &amp; CHETHAN N</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
                Direct web engineering. Zero agency middlemen.
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
                <p>
                  I&apos;m Chethan N, an independent digital engineer and the founder of Grow Invicta based in Bengaluru, India. I design, build, and deploy production digital web architectures for founders, businesses, healthcare networks, and marketing teams worldwide.
                </p>
                <p>
                  I created Grow Invicta to eliminate the traditional agency model of junior handoffs, bloated communication chains, slow delivery cycles, and artificial infrastructure lock-in. When you work with Grow Invicta, you collaborate directly with me.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="btn-primary"
                >
                  <span>Book a 30-Min Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="btn-secondary"
                >
                  View Portfolio
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <PrincipalProfileImage />
            </div>
          </div>
        </section>

        {/* The Philosophy */}
        <section className="mb-20 sm:mb-24 lg:mb-28">
          <BorderGlow
            className="p-8 sm:p-12 lg:p-16 gsap-reveal-card"
            borderRadius={2}
            glowRadius={36}
            glowIntensity={1.1}
            colors={["#7C3AED", "#FF6A00"]}
            
          >
            <div className="max-w-3xl mb-10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
                THE PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                You should own what you pay for.
              </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl font-normal">
              <p className="p-6 border-l-2 border-[var(--border-hover)] neo-card-inset">
                For years, the standard agency playbook has relied on creating artificial technical dependency: hoarding root server credentials, marking up cloud hosting fees by 300%, locking client code in closed accounts, and padding timelines through layers of non-technical account managers.
              </p>

              <p className="p-6 border-l-2 border-[#7C3AED]/60 neo-card-inset">
                I built Grow Invicta as an independent digital engineering practice designed on radical transparency and high execution speed. I build fast Next.js architectures, clean Elementor WordPress platforms, conversion-engineered Shopify stores, and scalable full-stack applications directly with you. Every line of code, every API integration, and every design asset is engineered to give your business total autonomy.
              </p>

              <p className="p-6 border-l-2 border-[var(--border-hover)] neo-card-inset">
                There are no account managers relaying messages or junior teams learning on your budget. You get direct access to the builder on every call and sprint milestone—ensuring your technical architecture, design fidelity, and business goals are executed flawlessly from discovery to launch.
              </p>
            </div>
          </BorderGlow>
        </section>

        {/* Four Core Commitments */}
        <section className="mb-20 sm:mb-24 lg:mb-28">
          <div className="max-w-3xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              OPERATING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              How We Work Together: 4 Core Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gsap-stagger-container">
            {commitments.map((item, idx) => (
              <BorderGlow
                key={idx}
                className="p-8 sm:p-9 flex flex-col justify-between group gsap-stagger-item"
                borderRadius={2}
                glowRadius={28}
                glowIntensity={1.0}
                colors={["#7C3AED", "#FF6A00"]}
                
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-[var(--text-muted)] mb-5">
                    {item.number}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </BorderGlow>
            ))}
          </div>
        </section>

        {/* Engineering Arsenal */}
        <section className="mb-20 sm:mb-24 lg:mb-28">
          <div className="max-w-3xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              ENGINEERING ARSENAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Modern tools chosen for speed, reliability &amp; control.
            </h2>
          </div>

          <BorderGlow
            className="divide-y divide-[var(--border)] gsap-reveal-card"
            borderRadius={2}
            glowRadius={30}
            glowIntensity={1.0}
            colors={["#7C3AED", "#FF6A00"]}
            
          >
            {engineeringArsenal.map((tool, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[var(--border-subtle)] transition-colors"
              >
                <div className="flex items-center gap-4 md:w-1/3">
                  <h3 className="text-sm sm:text-base font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    {tool.category}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] md:w-2/3 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            ))}
          </BorderGlow>
        </section>

        {/* Practice FAQs */}
        <section className="mb-14 sm:mb-16">
          <div className="max-w-3xl mb-10 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              CLARIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="gsap-reveal-card">
            <CapabilityFaqAccordion faqs={aboutFaqs} />
          </div>

          <div className="mt-8 flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
            <span className="text-xs text-[var(--text-muted)] font-mono">
              Have questions on our specific service packages?
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
