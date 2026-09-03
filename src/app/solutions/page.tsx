import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";
import BorderGlow from "@/components/ui/BorderGlow";

export const metadata = {
  title: "Solutions & Digital Capabilities | Grow Invicta",
  description:
    "Explore Grow Invicta's 8 core capabilities: Custom Next.js web development, WordPress/Elementor, Shopify e-commerce, custom web apps, AI Search & SEO / GEO, business growth, video editing, and creative branding.",
};

export default function SolutionsHubPage() {
  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
            Directory
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            High-performance digital builds without agency lock-in.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Every capability is engineered for speed, transparency, and complete client asset ownership. Explore deep architectural deliverables and sprint targets below.
          </p>
        </div>

        {/* 8 Solutions Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gsap-stagger-container">
          {SOLUTIONS.map((sol) => (
            <BorderGlow
              key={sol.id}
              className="p-8 sm:p-12 flex flex-col justify-between gsap-stagger-item"
              borderRadius={2}
              edgeSensitivity={25}
              glowRadius={32}
              glowIntensity={1.0}
              colors={["#7C3AED", "#FF6A00"]}
              
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border)]">
                  <span className="text-xs font-mono px-2 py-0.5 border border-[var(--border)] text-[var(--text-secondary)] uppercase">
                    {sol.badge}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                  {sol.title}
                </h2>
                <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-6">
                  {sol.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                  {sol.fullDesc}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2 mb-8 font-mono text-xs text-[var(--text-secondary)]">
                  <span className="text-[10px] uppercase text-[var(--text-muted)] block mb-2">
                    Core Deliverables
                  </span>
                  {sol.deliverables.slice(0, 4).map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2">
                      <span className="text-[var(--text-primary)]">&mdash;</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-mono text-[var(--text-muted)]">
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
            </BorderGlow>
          ))}
        </div>
      </div>
    </div>
  );
}
