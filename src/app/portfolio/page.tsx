"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_PROJECTS, TESTIMONIALS } from "@/lib/constants";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "wordpress", label: "WordPress / Elementor" },
    { id: "shopify", label: "Shopify" },
    { id: "video", label: "Video Editing" },
    { id: "canva", label: "Canva & Collateral" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.categoryKey === selectedCategory);

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            Selected Works
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Proof of high-speed execution and measurable conversion.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Explore how we build, launch, and grow digital assets for clients across custom code, visual CMS, e-commerce, video production, and brand design.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-16 border-b border-white/[0.08]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-white text-black font-bold"
                  : "bg-transparent text-zinc-400 hover:text-white border border-white/[0.1]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Editorial Project Showcases */}
        <div className="space-y-12 mb-24">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className="border border-white/[0.1] bg-[#090909] p-8 sm:p-12 hover:border-white/[0.3] transition-colors gsap-reveal-card"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3 mb-4 font-mono text-xs text-zinc-500">
                    <span>PROJECT {idx + 1}</span>
                    <span>/</span>
                    <span className="text-zinc-300 uppercase">{proj.category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                    {proj.title}
                  </h3>

                  <div className="inline-block px-2.5 py-1 border border-white/[0.1] font-mono text-xs text-zinc-300 mb-6">
                    {proj.speed}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8">
                    100% full client asset, Git repository, and hosting transfer delivered upon milestone completion.
                  </p>

                  <Link
                    href="/contact"
                    className="btn-primary"
                  >
                    <span>Build Similar</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="lg:col-span-7 space-y-4 font-mono text-xs">
                  <div className="p-4 border border-white/[0.08] bg-[#050505]">
                    <span className="text-zinc-500 uppercase block mb-1">The Challenge:</span>
                    <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-sm">{proj.challenge}</p>
                  </div>

                  <div className="p-4 border border-white/[0.08] bg-[#050505]">
                    <span className="text-zinc-500 uppercase block mb-1">Our Solution:</span>
                    <p className="text-zinc-300 leading-relaxed font-sans text-xs sm:text-sm">{proj.solution}</p>
                  </div>

                  <div className="p-4 border border-white/[0.08] bg-[#050505]">
                    <span className="text-zinc-500 uppercase block mb-1">Deliverables:</span>
                    <p className="text-zinc-300 font-sans text-xs">{proj.deliverables}</p>
                  </div>

                  <div className="p-4 border border-white/[0.15] bg-[#0c0c0c]">
                    <span className="text-white uppercase font-bold block mb-1">Measurable Result:</span>
                    <p className="text-white font-sans text-xs sm:text-sm">{proj.outcome}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Endorsements
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What founders and directors say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/[0.1] gsap-stagger-container">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="border-r border-b border-white/[0.1] p-8 flex flex-col justify-between gsap-stagger-item">
                <p className="text-xs sm:text-sm text-zinc-300 italic mb-6 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-white/[0.08] font-mono">
                  <div className="text-xs font-bold text-white">{t.author}</div>
                  <div className="text-[11px] text-zinc-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-14 border border-white/[0.1] bg-[#080808] text-center max-w-3xl mx-auto gsap-reveal-card">
          <h3 className="text-3xl font-bold text-white mb-3">
            Have a similar project in mind?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mb-8 max-w-md mx-auto">
            Book a 30-minute discovery call to review requirements, scope, and staging timelines.
          </p>
          <Link
            href="/contact"
            className="btn-primary"
          >
            <span>Book a 30-Min Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
