"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getRelatedArticles } from "@/lib/constants";

interface RelatedArticlesProps {
  currentSlug: string;
  category: string;
}

export default function RelatedArticles({
  currentSlug,
  category,
}: RelatedArticlesProps) {
  const related = getRelatedArticles(currentSlug, category, 3);

  if (!related || related.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-[var(--border)]" aria-labelledby="related-articles-heading">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">
            Continue Reading
          </span>
          <h2
            id="related-articles-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            Related Publications
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 font-semibold transition-colors"
        >
          <span>All Insights</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((art) => (
          <Link
            key={art.slug}
            href={`/${art.slug}`}
            className="p-6 bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)] border border-[var(--border)] hover:border-[var(--border-hover)] rounded-xl flex flex-col justify-between transition-all group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono text-[var(--text-muted)]">
                <span className="uppercase text-[var(--text-secondary)] font-semibold">{art.category}</span>
                <span>{art.readTime}</span>
              </div>

              <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-white transition-colors line-clamp-2 mb-2 leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-4">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <span>{art.author}</span>
              <span className="text-[var(--text-primary)] group-hover:text-[#7C3AED] flex items-center gap-1 font-semibold transition-colors">
                Read <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
