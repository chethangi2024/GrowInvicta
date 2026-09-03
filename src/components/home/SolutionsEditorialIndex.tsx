import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";

export default function SolutionsEditorialIndex() {
  return (
    <section id="solutions" className="spatial-section py-20 sm:py-24 lg:py-28 bg-[var(--page-bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 sm:mb-16 gap-8 gsap-reveal-header">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              CAPABILITIES
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Build. Launch. Grow.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Eight distinct capabilities spanning Next.js development, Elementor visual editing, Shopify e-commerce, custom web applications, GEO search optimization, video production, and branding.
            </p>
          </div>

          <Link
            href="/solutions"
            className="btn-secondary self-start lg:self-auto"
          >
            <span>Full Solutions Index</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Service Index */}
        <div className="border-t border-[var(--border)] divide-y divide-white/[0.1] gsap-stagger-container">
          {SOLUTIONS.map((sol) => (
            <div
              key={sol.id}
              className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-white/[0.015] transition-colors group px-2 sm:px-4 gsap-stagger-item"
            >
              {/* Badge */}
              <div className="lg:col-span-2 flex items-center lg:items-start">
                <span className="badge-brand w-fit text-[10px]">
                  {sol.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="lg:col-span-4">
                <Link href={`/solutions/${sol.slug}`}>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors tracking-tight">
                    {sol.title}
                  </h3>
                </Link>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-1 uppercase tracking-wider">
                  {sol.subtitle}
                </p>
              </div>

              {/* Description & Deliverables */}
              <div className="lg:col-span-4">
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {sol.shortDesc}
                </p>
                <div className="space-y-1 text-xs text-[var(--text-muted)] font-mono">
                  {sol.deliverables.slice(0, 2).map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <span>&mdash;</span>
                      <span className="line-clamp-1">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="lg:col-span-2 flex lg:justify-end items-center pt-2 lg:pt-0">
                <Link
                  href={`/solutions/${sol.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
