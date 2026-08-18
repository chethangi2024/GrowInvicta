import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";
import CalEmbed from "@/components/contact/CalEmbed";
import InquiryForm from "@/components/contact/InquiryForm";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({
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
    <div className="pt-32 pb-24 sm:pb-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Solutions</span>
        </Link>

        {/* Hero Header */}
        <div className="max-w-4xl mb-20 gsap-reveal-header">
          <div className="flex items-center gap-3 mb-4 font-mono text-xs">
            <span className="px-2 py-0.5 border border-white/[0.15] text-white font-bold">
              Capability {solution.number}
            </span>
            <span className="text-zinc-500 uppercase">
              {solution.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {solution.title}
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-zinc-300 font-mono">
            {solution.subtitle}
          </p>

          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-3xl">
            {solution.fullDesc}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 border border-white/[0.1] font-mono text-xs">
            <div className="p-4 border-b sm:border-b-0 sm:border-r border-white/[0.1] bg-[#090909]">
              <div className="text-zinc-500 uppercase mb-1">Express Staging</div>
              <div className="text-white font-bold">3–7 Days Target</div>
            </div>
            <div className="p-4 border-b sm:border-b-0 sm:border-r border-white/[0.1] bg-[#090909]">
              <div className="text-zinc-500 uppercase mb-1">Client Ownership</div>
              <div className="text-white font-bold">100% Handover on Day 10</div>
            </div>
            <div className="p-4 bg-[#090909]">
              <div className="text-zinc-500 uppercase mb-1">Written Documentation</div>
              <div className="text-white font-bold">Standard Inclusion</div>
            </div>
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="mb-20 gsap-reveal-card">
          <div className="border border-white/[0.1] bg-[#080808] p-8 sm:p-12">
            <div className="max-w-2xl mb-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                Specification
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Itemized Sprint Deliverables
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Everything delivered in this capability package. No hidden asterisks, no withheld codebases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/[0.08] pt-8 gsap-stagger-container">
              {solution.deliverables.map((deliv, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-white/[0.06] bg-[#050505] flex items-start gap-3 font-mono text-xs text-zinc-300 gsap-stagger-item"
                >
                  <span className="text-white font-bold">&mdash;</span>
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architectural Highlights */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 tracking-tight gsap-reveal-header">
            Architectural Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/[0.1] gsap-stagger-container">
            {solution.features.map((feat, idx) => (
              <div
                key={idx}
                className="border-r border-b border-white/[0.1] p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors gsap-stagger-item"
              >
                <div>
                  <div className="font-mono text-xs text-zinc-500 mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ownership & Ideal-For Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 gsap-reveal-card">
          <div className="border border-white/[0.1] p-8 bg-[#080808]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Ownership Guarantee
            </span>
            <h3 className="text-xl font-bold text-white mb-3">
              Unrestricted Client Property
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {solution.ownershipPledge}
            </p>
          </div>

          <div className="border border-white/[0.1] p-8 bg-[#050505]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Ideal Scope
            </span>
            <h3 className="text-xl font-bold text-white mb-3">
              Target Projects
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {solution.idealFor}
            </p>
          </div>
        </div>

        {/* FAQs */}
        {solution.faq && solution.faq.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight gsap-reveal-header">
              Capability FAQs
            </h2>
            <div className="space-y-4 max-w-4xl gsap-stagger-container">
              {solution.faq.map((f, idx) => (
                <div key={idx} className="p-6 border border-white/[0.08] bg-[#080808] gsap-stagger-item">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-start gap-2">
                    <span className="font-mono text-zinc-500">Q.</span>
                    <span>{f.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 pl-5 leading-relaxed">
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking CTA Section */}
        <div className="pt-12 border-t border-white/[0.1] gsap-reveal-card">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold text-white">
              Launch your {solution.title} sprint.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Book a 30-minute strategy call or send your brief to initiate your 3–7 day staging milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <CalEmbed />
            </div>
            <div className="lg:col-span-5">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
