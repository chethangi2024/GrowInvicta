import React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles, ShieldCheck } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

export default function OwnershipComparison() {
  return (
    <section className="spatial-section py-20 sm:py-24 lg:py-28 bg-[var(--page-bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] block mb-2">
            TRANSPARENT ENGAGEMENT MODELS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Managed website care or full milestone handover.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Choose our preferred continuous website subscription for complete peace of mind, or opt for a one-time build milestone. You always retain direct ownership of your hosting and credentials.
          </p>
        </div>

        {/* Architectural 4-Node Blueprint */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 font-mono">
          <BorderGlow className="p-6" borderRadius={2} glowRadius={25} glowIntensity={0.9} colors={["#7C3AED", "#FF6A00"]}>
            <div className="text-gi-purple text-[10px] uppercase tracking-wider font-bold mb-2">LAYER 01 / ASSETS</div>
            <div className="text-sm font-bold text-[var(--text-primary)] mb-1">100% Client Ownership</div>
            <div className="text-xs text-[var(--text-secondary)]">Source code, repositories &amp; design assets always shared with you.</div>
          </BorderGlow>
          <BorderGlow className="p-6" borderRadius={2} glowRadius={25} glowIntensity={0.9} colors={["#7C3AED", "#FF6A00"]}>
            <div className="text-gi-purple text-[10px] uppercase tracking-wider font-bold mb-2">LAYER 02 / ACCESS</div>
            <div className="text-sm font-bold text-[var(--text-primary)] mb-1">Root &amp; Super Admin Access</div>
            <div className="text-xs text-[var(--text-secondary)]">Zero withheld credentials. Full administrative keys to your stack.</div>
          </BorderGlow>
          <BorderGlow className="p-6" borderRadius={2} glowRadius={25} glowIntensity={0.9} colors={["#7C3AED", "#FF6A00"]}>
            <div className="text-gi-purple text-[10px] uppercase tracking-wider font-bold mb-2">LAYER 03 / HOSTING</div>
            <div className="text-sm font-bold text-[var(--text-primary)] mb-1">Hosting is Separate</div>
            <div className="text-xs text-[var(--text-secondary)]">Deployed to your own provider account (AWS, Vercel, Hostinger).</div>
          </BorderGlow>
          <BorderGlow className="p-6" borderRadius={2} glowRadius={25} glowIntensity={0.9} colors={["#7C3AED", "#FF6A00"]}>
            <div className="text-gi-purple text-[10px] uppercase tracking-wider font-bold mb-2">LAYER 04 / CARE</div>
            <div className="text-sm font-bold text-[var(--text-primary)] mb-1">Continuous Care</div>
            <div className="text-xs text-[var(--text-secondary)]">Daily automated web backups &amp; ongoing website maintenance included.</div>
          </BorderGlow>
        </div>

        {/* Side-by-Side Comparison Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: Website Subscription (Preferred) */}
          <BorderGlow
            className="p-8 sm:p-12 flex flex-col justify-between"
            borderRadius={2}
            glowRadius={32}
            glowIntensity={1.3}
            colors={["#7C3AED", "#FF6A00"]}
            backgroundColor="#151820"
          >
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] block mb-1">
                    PREFERRED MANAGED MODEL
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                    Website Subscription
                  </h3>
                </div>
                <div className="font-mono text-xs font-semibold text-[#7C3AED] border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-3 py-1">
                  ₹8,000 / Year Renewal
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
                We handle the entire website so you can focus on running your business. Includes continuous maintenance, updates, security patching, and daily backups.
              </p>

              <ul className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)] font-mono">
                {[
                  "We handle everything (Design, build, launch & updates)",
                  "Continuous website maintenance & security updates included",
                  "Daily automated web backup & uptime monitoring",
                  "Everything shared with you (Full codebase & environment access)",
                  "Hosting is separate on your own direct provider account",
                  "3–7 Days express staging delivery candidate",
                  "Predictable yearly renewal (₹8,000/yr INR or $249/yr USD)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-6 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">Complete peace of mind</span>
              <Link
                href="/pricing"
                className="text-[#7C3AED] hover:text-[#9F67FF] flex items-center gap-1 uppercase tracking-wider font-semibold"
              >
                <span>View Subscription Plans</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BorderGlow>

          {/* Column 2: One-Time Build Option */}
          <BorderGlow
            className="p-8 sm:p-12 flex flex-col justify-between"
            borderRadius={2}
            glowRadius={32}
            glowIntensity={1.0}
            colors={["#7C3AED", "#FF6A00"]}
            backgroundColor="#111318"
          >
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">
                    MILESTONE SPRINT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                    One-Time Build
                  </h3>
                </div>
                <div className="font-mono text-xs font-semibold text-[var(--text-secondary)] border border-[var(--border)] px-3 py-1">
                  Single Milestone
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-8 leading-relaxed">
                For organizations with internal web teams. We build and deploy the complete site, transfer all assets and documentation, and hand over full management.
              </p>

              <ul className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)] font-mono">
                {[
                  "100% Full Source Code, Git Repos & Master Assets Handover",
                  "Delivered with comprehensive written documentation & manuals",
                  "Super Admin credentials & root environment transfer",
                  "3–7 Days express staging delivery turnaround",
                  "Hosting set up on your own direct provider account",
                  "30 Days post-launch QA warranty support included",
                  "You handle ongoing maintenance & updates after launch"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[var(--text-muted)]">&mdash;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-6 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--text-muted)]">Full autonomy upon launch</span>
              <Link
                href="/pricing"
                className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View One-Time Rates</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
