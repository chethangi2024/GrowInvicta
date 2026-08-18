"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SEED_ARTICLES } from "@/lib/constants";

export default function BlogHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [guideEmail, setGuideEmail] = useState("");
  const [guideSubmitted, setGuideSubmitted] = useState(false);

  const categories = [
    { id: "all", label: "All Insights" },
    { id: "Search & GEO", label: "Search & GEO" },
    { id: "Canva Design", label: "Canva Design" },
    { id: "Elementor Guides", label: "Elementor Guides" },
    { id: "Video Marketing", label: "Video Marketing" },
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? SEED_ARTICLES
      : SEED_ARTICLES.filter((a) => a.category === selectedCategory);

  const handleGuideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guideEmail) {
      setGuideSubmitted(true);
    }
  };

  const featured = SEED_ARTICLES[0];
  const rest = filteredArticles;

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            Editorial Publications
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Strategic insights on search, ownership, and web execution.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Honest breakdowns of Generative Engine Optimization, client asset ownership, visual editing workflows, and clinic video marketing.
          </p>
        </div>

        {/* Featured Dominant Article */}
        {featured && selectedCategory === "all" && (
          <div className="mb-16 gsap-reveal-card">
            <Link
              href={`/blog/${featured.slug}`}
              className="border border-white/[0.1] bg-[#090909] p-8 sm:p-14 block hover:border-white/[0.3] transition-colors"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4 font-mono text-xs text-zinc-500">
                  <span className="text-white border border-white/[0.15] px-2 py-0.5">
                    FEATURED PUBLICATION
                  </span>
                  <span>/</span>
                  <span className="uppercase text-zinc-400">{featured.category}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 tracking-tight leading-snug">
                  {featured.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 mb-8 leading-relaxed">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                  <span>{featured.readTime}</span>
                  <span>&bull;</span>
                  <span>{featured.date}</span>
                  <span>&bull;</span>
                  <span>{featured.author}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs">
                <span className="text-white flex items-center gap-1 uppercase">
                  Read Complete Article <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-zinc-500">60–90 Day Roadmap</span>
              </div>
            </Link>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-white/[0.08]">
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

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 gsap-stagger-container">
          {rest.map((art) => (
            <Link
              key={art.slug}
              href={`/blog/${art.slug}`}
              className="border border-white/[0.1] bg-[#090909] p-8 flex flex-col justify-between hover:border-white/[0.3] transition-colors gsap-stagger-item"
            >
              <div>
                <div className="flex items-center justify-between mb-4 font-mono text-xs text-zinc-500">
                  <span className="uppercase text-zinc-400">{art.category}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>{art.author}</span>
                <span className="text-white flex items-center gap-1 uppercase">
                  Read <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Written Digital Launch Guide Download */}
        <div className="p-8 sm:p-14 border border-white/[0.1] bg-[#080808] gsap-reveal-card">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              Free Written Resource
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              The Digital Agency Handover Blueprint
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
              A comprehensive written checklist covering Git repository transfers, $0 markup hosting configuration, Canva master links, and 60-day SEO execution.
            </p>

            {guideSubmitted ? (
              <div className="p-4 border border-white/[0.2] bg-[#050505] text-white text-xs font-mono">
                &check; Handover blueprint dispatched to {guideEmail}. Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleGuideSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={guideEmail}
                  onChange={(e) => setGuideEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="px-4 py-3 bg-[#050505] border border-white/[0.12] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white flex-grow"
                />
                <button
                  type="submit"
                  className="btn-primary shrink-0"
                >
                  Download Free Blueprint
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
