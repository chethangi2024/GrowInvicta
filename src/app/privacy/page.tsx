import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Grow Invicta",
  description: "Privacy Policy for Grow Invicta. Details data collection, protection, calendar booking data, and client ownership transparency.",
};

export default function PrivacyPage() {
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
            Legal Policy
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-zinc-500 font-mono mt-3">
            Last Updated: August 2026 • Grow Invicta (Bengaluru, India)
          </p>
        </div>

        <div className="space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">1. Overview &amp; Commitment</h2>
            <p className="text-zinc-400 leading-relaxed">
              Grow Invicta (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to safeguarding the privacy and data of our website visitors, clients, and partners. This Privacy Policy details how we collect, handle, store, and protect information when you visit our website (growinvicta.com) or engage our digital sprint services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">2. Information We Collect</h2>
            <p className="text-zinc-400">We collect information strictly necessary to execute digital sprint deliverables:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400 font-mono text-xs">
              <li><strong>Contact &amp; Inquiry Data:</strong> Names, business email addresses, website URLs, and scope messages submitted via our inquiry form.</li>
              <li><strong>Calendar Bookings:</strong> Information provided during meeting scheduling through our integrated Cal.com scheduling system.</li>
              <li><strong>Technical Analytics:</strong> Aggregated anonymous data such as browser type, referring URLs, and device type to optimize load performance.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">3. Zero Resale &amp; Data Monetization</h2>
            <p className="text-zinc-400 leading-relaxed">
              We do not sell, rent, trade, or monetize client or prospect data under any circumstances. All communications, project briefs, and proprietary assets shared with Grow Invicta are treated as strictly confidential.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">4. Third-Party Infrastructure Transparency</h2>
            <p className="text-zinc-400 leading-relaxed">
              In accordance with our $0 markup infrastructure philosophy, client production websites are hosted directly under the client&apos;s own accounts (e.g., Vercel, AWS, Cloudways, Shopify). Grow Invicta does not retain client database credentials or sensitive customer records after formal project handover.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white tracking-tight">5. Contact Information</h2>
            <div className="p-4 border border-white/[0.1] bg-[#080808] text-xs font-mono text-zinc-400">
              Email: contact@growinvicta.com<br />
              Location: Bengaluru, Karnataka, India
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
