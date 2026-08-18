import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function OwnershipComparison() {
  return (
    <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/[0.1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            03 / Infrastructure Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            You should own what you pay for.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Most digital agencies markup hosting 300% and lock access keys in private accounts. Grow Invicta delivers direct infrastructure autonomy from day one.
          </p>
        </div>

        {/* Architectural 4-Node Blueprint */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.1] mb-12 font-mono">
          <div className="border-r border-b border-white/[0.1] p-6 bg-[#080808]">
            <div className="text-gi-magenta text-[10px] uppercase tracking-wider font-bold mb-2">LAYER 01 / ASSETS</div>
            <div className="text-sm font-bold text-white mb-1">100% Client Ownership</div>
            <div className="text-xs text-zinc-400">Git repos, source code & editable Canva master links transferred.</div>
          </div>
          <div className="border-r border-b border-white/[0.1] p-6 bg-[#080808]">
            <div className="text-gi-magenta text-[10px] uppercase tracking-wider font-bold mb-2">LAYER 02 / ACCESS</div>
            <div className="text-sm font-bold text-white mb-1">Root &amp; Super Admin Access</div>
            <div className="text-xs text-zinc-400">Zero withheld credentials. Full administrative keys to your stack.</div>
          </div>
          <div className="border-r border-b border-white/[0.1] p-6 bg-[#080808]">
            <div className="text-gi-magenta text-[10px] uppercase tracking-wider font-bold mb-2">LAYER 03 / BILLING</div>
            <div className="text-sm font-bold text-white mb-1">$0 Infrastructure Markup</div>
            <div className="text-xs text-zinc-400">Direct client billing with AWS, Vercel, Cloudways &amp; Hostinger.</div>
          </div>
          <div className="border-r border-b border-white/[0.1] p-6 bg-[#080808]">
            <div className="text-gi-magenta text-[10px] uppercase tracking-wider font-bold mb-2">LAYER 04 / AUTONOMY</div>
            <div className="text-sm font-bold text-white mb-1">Written Documentation</div>
            <div className="text-xs text-zinc-400">Step-by-step SOPs &amp; manuals so your internal team operates freely.</div>
          </div>
        </div>

        {/* Side-by-Side Comparison Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/[0.1] border-flow-box">
          {/* Column 1: Self-Managed ($0 Markup) */}
          <div className="p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.1] bg-[#080808] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                    Standard Inclusion
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Self-Managed
                  </h3>
                </div>
                <div className="font-mono text-xl font-bold text-white border border-white/[0.15] px-3 py-1">
                  $0 Markup
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 mb-8 leading-relaxed">
                You pay your infrastructure provider directly (AWS, Vercel, Cloudways, Hostinger). You hold root credentials and complete billing autonomy.
              </p>

              <ul className="space-y-4 text-xs sm:text-sm text-zinc-300 font-mono">
                {[
                  "100% Client-Owned Infrastructure & Accounts",
                  "$0 Agency Markup on Hosting & Domain Fees",
                  "Direct Provider Billing (AWS / Vercel / Cloudways)",
                  "Complete Root & Super Admin Access Transferred",
                  "Client Controls All Billing, Renewals & Scaling",
                  "Zero Dependency on Grow Invicta for Routine Operations",
                  "Written Step-by-Step Administration Guides Included"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-white font-bold">&mdash;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Standard with all builds</span>
              <span className="text-white">$0 / month to agency</span>
            </div>
          </div>

          {/* Column 2: Optional Managed Care */}
          <div className="p-8 sm:p-12 bg-[#050505] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                    Optional Support
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Managed Annual Care
                  </h3>
                </div>
                <div className="font-mono text-xs font-semibold text-zinc-400 border border-white/[0.1] px-3 py-1">
                  Optional Retainer
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 mb-8 leading-relaxed">
                For organizations wanting hands-off peace of mind. Our engineering team handles updates, continuous monitoring, and priority technical support.
              </p>

              <ul className="space-y-4 text-xs sm:text-sm text-zinc-400 font-mono">
                {[
                  "Completely Optional (Never Mandatory)",
                  "Continuous Security Hardening & Vulnerability Scans",
                  "Weekly CMS, Plugin & Core Codebase Updates",
                  "24/7 Server Uptime & Performance Monitoring",
                  "Automated Offsite Daily Backups & Recovery",
                  "Priority Technical Support & Issue Resolution",
                  "Quarterly Core Web Vitals Audits"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-zinc-500">&mdash;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">Add only if you need support</span>
              <Link
                href="/pricing"
                className="text-white hover:text-zinc-300 flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View Care Tiers</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
