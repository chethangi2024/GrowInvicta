"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import QuoteForm from "@/components/contact/QuoteForm";
import CapabilityFaqAccordion, { FaqItem } from "@/components/solutions/CapabilityFaqAccordion";
import BorderGlow from "@/components/ui/BorderGlow";

const CAL_DIRECT_URL = "https://cal.com/iamchethandm/30mincallwithchethan";

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
      name: "Contact & Project Intake",
      item: "https://growinvicta.com/contact",
    },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://growinvicta.com/contact#contact",
  name: "Start a Project with Grow Invicta",
  url: "https://growinvicta.com/contact",
  description:
    "Request a project quote or book a 30-minute discovery call directly with Chethan N at Grow Invicta. Custom Next.js, WordPress, Shopify, SEO & digital growth.",
};

const contactFaqs: FaqItem[] = [
  {
    q: "How quickly do you review and reply to submitted quotes?",
    a: "Every project inquiry submitted through the Get a Quote form is reviewed directly by Chethan N. You will receive a technical brief, scope breakdown, and estimate promptly.",
  },
  {
    q: "What is covered in the 30-minute 'Book a Call' session?",
    a: "The discovery call is a high-bandwidth alignment conversation. We evaluate your business requirements, discuss architecture options (Next.js vs. WordPress vs. Shopify), and clarify deliverables with zero aggressive sales pitches.",
  },
  {
    q: "Can I request a quote if our requirements are still evolving?",
    a: "Yes. Simply share an overview of what you are aiming to achieve, and we will outline recommended technical solutions and milestone sprint structures.",
  },
  {
    q: "Can we reach out directly via phone or WhatsApp?",
    a: "Yes. You can contact us directly at +91 96204 11122 for immediate scoping or consultation inquiries.",
  },
];

const nextSteps = [
  {
    step: "01",
    tag: "REVIEW",
    title: "We review your requirements",
    desc: "We analyze your project goals, technical scope, and functional specifications without sales middlemen.",
  },
  {
    step: "02",
    tag: "IDENTIFY",
    title: "We identify the right solution",
    desc: "We recommend the optimal architecture (Next.js, Elementor, Shopify) and outline exact deliverables.",
  },
  {
    step: "03",
    tag: "NEXT STEPS",
    title: "We get back to you with the next steps",
    desc: "You receive a clear scope document, transparent investment milestones, and a prototype staging schedule.",
  },
];

function ContactContent() {
  const searchParams = useSearchParams();
  const actionParam = searchParams.get("action");
  const [activeTab, setActiveTab] = useState<"quote" | "call">("quote");

  useEffect(() => {
    if (actionParam === "call") {
      setActiveTab("call");
    } else {
      setActiveTab("quote");
    }
  }, [actionParam]);

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)]">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="mb-12 sm:mb-16 gsap-reveal-header">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-bold block mb-3">
              START A PROJECT
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1] mb-5">
              Let&apos;s build what your business actually needs.
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              Tell us about your project to receive a detailed scope and quote, or book a 30-minute discovery call to discuss your requirements directly.
            </p>
          </div>
        </section>

        {/* TWO CLEAR CONVERSION PATHS */}
        <section className="mb-14 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* PATH 1: GET A QUOTE (Primary Conversion) */}
            <div className="lg:col-span-7 flex flex-col">
              <div
                onClick={() => setActiveTab("quote")}
                className={`p-7 sm:p-9 border rounded-[2px] transition-all cursor-pointer flex-1 flex flex-col justify-between ${
                  activeTab === "quote"
                    ? "bg-[#111318] border-[#7C3AED] shadow-[0_0_30px_rgba(124,58,237,0.18)] ring-1 ring-[#7C3AED]/40"
                    : "bg-[#0a0a0a] border-[var(--border)] hover:border-[var(--border-hover)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#7C3AED]" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#7C3AED] font-bold">
                        PATH 01 • PRIMARY CONVERSION
                      </span>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/40">
                      RECOMMENDED
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    GET A QUOTE ↗
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    Tell us what you need and we&apos;ll review your requirements and get back to you with a tailored architecture and price estimate.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Takes ~2 minutes • Upfront review
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab("quote");
                      const el = document.getElementById("quote-engine-form");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-primary text-xs font-mono py-2 px-4 shadow-md inline-flex items-center gap-1.5"
                  >
                    <span>{activeTab === "quote" ? "Filling Below ↓" : "Select Path 1"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PATH 2: BOOK A CALL (Secondary Conversion via Cal.com) */}
            <div className="lg:col-span-5 flex flex-col">
              <div
                className="p-7 sm:p-9 border border-[var(--border)] bg-[#0a0a0a] hover:border-amber-400/40 transition-all rounded-[2px] flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                        PATH 02 • DIRECT CALENDAR
                      </span>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)]">
                      30 MINS
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    PREFER TO TALK FIRST?
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    Book a 30-minute discovery call at a time that works for you. Direct technical alignment with Chethan N.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Opens Cal.com Directly
                  </span>
                  <a
                    href={CAL_DIRECT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full sm:w-auto text-xs font-mono py-2 px-4 inline-flex items-center justify-center gap-1.5"
                  >
                    <span>BOOK A CALL ↗</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUOTE FORM ENGINE (EXPANDED ON PAGE) */}
        <section id="quote-engine-form" className="mb-20 sm:mb-24 lg:mb-28">
          <QuoteForm />
        </section>

        {/* RESPONSE PROTOCOL (WHAT HAPPENS NEXT) */}
        <section className="mb-20 sm:mb-24 lg:mb-28">
          <div className="max-w-3xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              THE ONBOARDING JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              What happens next?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gsap-stagger-container">
            {nextSteps.map((s, idx) => (
              <BorderGlow
                key={idx}
                className="p-8 flex flex-col justify-between gsap-stagger-item"
                borderRadius={2}
                glowRadius={28}
                glowIntensity={1.0}
                colors={["#7C3AED", "#FF6A00"]}
                backgroundColor="#111318"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--border)]">
                    <span className="font-mono text-3xl font-bold text-[var(--text-muted)]">
                      {s.step}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--border)] text-[var(--text-secondary)]">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                    {s.desc}
                  </p>
                </div>
              </BorderGlow>
            ))}
          </div>
        </section>

        {/* DIRECT CHANNELS STRIP */}
        <section className="mb-20 sm:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 neo-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  <Phone className="w-3.5 h-3.5 text-[#00D084]" />
                  <span>DIRECT WHATSAPP &amp; PHONE</span>
                </div>
                <div className="text-lg font-mono font-bold text-[var(--text-primary)] mb-1">
                  +91 96204 11122
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Direct scoping and consultation channel.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)]">
                <a
                  href="https://wa.me/919620411122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-semibold text-[#00D084] hover:underline"
                >
                  Chat on WhatsApp &rarr;
                </a>
              </div>
            </div>

            <div className="p-7 neo-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  <Mail className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>PROJECT INTAKE EMAIL</span>
                </div>
                <div className="text-lg font-mono font-bold text-[var(--text-primary)] mb-1">
                  mail@growinvicta.com
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Send RFPs, briefs, or Figma design links directly.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)]">
                <a
                  href="mailto:mail@growinvicta.com"
                  className="text-xs font-mono font-semibold text-[#7C3AED] hover:underline"
                >
                  Send Brief &rarr;
                </a>
              </div>
            </div>

            <div className="p-7 neo-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>ENGINEERING PRACTICE BASE</span>
                </div>
                <div className="text-lg font-mono font-bold text-[var(--text-primary)] mb-1">
                  Bengaluru, Karnataka
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Principal-led agency based in India, operating globally.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)]">
                Direct Principal Execution
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
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
            <CapabilityFaqAccordion faqs={contactFaqs} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--page-bg)] flex items-center justify-center text-xs font-mono text-[var(--text-muted)]">Loading intake form...</div>}>
      <ContactContent />
    </Suspense>
  );
}
