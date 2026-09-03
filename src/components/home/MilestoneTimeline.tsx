import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOW_WE_WORK_STEPS } from "@/lib/constants";
import BorderGlow from "@/components/ui/BorderGlow";

export default function MilestoneTimeline() {
  return (
    <section className="spatial-section py-20 sm:py-24 lg:py-28 bg-[var(--page-bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
            METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            How we execute. <br />
            From discovery to Day 10 handover.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            A static, transparent sprint methodology that replaces months of agency bureaucratic delay with structured milestone progression.
          </p>
        </div>

        {/* 4-Step Architectural Grid with Independent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gsap-stagger-container">
          {HOW_WE_WORK_STEPS.map((step) => (
            <BorderGlow
              key={step.step}
              className="p-8 sm:p-10 flex flex-col justify-between gsap-stagger-item"
              borderRadius={2}
              edgeSensitivity={25}
              glowRadius={30}
              glowIntensity={1.0}
              colors={["#7C3AED", "#FF6A00"]}
              
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border)]">
                  <span className="font-mono text-2xl font-bold text-[var(--text-primary)] tracking-tighter">
                    {step.step}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 border border-[var(--border)] text-[var(--text-secondary)]">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] block mb-1">
                  Deliverable
                </span>
                <div className="text-xs font-mono text-[var(--text-primary)]">
                  {step.deliverable}
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>

        {/* Footer CTA */}
        <BorderGlow
          className="mt-12 p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          borderRadius={2}
          edgeSensitivity={25}
          glowRadius={32}
          glowIntensity={1.1}
          colors={["#8B5CF6", "#E0287D", "#FF6B00"]}
          backgroundColor="#0a0a0c"
        >
          <div>
            <h4 className="text-base font-bold text-[var(--text-primary)]">
              Want to see how your project timeline looks?
            </h4>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Book a 30-minute discovery session. We outline deliverables, staging targets, and pricing upfront.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary whitespace-nowrap"
          >
            <span>Schedule Discovery Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </BorderGlow>
      </div>
    </section>
  );
}
