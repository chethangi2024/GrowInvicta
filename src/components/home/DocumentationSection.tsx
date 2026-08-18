import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function DocumentationSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#080808] border-t border-white/[0.1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Manifesto Text */}
          <div className="lg:col-span-6 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              04 / Documentation Standard
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              No knowledge lock-in. <br />
              Written administration manuals.
            </h2>

            <p className="mt-6 text-sm sm:text-base text-zinc-300 leading-relaxed">
              We reject the agency practice of creating artificial technical dependency. Every Grow Invicta build is accompanied by comprehensive, step-by-step written administration manuals and Standard Operating Procedures (SOPs).
            </p>

            <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-mono">
              [Note: We deliver permanent written documentation — never ephemeral video calls that are forgotten in a week.]
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.1] pt-6 font-mono text-xs text-zinc-300 gsap-stagger-container">
              <div className="p-4 border border-white/[0.08] bg-[#050505] gsap-stagger-item">
                <div className="text-white font-bold mb-1">01 / Written Guides</div>
                <div className="text-zinc-500">Step-by-step textual SOPs for every feature.</div>
              </div>
              <div className="p-4 border border-white/[0.08] bg-[#050505] gsap-stagger-item">
                <div className="text-white font-bold mb-1">02 / Super Admin Manual</div>
                <div className="text-zinc-500">Credentials, permissions, and security setup.</div>
              </div>
              <div className="p-4 border border-white/[0.08] bg-[#050505] gsap-stagger-item">
                <div className="text-white font-bold mb-1">03 / Hosting &amp; DNS</div>
                <div className="text-zinc-500">Domain configuration and deployment instructions.</div>
              </div>
              <div className="p-4 border border-white/[0.08] bg-[#050505] gsap-stagger-item">
                <div className="text-white font-bold mb-1">04 / Maintenance SOPs</div>
                <div className="text-zinc-500">Database routines, caching, and backups.</div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="btn-primary"
              >
                <span>Experience Our Process</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Document Schema View */}
          <div className="lg:col-span-6 border border-white/[0.1] bg-[#050505] p-6 sm:p-8 gsap-doc-reveal">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6 font-mono text-xs">
              <span className="text-white font-bold">GROW_INVICTA_HANDOVER_MANUAL.MD</span>
              <span className="text-zinc-500 uppercase">Standard Deliverable</span>
            </div>

            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <div className="p-4 border border-white/[0.06] bg-[#080808]">
                <div className="text-white font-bold mb-1"># 1.0 ARCHITECTURE &amp; REPOSITORIES</div>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  - GitHub Organization Repository Transfer<br />
                  - Vercel / Cloudways Direct Production DNS Records<br />
                  - Environment Variables &amp; API Key Secure Vault
                </p>
              </div>

              <div className="p-4 border border-white/[0.06] bg-[#080808]">
                <div className="text-white font-bold mb-1"># 2.0 CONTENT OPERATIONS &amp; EDITING</div>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  - Modifying typography tokens, headlines &amp; CTA buttons<br />
                  - Uploading &amp; indexing 4 pre-loaded authority SEO articles<br />
                  - Lead intake webhook endpoints &amp; form notifications
                </p>
              </div>

              <div className="p-4 border border-white/[0.06] bg-[#080808]">
                <div className="text-white font-bold mb-1"># 3.0 CANVA LINKS &amp; VECTOR ASSETS</div>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  - Live editable Canva master template links<br />
                  - 300 DPI CMYK print export presets with crop marks
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Non-Technical Language</span>
              <span className="text-white">100% Client Property</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
