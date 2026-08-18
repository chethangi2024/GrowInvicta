import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOW_WE_WORK_STEPS } from "@/lib/constants";

export default function MilestoneTimeline() {
  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/[0.1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            05 / Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            How we execute. <br />
            From discovery to Day 10 handover.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            A static, transparent sprint methodology that replaces months of agency bureaucratic delay with structured milestone progression.
          </p>
        </div>

        {/* 4-Step Architectural Grid with Progressive Connecting Path */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.1] process-path-line gsap-stagger-container gsap-path-line">
          {HOW_WE_WORK_STEPS.map((step) => (
            <div
              key={step.step}
              className="border-r border-b border-white/[0.1] p-8 sm:p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors gsap-stagger-item"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.08]">
                  <span className="font-mono text-2xl font-bold text-white tracking-tighter">
                    {step.step}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 border border-white/[0.1] text-zinc-400">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block mb-1">
                  Deliverable
                </span>
                <div className="text-xs font-mono text-zinc-200">
                  {step.deliverable}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-8 border border-white/[0.1] bg-[#080808] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-white">
              Want to see how your project timeline looks?
            </h4>
            <p className="text-xs text-zinc-400 mt-1">
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
        </div>
      </div>
    </section>
  );
}
