import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Cookie Policy | Grow Invicta",
  description: "Cookie Policy for Grow Invicta. Details cookie categories, analytics, and browser management controls.",
};

export default function CookiePolicyPage() {
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

        <div className="mb-14 gsap-reveal-header">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            Technical Disclosure
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Cookie Policy
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-3">
            Last Updated: August 2026 • Grow Invicta (Bengaluru, India)
          </p>
        </div>

        <div className="space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">1. What Are Cookies?</h2>
            <p className="text-zinc-400 leading-relaxed">
              Cookies are small text files placed on your device by websites you visit. They are used to make websites work efficiently, remember user preferences, and provide aggregated analytics to site operators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">2. Cookie Categories</h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400 font-mono text-xs">
              <li>
                <strong className="text-white">Essential &amp; Technical Cookies:</strong> Necessary for core website navigation, responsive canvas frame caching, and secure session operation.
              </li>
              <li>
                <strong className="text-white">Performance &amp; Analytics Cookies:</strong> Measure aggregated visitor counts and navigation pathways to optimize Core Web Vitals and load performance.
              </li>
              <li>
                <strong className="text-white">Third-Party Integration Cookies:</strong> Generated when interacting with our embedded Cal.com scheduling interface.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">3. User Controls</h2>
            <p className="text-zinc-400 leading-relaxed">
              You can control and manage cookies through your browser settings. You may choose to block or delete cookies at any time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
