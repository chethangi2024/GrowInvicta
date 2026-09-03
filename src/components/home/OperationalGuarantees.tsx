import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OPERATIONAL_GUARANTEES } from "@/lib/constants";
import BorderGlow from "@/components/ui/BorderGlow";

export default function OperationalGuarantees() {
  return (
    <section className="spatial-section py-20 sm:py-24 lg:py-28 bg-[var(--page-bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 sm:mb-16 gsap-reveal-header">
          <div className="lg:col-span-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              STANDARDS &amp; COMMITMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              Four standard operational guarantees.
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pl-8 lg:border-l border-[var(--border)] flex items-center">
            <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-2xl">
              We have eliminated traditional agency bureaucracy, hidden retainers, and prolonged delivery cycles. Every project we engineer adheres to four strict, non-negotiable operational commitments.
            </p>
          </div>
        </div>

        {/* Typographic 4-Point Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gsap-stagger-container">
          {OPERATIONAL_GUARANTEES.map((item) => (
            <BorderGlow
              key={item.number}
              className="p-8 sm:p-10 flex flex-col justify-between gsap-stagger-item"
              borderRadius={2}
              edgeSensitivity={25}
              glowRadius={30}
              glowIntensity={1.0}
              colors={["#7C3AED", "#FF6A00"]}
            >
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-6 tracking-tighter">
                  {item.number}
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-2">
                  {item.tagline}
                </div>

                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 tracking-tight leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-10 pt-4 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>Standard Inclusion</span>
                <span className="text-[var(--text-primary)]">&bull;</span>
              </div>
            </BorderGlow>
          ))}
        </div>

        {/* Milestone Target Summary */}
        <div className="mt-12 p-6 neo-card-interactive flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono text-center sm:text-left">
            <span className="text-[var(--text-primary)] font-bold">Target Handover: Day 10</span> — Full Git repository, Super Admin credentials, $0 markup hosting &amp; written guides.
          </div>
          <Link
            href="/about"
            className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:text-purple-400 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Read Our Commitments</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
