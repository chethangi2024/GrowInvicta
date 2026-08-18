import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Check, X } from "lucide-react";

export const metadata = {
  title: "About Grow Invicta | Built to Eliminate Agency Lock-In",
  description:
    "Founded in Bengaluru, India, Grow Invicta was built to eliminate agency lock-in, inflated hosting markups, and withheld codebases. We serve local and global clients with 100% full asset ownership.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 01: Manifesto Header */}
        <div className="max-w-4xl mb-20 sm:mb-28 gsap-reveal-header">
          <div className="badge-brand mb-4">
            <span>Manifesto &amp; Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.06]">
            Built to eliminate <br />
            <span className="text-brand-gradient">agency lock-in.</span>
          </h1>
          <p className="mt-8 text-base sm:text-xl text-zinc-300 leading-relaxed font-normal max-w-3xl">
            Grow Invicta was founded in Bengaluru, India around a simple principle:{" "}
            <strong className="text-white font-semibold">Clients should own what they pay for.</strong>{" "}
            We eliminated the deceptive agency models that trap businesses into recurring developer fees, locked infrastructure, and withheld source assets.
          </p>
        </div>

        {/* Section 02: Core Philosophy Editorial Statement */}
        <div className="mb-24 sm:mb-32 p-8 sm:p-14 border border-white/[0.1] bg-[#090909] border-flow-box gsap-reveal-card">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gradient font-bold block mb-2">
              01 / Core Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              You should own what you pay for.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
              We believe that true engineering and design partnerships build client independence, not perpetual dependency. Every Grow Invicta sprint is architected so that your internal team retains unrestricted autonomy over every layer of your digital presence.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-white/[0.08] gsap-stagger-container">
            {[
              { label: "Your Website", desc: "Production build" },
              { label: "Your Source Code", desc: "Full Git repository" },
              { label: "Your Design Assets", desc: "Editable Canva & vector" },
              { label: "Your Infrastructure", desc: "Direct billing control" },
              { label: "Your Accounts", desc: "Root & Super Admin" },
              { label: "Your Documentation", desc: "Written step-by-step SOPs" },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white/[0.02] border border-white/[0.08] gsap-stagger-item">
                <div className="text-[11px] font-mono text-zinc-500 mb-1">0{idx + 1}</div>
                <div className="text-xs sm:text-sm font-bold text-white mb-1">{item.label}</div>
                <div className="text-[11px] text-zinc-400 font-mono">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 03: The Problem We Eliminate vs What You Receive */}
        <div className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              02 / Industry Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Deceptive agency traps vs. The Grow Invicta standard.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/[0.1] gsap-reveal-card">
            {/* The Problems We Eliminate */}
            <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.1] bg-[#070707]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-3">
                Problems We Eliminate
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                What clients shouldn&apos;t endure:
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-zinc-400 font-mono">
                {[
                  "Agency lock-in trapping clients in perpetual dependencies",
                  "Inflated 300% markups on third-party hosting and domains",
                  "Unclear ownership and withheld source repositories",
                  "Hidden dependencies requiring paid agency support tickets",
                  "Missing documentation leaving internal teams helpless",
                  "Prolonged 3 to 6-month delivery timelines for basic sites",
                  "Unnecessary technical barriers and proprietary black boxes"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-red-500/80 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Every Client Receives */}
            <div className="p-8 sm:p-12 bg-[#090909]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gradient font-bold block mb-3">
                The Grow Invicta Standard
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                What every client receives:
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-zinc-300 font-mono">
                {[
                  "100% full client ownership of Git codebases, assets & Canva links",
                  "$0 agency markup — client pays hosting & domain providers directly",
                  "Express staging ready in approximately 3–7 business days",
                  "Target completion around Day 10 with Super Admin credentials",
                  "Comprehensive written step-by-step administration guides & SOPs",
                  "Realistic 60–90 day organic Google SEO & AI search (GEO) roadmaps",
                  "Transparent 50/50 payment milestone structure with zero recurring traps"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 04: The Four Core Pillars */}
        <div className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              03 / Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              The Four Core Operational Pillars
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              The foundational commitments that govern every project we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/[0.1] gsap-stagger-container">
            {[
              {
                number: "01",
                title: "100% Client Ownership",
                subtitle: "Zero Vendor Lock-In",
                desc: "We believe you should own what you pay for. From source code and private Git repositories to Canva marketing templates and cloud hosting accounts, everything is legally transferred directly to your organization."
              },
              {
                number: "02",
                title: "$0 Infrastructure Markup",
                subtitle: "Direct Provider Billing",
                desc: "We never mark up hosting, domains, or third-party infrastructure fees. Clients pay infrastructure providers directly (Vercel, AWS, Cloudways, Hostinger) where applicable, maintaining 100% billing control."
              },
              {
                number: "03",
                title: "Realistic Growth Timelines",
                subtitle: "No Fabricated Promises",
                desc: "We do not sell 'rank #1 on Google overnight' myths. We provide transparent, verified 60–90 day indexing roadmaps, Generative Engine Optimization (GEO) semantic entity mapping, and compounding organic authority."
              },
              {
                number: "04",
                title: "Comprehensive Written Documentation",
                subtitle: "Clear Administration Guides & SOPs",
                desc: "Every project includes exhaustive, written step-by-step administration manuals. Your non-technical team receives the precise knowledge needed to update text, swap imagery, publish articles, and operate autonomously."
              }
            ].map((pillar) => (
              <div
                key={pillar.number}
                className="border-r border-b border-white/[0.1] p-8 sm:p-12 flex flex-col justify-between hover:bg-white/[0.015] transition-colors gsap-stagger-item"
              >
                <div>
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-zinc-600 mb-6 tracking-tighter">
                    {pillar.number}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-brand-gradient font-bold mb-2">
                    {pillar.subtitle}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Grow Invicta Standard</span>
                  <span className="text-white">&bull;</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 05: How We Work (Milestone Model) */}
        <div className="mb-24 sm:mb-32">
          <div className="max-w-3xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              04 / Execution Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Structured Sprint Methodology
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              A transparent 4-stage sprint model designed to eliminate protracted agency delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.1] border-flow-box gsap-stagger-container gsap-path-line">
            {[
              {
                step: "01",
                title: "Discovery",
                duration: "Day 1–2",
                desc: "Deep-dive into your business goals, target audience, technical scope, and design preferences. Scope locked with zero ambiguity.",
                deliverable: "Scope & Architecture Plan"
              },
              {
                step: "02",
                title: "Staging",
                duration: "Day 3–7",
                desc: "Rapid engineering sprint delivering your first working, interactive staging environment for review, depending on scope and client readiness.",
                deliverable: "Working Staging Environment"
              },
              {
                step: "03",
                title: "Review & QA",
                duration: "Day 7–9",
                desc: "Iterative refinements, Core Web Vitals audits, multi-device responsiveness testing, form validation, and cross-browser quality assurance.",
                deliverable: "Production Release Candidate"
              },
              {
                step: "04",
                title: "Complete Handover",
                duration: "Target: Day 10",
                desc: "Target completion around Day 10 (subject to scope and dependencies). 100% transfer of source code, Super Admin credentials, written guides, and launch.",
                deliverable: "Full Ownership & Live Launch"
              }
            ].map((st) => (
              <div
                key={st.step}
                className="border-r border-b border-white/[0.1] p-8 flex flex-col justify-between bg-[#080808]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.08]">
                    <span className="font-mono text-2xl font-bold text-white tracking-tighter">
                      {st.step}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 border border-white/[0.1] text-zinc-400">
                      {st.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {st.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08]">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block mb-1">
                    Milestone Output
                  </span>
                  <div className="text-xs font-mono text-zinc-200 font-semibold">
                    {st.deliverable}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 06: Location & Global Delivery */}
        <div className="p-8 sm:p-14 border border-white/[0.1] bg-[#080808] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 gsap-reveal-card">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase mb-3">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>Bengaluru, Karnataka, India</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Headquartered in Bengaluru. Serving local and global clients.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              We collaborate with founders, growing enterprises, clinics, and marketing teams locally in India and internationally across North America, Europe, and Asia.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary shrink-0 w-full sm:w-auto"
          >
            <span>Book a Free 30-Min Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
