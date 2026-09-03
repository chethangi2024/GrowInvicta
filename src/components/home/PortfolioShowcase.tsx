import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CLIENT_WEBSITES } from "@/lib/constants";
import DepthCarousel from "@/components/ui/DepthCarousel";

export default function PortfolioShowcase() {
  return (
    <section className="spatial-section py-20 sm:py-24 lg:py-28 bg-[var(--page-bg)] border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6 gsap-reveal-header">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-2">
              PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Selected work that speaks for itself.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Explore our live production client platforms and web systems, built for high performance and delivered with 100% asset ownership.
            </p>
          </div>

          <Link
            href="/portfolio?tab=websites"
            className="btn-secondary self-start lg:self-auto"
          >
            <span>VIEW FULL PORTFOLIO →</span>
          </Link>
        </div>

        {/* Real Production Projects DepthCarousel 3D Presentation */}
        <div className="w-full my-4">
          <DepthCarousel
            items={CLIENT_WEBSITES}
            depth={220}
            spread={90}
            tilt={22}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.2}
            blur={6}
            autoplay={true}
            autoplayDelay={3500}
            loop={true}
            tint="#15100b"
          />
        </div>

        {/* Footer CTA Banner */}
        <div className="mt-14 p-6 neo-card-interactive flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono text-center sm:text-left">
            View all 13+ production client websites, 26+ client brands &amp; creative assets.
          </div>
          <Link
            href="/portfolio"
            className="btn-primary text-xs shrink-0"
          >
            <span>Explore Entire Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

