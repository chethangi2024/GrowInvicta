import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Target } from "lucide-react";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";

export const metadata: Metadata = {
  title: "Short-Form Video Editing & Healthcare Education | Grow Invicta",
  description:
    "High-retention short-form video editing, healthcare educational content, kinetic typography & sound design. 48-72hr turnarounds & 100% master file handover.",
  alternates: {
    canonical: "https://growinvicta.com/solutions/video-editing",
  },
  keywords: [
    "Short Form Video Editing Agency",
    "Healthcare Video Production",
    "Instagram Reels Editing Service",
    "YouTube Shorts Video Editor",
    "Kinetic Typography Video Editing",
    "Doctor Clinic Video Production Bangalore",
  ],
  openGraph: {
    type: "website",
    siteName: "Grow Invicta",
    title: "Short-Form Video Editing & Healthcare Education | Grow Invicta",
    description:
      "High-retention short-form video editing, healthcare educational content, kinetic typography & sound design. 48-72hr turnarounds & 100% master file handover.",
    url: "https://growinvicta.com/solutions/video-editing",
    images: [
      {
        url: "https://growinvicta.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta Short-Form Video Editing and Post-Production",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Short-Form Video Editing & Healthcare Education | Grow Invicta",
    description:
      "High-retention short-form video editing, healthcare educational content, kinetic typography & sound design. 48-72hr turnarounds & 100% master file handover.",
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
      name: "Video Editing",
      item: "https://growinvicta.com/solutions/video-editing",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://growinvicta.com/solutions/video-editing#service",
  name: "Short-Form Video Editing & Post-Production",
  serviceType: "Video Post-Production & Motion Design",
  provider: {
    "@type": "ProfessionalService",
    "@id": "https://growinvicta.com/#organization",
    name: "Grow Invicta",
    url: "https://growinvicta.com",
  },
  url: "https://growinvicta.com/solutions/video-editing",
  description:
    "High-retention short-form video editing, healthcare educational content, kinetic typography, and motion design with fast 48 to 72 hour turnarounds and 100% master project file handover.",
};

const faqs: FaqItem[] = [
  {
    q: "What footage do we need to provide for video editing?",
    a: "You provide raw video recorded on a smartphone or camera, and our team handles all cutting, color grading, audio enhancement, kinetic captions, and sound design.",
  },
  {
    q: "What video formats and platforms do you edit for?",
    a: "We produce multi-format video deliverables optimized for vertical short-form platforms (Instagram Reels, YouTube Shorts, TikTok in 9:16), landscape long-form formats (YouTube, website video headers in 16:9), and square feed carousels (1:1).",
  },
  {
    q: "Do we receive 100% ownership of the master project files and raw assets?",
    a: "Yes. You receive full ownership of all final high-resolution renders, project files, sound effects, motion graphics templates, and export archives with zero licensing restrictions or usage royalties.",
  },
  {
    q: "What is the typical turnaround time for video editing batches?",
    a: "Our standard delivery turnaround is 48 to 72 hours per batch of short-form edits, allowing your brand to maintain a consistent publishing schedule without delays.",
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
    title: "High-Hook Short-Form Editing",
    description:
      "Dynamic pacing, seamless jump-cuts, pattern interrupts, and visual hooks engineered for maximum algorithmic retention on Instagram Reels and YouTube Shorts.",
  },
  {
    title: "Dynamic Kinetic Typography & Captions",
    description:
      "Stylized, high-contrast animated subtitles and on-screen emphasis graphics to engage sound-off mobile viewers.",
  },
  {
    title: "Healthcare & Educational Storyboarding",
    description:
      "Tailored pacing for doctors, clinic practices, and educators, simplifying clinical concepts into trustworthy, engaging video modules.",
  },
  {
    title: "Pro Audio Engineering & Sound Design",
    description:
      "Audio cleanup, background noise removal, vocal equalization, dynamic sound effects (SFX), and royalty-free music mixing.",
  },
  {
    title: "4 Video Topic Cluster Strategy Articles",
    description:
      "Written video distribution guides and content repurposing workflows published on your website to reinforce search discoverability.",
  },
  {
    title: "100% Master Project Files & 4K Clean Exports",
    description:
      "Complete handover of Premiere Pro / After Effects project files, clean 4K export master archives, and cloud storage links.",
  },
];

export default function VideoEditingPage() {
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
              <span>SHORT-FORM &amp; POST-PRODUCTION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-6">
              Video Editing
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--text-secondary)] tracking-tight leading-snug mb-6">
              High-Retention Short-Form Reels, Healthcare Patient Education &amp; Kinetic Motion Graphics
            </p>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              Turn raw footage and clinical explanations into high-retention 9:16 vertical videos. We craft punchy hooks, custom motion graphics, sound design, and kinetic subtitles that capture attention across Instagram Reels, YouTube Shorts, and TikTok.
            </p>
          </div>

          {/* Hero Telemetry */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] bg-[#0a0a0a] divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                BATCH TURNAROUND
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                48–72 Hours per Batch
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                FULL HANDOVER
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                100% Project Files &amp; 4K Masters
              </div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                RETENTION UX
              </div>
              <div className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                Kinetic Subtitles &amp; Sound FX
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
                  Algorithmic Hook Framing
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  First-3-second retention engineering using motion graphics, sound triggers, and punchy visual framing to maximize completion rate.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Clinical &amp; Healthcare Expertise
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Clear, empathetic video breakdowns for medical clinics, simplifying doctor insights without diluting professional authority.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="neo-card-interactive p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight mb-3">
                  Rapid 48–72 Hr Batch Turnarounds
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Streamlined post-production pipelines delivering high-quality batches on schedule, so your publishing rhythm never falters.
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
                  100% full master project file handover, clean high-resolution exports, and royalty-free audio licenses. Zero proprietary asset lock-in.
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
                  Medical clinics, aesthetic practices, executive coaches, SaaS founders, and content creators needing consistent, professional short-form video.
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
