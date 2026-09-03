"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { getPublishedArticles } from "@/lib/constants";

export default function BlogHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [guideEmail, setGuideEmail] = useState("");
  const [guideSubmitted, setGuideSubmitted] = useState(false);

    const categories = [
    { id: "all", label: "All Insights" },
    { id: "Web Design & Development", label: "Web Design & Dev" },
    { id: "SEO & AI Search", label: "SEO & AI Search" },
    { id: "Digital Marketing", label: "Digital Marketing" },
    { id: "Social Media & Growth", label: "Social Media & Growth" },
    { id: "Content & Video", label: "Content & Video" },
  ];

  const published = getPublishedArticles();
  const filteredArticles =
    selectedCategory === "all"
      ? published
      : published.filter(
          (a) => a.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleGuideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guideEmail) {
      setGuideSubmitted(true);
    }
  };

  const featured = published[0];
  const rest =
    selectedCategory === "all"
      ? filteredArticles.filter((a) => a.slug !== featured?.slug)
      : filteredArticles;

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
            Editorial Publications
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Strategic insights on search, ownership, and web execution.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Honest breakdowns of Generative Engine Optimization, client asset ownership, visual editing workflows, and clinic video marketing.
          </p>
        </div>

        {/* Featured Dominant Article */}
        {featured && selectedCategory === "all" && (
          <div className="mb-16 gsap-reveal-card">
            <Link
              href={`/${featured.slug}`}
              className="border border-[var(--border)] bg-[var(--section-bg)] block hover:border-[var(--border-hover)] transition-colors overflow-hidden"
            >
              {/* Featured Image */}
              {featured.featuredImage && (
                <div className="w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.featuredImage}
                    alt={featured.featuredImageAlt || featured.title}
                    className="w-full h-auto max-h-[400px] object-cover object-center"
                    loading="eager"
                  />
                </div>
              )}

              <div className="p-8 sm:p-14">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[var(--text-muted)]">
                    <span className="text-[var(--text-primary)] border border-[var(--border)] px-2 py-0.5">
                      FEATURED PUBLICATION
                    </span>
                    <span>/</span>
                    <span className="uppercase text-[var(--text-secondary)]">{featured.category}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight leading-snug">
                    {featured.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
                    <span>{featured.readTime}</span>
                    <span>&bull;</span>
                    <span>{featured.date}</span>
                    <span>&bull;</span>
                    <span>{featured.author}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--text-primary)] flex items-center gap-1 uppercase">
                    Read Complete Article <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[var(--text-muted)]">2026 Strategy Guide</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-[var(--border)]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-white text-black font-bold"
                  : "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles List */}
        {rest.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 gsap-stagger-container">
            {rest.map((art) => (
              <Link
                key={art.slug}
                href={`/${art.slug}`}
                className="border border-[var(--border)] bg-[var(--section-bg)] flex flex-col justify-between hover:border-[var(--border-hover)] transition-colors gsap-stagger-item overflow-hidden"
              >
                {/* Card Featured Image */}
                {art.featuredImage && (
                  <div className="w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={art.featuredImage}
                      alt={art.featuredImageAlt || art.title}
                      className="w-full h-48 object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-4 font-mono text-xs text-[var(--text-muted)]">
                      <span className="uppercase text-[var(--text-secondary)]">{art.category}</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3 tracking-tight leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mt-auto">
                    <span>{art.author}</span>
                    <span className="text-[var(--text-primary)] flex items-center gap-1 uppercase">
                      Read <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-12 mb-20 text-center border border-[var(--border)] bg-[var(--section-bg)] p-8">
            <p className="text-sm font-mono text-[var(--text-muted)]">
              {selectedCategory === "all"
                ? "No publications currently found."
                : `No publications currently found in "${selectedCategory}".`}
            </p>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="mt-4 px-4 py-2 text-xs font-mono border border-[var(--border)] text-[var(--text-primary)] hover:border-white transition-colors uppercase tracking-wider"
              >
                View All Insights
              </button>
            )}
          </div>
        )}

        {/* Written Digital Launch Guide Download */}
        <div className="p-8 sm:p-14 border border-[var(--border)] bg-[#080808] gsap-reveal-card">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              Free Written Resource
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
              The Digital Agency Handover Blueprint
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              A comprehensive written checklist covering Git repository transfers, $0 markup hosting configuration, Canva master links, and 60-day SEO execution.
            </p>

            {guideSubmitted ? (
              <div className="p-4 border border-[var(--border-hover)] bg-[var(--section-bg)] text-[var(--text-primary)] text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Handover blueprint dispatched to {guideEmail}. Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleGuideSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={guideEmail}
                  onChange={(e) => setGuideEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="px-4 py-3 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] flex-grow transition-all"
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
