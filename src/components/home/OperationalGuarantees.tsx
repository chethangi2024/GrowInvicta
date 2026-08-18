import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { OPERATIONAL_GUARANTEES } from "@/lib/constants";

export default function OperationalGuarantees() {
  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/[0.1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 gsap-reveal-header">
          <div className="lg:col-span-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              01 / Commitments
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Four standard operational guarantees.
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pl-8 lg:border-l border-white/[0.1] flex items-center">
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              We eliminated bureaucratic agency inertia. Every sprint is built upon rapid milestone staging, unencumbered client asset ownership, pre-loaded authority content, and dedicated QA support.
            </p>
          </div>
        </div>

        {/* Typographic 4-Point Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.1] gsap-stagger-container">
          {OPERATIONAL_GUARANTEES.map((item) => (
            <div
              key={item.number}
              className="border-r border-b border-white/[0.1] p-8 sm:p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors gsap-stagger-item"
            >
              <div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tighter">
                  {item.number}
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  {item.tagline}
                </div>

                <h3 className="text-xl font-bold text-white mb-4 tracking-tight leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-10 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Standard Inclusion</span>
                <span className="text-white">&bull;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Target Summary */}
        <div className="mt-12 p-6 border border-white/[0.1] bg-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-zinc-300 font-mono text-center sm:text-left">
            <span className="text-white font-bold">Target Handover: Day 10</span> — Full Git repository, Super Admin credentials, $0 markup hosting & written guides.
          </div>
          <Link
            href="/about"
            className="text-xs font-mono font-semibold uppercase tracking-wider text-white hover:text-zinc-300 flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Read Our Philosophy</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
