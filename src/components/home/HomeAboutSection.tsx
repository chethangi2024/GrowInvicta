import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Zap, KeyRound } from "lucide-react";
import PrincipalProfileImage from "@/components/about/PrincipalProfileImage";

export default function HomeAboutSection() {
  const highlights = [
    {
      icon: Zap,
      title: "Direct Engineering",
      desc: "Work directly with the engineer building your site—zero account managers or handoffs.",
    },
    {
      icon: ShieldCheck,
      title: "3–7 Day Staging",
      desc: "Review interactive, working web builds in days rather than waiting weeks for mockups.",
    },
    {
      icon: KeyRound,
      title: "100% Ownership",
      desc: "Zero hosting markup, complete Git repos, and full root admin credentials transferred on Day 10.",
    },
  ];

  return (
    <section className="spatial-section py-20 sm:py-24 lg:py-28 bg-[var(--page-bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Principal Profile Card */}
          <div className="lg:col-span-5 flex justify-center gsap-reveal-card">
            <PrincipalProfileImage />
          </div>

          {/* Right Column: About Details & Copy */}
          <div className="lg:col-span-7 space-y-6 gsap-reveal-header">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-2">
                ABOUT GROW INVICTA &amp; LEAD ENGINEER
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                Direct web engineering. Zero agency middlemen.
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
              <p>
                I&apos;m <span className="text-[var(--text-primary)] font-medium">Chethan N</span>, an independent digital engineer and the founder of Grow Invicta based in Bengaluru, India. I engineer high-performance web systems, custom Next.js platforms, Elementor WordPress CMS, and high-converting growth funnels for founders, healthcare networks, and ambitious businesses worldwide.
              </p>
              <p>
                Grow Invicta was built to eliminate the traditional agency model of junior handoffs, bloated communication chains, slow turnaround times, and infrastructure lock-in. When you partner with Grow Invicta, you collaborate directly with the engineer building your platform from Day 1 to live deployment.
              </p>
            </div>

            {/* Simple 3 Highlight Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-[2px] bg-[var(--border-subtle)] border border-[var(--border-subtle)]"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link href="/about" className="btn-primary">
                <span>Learn More About Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                <span>Book a Discovery Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
