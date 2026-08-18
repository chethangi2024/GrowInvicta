import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Grow Invicta",
  description: "Terms of Service for Grow Invicta. Details sprint milestones, 100% intellectual property transfer, and transparent delivery terms.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="mb-14">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            Legal Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-3">
            Last Updated: August 2026 • Grow Invicta (Bengaluru, India)
          </p>
        </div>

        <div className="space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">1. Service Agreements &amp; Scope</h2>
            <p className="text-zinc-400 leading-relaxed">
              By commissioning a digital sprint with Grow Invicta, the client agrees to the sprint scope, deliverables, and timeline targets specified in the project proposal and milestone agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">2. Sprint Milestones &amp; Delivery Targets</h2>
            <p className="text-zinc-400">Grow Invicta operates on structured milestones:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 font-mono text-xs">
              <li><strong>Discovery &amp; Alignment:</strong> Scope confirmation and technical architecture initialization.</li>
              <li><strong>Express Staging:</strong> Working staging environment deployed within approximately 3–7 business days, dependent on client readiness.</li>
              <li><strong>Review &amp; QA:</strong> Iterative refinements, responsive testing, and quality assurance.</li>
              <li><strong>Final Handover:</strong> Target completion around Day 10, subject to scope scale and timely client feedback.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">3. Payment Structure</h2>
            <p className="text-zinc-400 leading-relaxed">
              Standard digital sprints require a 50% upfront deposit to initiate engineering and design sprint resources, with the remaining 50% balance payable upon final milestone completion and ownership handover.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">4. 100% Intellectual Property &amp; Asset Transfer</h2>
            <p className="text-zinc-400 leading-relaxed">
              Upon receipt of the final milestone balance, Grow Invicta transfers 100% of all intellectual property, source code, Git repositories, Super Admin access, and Canva master links unencumbered to the client. Grow Invicta retains zero proprietary vendor lock-in rights.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">5. Limitation of Liability &amp; Jurisdiction</h2>
            <p className="text-zinc-400 leading-relaxed">
              Grow Invicta shall not be held liable for indirect or third-party server outage damages. These terms are governed by and construed in accordance with the laws of Bengaluru, Karnataka, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
