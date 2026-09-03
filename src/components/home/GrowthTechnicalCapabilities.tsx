import React from "react";
import Link from "next/link";
import {
  Search,
  Zap,
  TrendingUp,
  Server,
  Video,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

export default function GrowthTechnicalCapabilities() {
  const capabilities = [
    {
      icon: Search,
      badge: "AI SEARCH & GEO",
      title: "Generative Engine Optimization",
      desc: "Structured JSON-LD schema graphs, entity authority, and semantic content architecture engineered for direct citation in ChatGPT, Perplexity AI, Claude, and Google AI Overviews.",
    },
    {
      icon: Zap,
      badge: "CORE WEB VITALS",
      title: "Sub-Second Performance",
      desc: "Next.js server-side rendering, static edge optimization, and 95+ PageSpeed scores to eliminate visitor bounce rates and maximize conversion rankings.",
    },
    {
      icon: TrendingUp,
      badge: "CONVERSION ARCHITECTURE",
      title: "High-Converting Funnels",
      desc: "Bespoke interactive lead intake forms, friction-free payment checkouts, direct discovery booking, and automated webhook routing to your CRM.",
    },
    {
      icon: Server,
      badge: "$0 MARKUP CLOUD",
      title: "Autonomous Infrastructure",
      desc: "Direct deployment to client-owned Vercel, AWS, or Cloudways environments with full Git repository transfer and zero agency hosting markups.",
    },
    {
      icon: Video,
      badge: "SHORT-FORM MEDIA",
      title: "High-Retention Video Editing",
      desc: "Kinetic typography, high-impact vertical 9:16 social shorts, and editable Canva master templates built for omnichannel audience acquisition.",
    },
    {
      icon: ShieldCheck,
      badge: "SECURITY & SOPS",
      title: "Enterprise Hardening & Guides",
      desc: "Hardened security firewalls, automated database backups, and comprehensive step-by-step written documentation for autonomous team management.",
    },
  ];

  return (
    <section className="spatial-section py-20 sm:py-24 lg:py-28 bg-[var(--page-bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-2">
            GROWTH &amp; TECHNICAL CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Beyond website design. <br />
            Full-stack digital engineering &amp; growth.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            We architect every platform for maximum organic visibility, sub-second performance, high conversion rates, and autonomous client operation.
          </p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gsap-stagger-container">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <BorderGlow
                key={idx}
                className="p-7 sm:p-8 flex flex-col justify-between gsap-stagger-item rounded-xl transition-all duration-300 hover:bg-[var(--card-bg-hover)]"
                borderRadius={12}
                edgeSensitivity={24}
                glowRadius={30}
                glowIntensity={1.0}
                colors={["#7C3AED", "#FF6A00"]}
                backgroundColor="#0F1116"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-[var(--border-subtle)] border border-[var(--border)] flex items-center justify-center text-[#FF6A00]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] px-2 py-0.5 rounded bg-[var(--border-subtle)] border border-[var(--border)]">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2.5 tracking-tight">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-[var(--border)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
                  <span>Standard Architecture</span>
                  <span className="text-[var(--text-primary)]">&bull;</span>
                </div>
              </BorderGlow>
            );
          })}
        </div>

        {/* Footer Navigation Bar */}
        <div className="mt-12 p-6 neo-card-interactive flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono text-center sm:text-left">
            Explore detailed architectural specifications across our core solutions.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/solutions"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:text-purple-400 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>All Solutions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-zinc-600 font-mono">|</span>
            <Link
              href="/faq"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Technical FAQs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
