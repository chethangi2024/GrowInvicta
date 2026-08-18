import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRICING_PACKAGES, PRICING_FAQS } from "@/lib/constants";
import CalEmbed from "@/components/contact/CalEmbed";

export const metadata = {
  title: "Transparent Sprint Pricing & Architecture | Grow Invicta",
  description:
    "Explore Grow Invicta's transparent sprint pricing for Next.js custom web, WordPress/Elementor, Shopify, video batches, and Canva branding kits with 100% full ownership.",
};

export default function PricingPage() {
  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            Pricing Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Transparent sprint packages. <br />
            Zero hidden fees.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every package is structured around rapid milestone execution, 100% full asset handover, written administration manuals, and $0 agency markup on your infrastructure.
          </p>
        </div>

        {/* 5 Service Pricing Sections */}
        <div className="border-t border-l border-white/[0.1] grid grid-cols-1 lg:grid-cols-3 mb-24 gsap-stagger-container">
          {PRICING_PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              className={`border-r border-b border-white/[0.1] p-8 sm:p-12 flex flex-col justify-between bg-[#080808] hover:bg-[#0c0c0c] transition-colors gsap-stagger-item ${
                idx === 0 ? "border-flow-subtle" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.08] font-mono text-xs">
                  <span className="text-zinc-500 uppercase">{pkg.category}</span>
                  <span className="text-zinc-300 border border-white/[0.1] px-2 py-0.5">{pkg.badge}</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  {pkg.title}
                </h2>
                <p className="text-xs text-zinc-400 mb-8 leading-relaxed">
                  {pkg.summary}
                </p>

                <div className="space-y-3 mb-8 font-mono text-xs text-zinc-300">
                  <span className="text-[10px] uppercase text-zinc-500 block mb-2">
                    Inclusions
                  </span>
                  {pkg.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5">
                      <span className="text-white font-bold">&mdash;</span>
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.08] space-y-4 font-mono">
                <div className="p-3 border border-white/[0.06] bg-[#050505] text-[11px] text-zinc-400">
                  <span className="text-white block mb-0.5">Infrastructure:</span>
                  {pkg.infrastructure}
                </div>
                <Link
                  href="/contact"
                  className="btn-primary w-full"
                >
                  <span>Book Discovery Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Standard Inclusions Across All Web Builds */}
        <div className="p-8 sm:p-12 border border-white/[0.1] bg-[#080808] mb-24 gsap-reveal-card">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            Standards
          </span>
          <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">
            Included with Every Web Build
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 font-mono text-xs gsap-stagger-container">
            <div className="border-t border-white/[0.1] pt-4 gsap-stagger-item">
              <strong className="text-white text-sm block mb-1">01 / 3–7 Day Staging</strong>
              <span className="text-zinc-400">Rapid working prototype deployed on live server.</span>
            </div>
            <div className="border-t border-white/[0.1] pt-4 gsap-stagger-item">
              <strong className="text-white text-sm block mb-1">02 / 100% Ownership</strong>
              <span className="text-zinc-400">Target Day 10 complete asset and source transfer.</span>
            </div>
            <div className="border-t border-white/[0.1] pt-4 gsap-stagger-item">
              <strong className="text-white text-sm block mb-1">03 / 4 SEO Articles</strong>
              <span className="text-zinc-400">Pre-written authority content loaded into CMS.</span>
            </div>
            <div className="border-t border-white/[0.1] pt-4 gsap-stagger-item">
              <strong className="text-white text-sm block mb-1">04 / 30 Days QA</strong>
              <span className="text-zinc-400">Dedicated issue resolution after final handover.</span>
            </div>
          </div>
        </div>

        {/* Pricing FAQs */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Clarity
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl gsap-stagger-container">
            {PRICING_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 border border-white/[0.08] bg-[#080808] gsap-stagger-item"
              >
                <h3 className="text-base font-bold text-white mb-2 flex items-start gap-2">
                  <span className="font-mono text-zinc-500">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 pl-5 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking CTA */}
        <div className="pt-12 border-t border-white/[0.1] gsap-reveal-card">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold text-white">
              Get an accurate scope and timeline.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Book a free 30-minute strategy call to review your exact requirements.
            </p>
          </div>
          <div className="max-w-4xl">
            <CalEmbed />
          </div>
        </div>
      </div>
    </div>
  );
}
