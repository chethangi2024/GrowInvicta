import React from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, LayoutTemplate, ShoppingBag, Cpu, SearchCheck, TrendingUp, Video, Sparkles } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-brand-400" />,
  LayoutTemplate: <LayoutTemplate className="w-5 h-5 text-brand-400" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5 text-brand-400" />,
  Cpu: <Cpu className="w-5 h-5 text-brand-400" />,
  SearchCheck: <SearchCheck className="w-5 h-5 text-brand-400" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-brand-400" />,
  Video: <Video className="w-5 h-5 text-brand-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-brand-400" />,
};

export default function SolutionsBentoGrid() {
  return (
    <section className="py-24 sm:py-32 bg-[#07070a] relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-600/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold uppercase tracking-widest text-brand-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              Capabilities & Services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Everything you need to build, launch, and grow.
            </h2>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              Grow Invicta combines custom development, visual CMS, high-converting e-commerce, cloud software, organic growth, video editing, and creative branding under one transparent model.
            </p>
          </div>

          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition-all self-start lg:self-auto"
          >
            <span>View All 8 Solutions</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS.map((sol, index) => {
            // Apply varied bento spans for editorial hierarchy
            const isLarge = index === 0 || index === 3;
            return (
              <div
                key={sol.id}
                className={`glass-card rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:border-brand-500/40 hover:shadow-2xl hover:shadow-brand-500/10 group ${
                  isLarge ? "md:col-span-2 bg-[#0e0e15]" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] group-hover:border-brand-500/30 group-hover:bg-brand-500/10 transition-colors">
                        {ICON_MAP[sol.iconName]}
                      </div>
                      <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06]">
                        {sol.badge}
                      </span>
                    </div>
                    <span className="text-sm font-mono font-bold text-zinc-500 group-hover:text-brand-400 transition-colors">
                      {sol.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs font-medium text-brand-400/90 mb-3">
                    {sol.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {sol.shortDesc}
                  </p>

                  {/* Key Deliverables Pills */}
                  <div className="space-y-2 mb-6">
                    {sol.deliverables.slice(0, 3).map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="text-brand-400 mt-0.5 font-bold">&bull;</span>
                        <span className="line-clamp-1">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-mono">
                    {sol.pricingTeaser.split("•")[0]}
                  </span>
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-brand-300 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
