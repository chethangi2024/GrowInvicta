import React from "react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsTrust() {
  return (
    <section className="py-24 sm:py-32 bg-[#080808] border-t border-white/[0.1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            07 / Client Endorsement
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Feedback from founders and directors.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/[0.1] gsap-stagger-container">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="border-r border-b border-white/[0.1] p-8 sm:p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors gsap-stagger-item"
            >
              <div>
                <span className="font-mono text-zinc-600 text-3xl font-bold block mb-4">
                  &ldquo;
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-8">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] font-mono">
                <div className="text-xs font-bold text-white uppercase">{t.author}</div>
                <div className="text-[11px] text-zinc-500 mt-0.5">{t.role}</div>
                <div className="text-[10px] text-zinc-600 mt-1">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
