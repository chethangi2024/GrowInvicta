import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Refund & Cancellation Policy | Grow Invicta",
  description: "Transparent Refund and Cancellation Policy for Grow Invicta digital agency sprints.",
};

export default function RefundPage() {
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
            Policy Statement
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-3">
            Last Updated: August 2026 • Grow Invicta (Bengaluru, India)
          </p>
        </div>

        <div className="space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">1. Deposit Allocation &amp; Initialization</h2>
            <p className="text-zinc-400 leading-relaxed">
              The 50% upfront project deposit secures dedicated engineering, UI/UX design, and copywriting sprint resources. Upon deposit confirmation, sprint architecture begins immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">2. Cancellation Prior to Staging Delivery</h2>
            <p className="text-zinc-400 leading-relaxed">
              If a client requests project cancellation prior to the delivery of the 3–7 day express staging prototype, the deposit minus documented hours invested in discovery and custom design will be refunded within 14 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">3. Milestone Sign-Off &amp; Final Payment</h2>
            <p className="text-zinc-400 leading-relaxed">
              Once the staging environment has been reviewed and approved, and the project advances into final handover (Day 10), the final 50% balance becomes due. Upon full source code and Super Admin credentials transfer, completed milestone payments are non-refundable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">4. Third-Party Infrastructure Fees</h2>
            <p className="text-zinc-400 leading-relaxed">
              In accordance with our $0 markup policy, all fees paid directly by the client to third-party providers (Vercel, AWS, Shopify, domain registrars, font licenses) are governed by those respective platforms and are strictly non-refundable through Grow Invicta.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
