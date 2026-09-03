import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";
import BorderGlow from "@/components/ui/BorderGlow";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const dedicatedPages = [
    "custom-coded",
    "wordpress",
    "shopify",
    "web-applications",
    "ai-search-seo",
    "business-growth",
    "video-editing",
    "creative-branding",
  ];
  return SOLUTIONS.filter((s) => !dedicatedPages.includes(s.slug)).map((s) => ({
    slug: s.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);
  if (!solution) {
    return { title: "Solution Not Found | Grow Invicta" };
  }

  return {
    title: `${solution.title} | Grow Invicta Solutions`,
    description: solution.shortDesc,
  };
}

export default function SolutionDetailPage({ params }: PageProps) {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);

  if (!solution) {
    notFound();
  }

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Solutions</span>
        </Link>

        {/* Hero Header */}
        <div className="max-w-4xl mb-14 sm:mb-16 gsap-reveal-header">
          <div className="flex items-center gap-3 mb-4 font-mono text-xs">
            <span className="px-2 py-0.5 border border-[var(--border)] text-[var(--text-primary)] font-bold uppercase">
              {solution.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            {solution.title}
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-[var(--text-secondary)] font-mono">
            {solution.subtitle}
          </p>

          <p className="mt-6 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            {solution.fullDesc}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 border border-[var(--border)] font-mono text-xs">
            <div className="p-4 border-b sm:border-b-0 sm:border-r border-[var(--border)] bg-[var(--section-bg)]">
              <div className="text-[var(--text-muted)] uppercase mb-1">Express Staging</div>
              <div className="text-[var(--text-primary)] font-bold">3–7 Days Target</div>
            </div>
            <div className="p-4 border-b sm:border-b-0 sm:border-r border-[var(--border)] bg-[var(--section-bg)]">
              <div className="text-[var(--text-muted)] uppercase mb-1">Client Ownership</div>
              <div className="text-[var(--text-primary)] font-bold">100% Handover on Day 10</div>
            </div>
            <div className="p-4 bg-[var(--section-bg)]">
              <div className="text-[var(--text-muted)] uppercase mb-1">Investment Framework</div>
              <div className="text-[var(--text-primary)] font-bold">{solution.pricingTeaser}</div>
            </div>
          </div>
        </div>

        {/* Deliverables Editorial Breakdown */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 tracking-tight gsap-reveal-header">
            Deliverables &amp; Scope Specifications
          </h2>
          <div className="border-t border-[var(--border)] divide-y divide-white/[0.10] gsap-stagger-container">
            {solution.deliverables.map((deliv, idx) => (
              <div
                key={idx}
                className="py-5 flex items-start justify-between gap-4 font-mono text-sm hover:bg-[var(--border-subtle)] px-2 transition-colors gsap-stagger-item"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[var(--text-muted)] text-xs pt-0.5">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-[var(--text-primary)]">{deliv}</span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] uppercase shrink-0 pt-0.5">
                  Standard Inclusion
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 tracking-tight gsap-reveal-header">
            Architectural Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gsap-stagger-container">
            {solution.features.map((feat, idx) => (
              <BorderGlow
                key={idx}
                className="p-8 flex flex-col justify-between gsap-stagger-item"
                borderRadius={2}
                glowRadius={28}
                glowIntensity={1.0}
                colors={["#7C3AED", "#FF6A00"]}
                
              >
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>

        {/* Ownership & Ideal-For Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 gsap-reveal-card">
          <BorderGlow
            className="p-8"
            borderRadius={2}
            glowRadius={30}
            glowIntensity={1.0}
            colors={["#7C3AED", "#FF6A00"]}
            
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              Ownership Guarantee
            </span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
              Unrestricted Client Property
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {solution.ownershipPledge}
            </p>
          </BorderGlow>

          <BorderGlow
            className="p-8"
            borderRadius={2}
            glowRadius={30}
            glowIntensity={1.0}
            colors={["#7C3AED", "#FF6A00"]}
            
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              Ideal Scope
            </span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
              Target Projects
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {solution.idealFor}
            </p>
          </BorderGlow>
        </div>

        {/* FAQs */}
        {solution.faq && solution.faq.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 tracking-tight gsap-reveal-header">
              Capability FAQs
            </h2>
            <div className="space-y-4 max-w-4xl gsap-stagger-container">
              {solution.faq.map((f, idx) => (
                <div key={idx} className="p-6 neo-card gsap-stagger-item">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-start gap-2">
                    <span className="font-mono text-[var(--text-muted)]">Q.</span>
                    <span>{f.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] pl-5 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span>View all FAQs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
