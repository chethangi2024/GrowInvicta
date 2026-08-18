import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";

export const metadata = {
  title: "Solutions & Digital Capabilities | Grow Invicta",
  description:
    "Explore Grow Invicta's 8 core capabilities: Custom Next.js web development, WordPress/Elementor, Shopify e-commerce, custom web apps, AI Search & SEO / GEO, business growth, video editing, and creative branding.",
};

export default function SolutionsHubPage() {
  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="max-w-3xl mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            Directory
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            High-performance digital builds without agency lock-in.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every capability is engineered for speed, transparency, and complete client asset ownership. Explore deep architectural deliverables and sprint targets below.
          </p>
        </div>

        {/* 8 Solutions Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/[0.1] gsap-stagger-container">
          {SOLUTIONS.map((sol) => (
            <div
              key={sol.id}
              className="border-r border-b border-white/[0.1] p-8 sm:p-12 flex flex-col justify-between hover:bg-white/[0.015] transition-colors gsap-stagger-item"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.08]">
                  <span className="text-xs font-mono px-2 py-0.5 border border-white/[0.1] text-zinc-400 uppercase">
                    {sol.badge}
                  </span>
                  <span className="font-mono text-3xl font-bold text-zinc-500 tracking-tighter">
                    {sol.number}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                  {sol.title}
                </h2>
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-6">
                  {sol.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8">
                  {sol.fullDesc}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-8 font-mono text-xs text-zinc-300">
                  <span className="text-[10px] uppercase text-zinc-500 block mb-2">
                    Core Deliverables
                  </span>
                  {sol.deliverables.slice(0, 4).map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <span className="text-white">&mdash;</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-mono text-zinc-500">
                  {sol.pricingTeaser}
                </div>
                <Link
                  href={`/solutions/${sol.slug}`}
                  className="btn-secondary self-start sm:self-auto"
                >
                  <span>Explore Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
