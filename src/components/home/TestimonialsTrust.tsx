import React from "react";
import { ArrowUpRight, CheckCircle2, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import BorderGlow from "@/components/ui/BorderGlow";

export default function TestimonialsTrust() {
  return (
    <section className="spatial-section py-20 sm:py-24 lg:py-28 bg-[var(--page-bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-2">
            CLIENT FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            What our clients say.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Real feedback from businesses we&apos;ve helped build, improve and grow.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gsap-stagger-container">
          {TESTIMONIALS.map((t, idx) => (
            <BorderGlow
              key={idx}
              className="p-7 sm:p-8 flex flex-col justify-between gsap-stagger-item rounded-xl transition-all duration-300 hover:bg-[var(--card-bg-hover)]"
              borderRadius={12}
              edgeSensitivity={24}
              glowRadius={32}
              glowIntensity={1.1}
              colors={["#7C3AED", "#FF6A00"]}
              backgroundColor="#0F1116"
            >
              <div>
                {/* Card Top Meta: Company & Source Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">
                        {t.company}
                      </h3>
                      {t.url && (
                        <a
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                          aria-label={`Visit ${t.company} live website`}
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-[#FF6A00] mt-1 block">
                      {t.projectService}
                    </span>
                  </div>

                  {/* Rating or Verified Badge */}
                  {t.rating ? (
                    <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded bg-[#FF6A00]/10 border border-[#FF6A00]/25 text-[#FF6A00] text-[11px] font-mono font-bold">
                      <Star className="w-3 h-3 fill-[#FF6A00]" />
                      <span>{t.rating}</span>
                    </div>
                  ) : (
                    <div className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Testimonial Quote */}
                <div className="relative mb-6">
                  <span className="text-2xl font-serif text-[#7C3AED]/50 leading-none block mb-1">
                    &ldquo;
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
                    {t.quote}
                  </p>
                </div>
              </div>

              {/* Card Footer: Person, Role & Verified Source */}
              <div className="pt-4 border-t border-[var(--border)] font-mono flex flex-col justify-end">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-bold text-[var(--text-primary)]">
                    {t.clientName || t.company}
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase">
                    {t.source}
                  </span>
                </div>
                {t.role && (
                  <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                    {t.role}
                  </div>
                )}
                <div className="text-[10px] text-[var(--text-muted)] mt-1">
                  {t.location}
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
