import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_PROJECTS } from "@/lib/constants";

export default function PortfolioShowcase() {
  const heroProject = PORTFOLIO_PROJECTS[0];
  const supportingProjects = PORTFOLIO_PROJECTS.slice(1, 3);

  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/[0.1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 gsap-reveal-header">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              06 / Exhibition
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Selected client case studies.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
              Explore how our sprints deliver measurable organic search growth, high-converting speed, and 100% asset ownership across custom web architectures, e-commerce, and creative media.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="btn-secondary self-start lg:self-auto"
          >
            <span>Full Portfolio Archive</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Exhibition Composition */}
        <div className="space-y-8">
          {/* Dominant Hero Exhibition Case Study */}
          {heroProject && (
            <div className="border border-white/[0.1] bg-[#080808] p-8 sm:p-14 border-flow-box gsap-reveal-card">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="badge-brand">
                      {heroProject.category}
                    </span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-400">{heroProject.speed}</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      100% Ownership Transferred
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                    {heroProject.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/[0.08] text-xs sm:text-sm">
                    <div>
                      <span className="text-zinc-500 uppercase font-mono text-[10px] block mb-2">
                        The Challenge
                      </span>
                      <p className="text-zinc-400 leading-relaxed">
                        {heroProject.challenge}
                      </p>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase font-mono text-[10px] block mb-2">
                        Engineering Solution
                      </span>
                      <p className="text-zinc-300 leading-relaxed">
                        {heroProject.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#0d0d0d] p-6 sm:p-8 border border-white/[0.08]">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gradient font-bold block mb-2">
                      Verified Result
                    </span>
                    <div className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight leading-snug">
                      {heroProject.outcome}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                      Includes complete Git repository ownership, Super Admin keys, and zero agency infrastructure markups.
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                    <Link
                      href="/contact"
                      className="btn-primary w-full text-center"
                    >
                      <span>Build Similar Sprint</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Supporting Editorial Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {supportingProjects.map((proj) => (
              <div
                key={proj.id}
                className="border border-white/[0.1] bg-[#080808] p-8 flex flex-col justify-between hover:border-white/[0.25] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.08]">
                    <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 border border-white/[0.1] text-zinc-300">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {proj.speed}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">
                    {proj.title}
                  </h3>

                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-zinc-500 uppercase font-mono text-[10px] block mb-1">
                        Challenge:
                      </span>
                      <p className="text-zinc-400 leading-relaxed">{proj.challenge}</p>
                    </div>
                    <div>
                      <span className="text-zinc-500 uppercase font-mono text-[10px] block mb-1">
                        Solution:
                      </span>
                      <p className="text-zinc-300 leading-relaxed">{proj.solution}</p>
                    </div>
                    <div className="p-3.5 border border-white/[0.08] bg-[#050505]">
                      <span className="text-white uppercase font-mono text-[10px] font-bold block mb-1">
                        Measurable Outcome:
                      </span>
                      <p className="text-zinc-200 font-medium">{proj.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">100% Client Ownership</span>
                  <Link
                    href="/contact"
                    className="text-white hover:text-zinc-300 inline-flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
