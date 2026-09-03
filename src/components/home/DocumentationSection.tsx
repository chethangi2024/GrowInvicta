import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

export default function DocumentationSection() {
  return (
    <section className="spatial-section py-20 sm:py-24 lg:py-28 bg-[var(--page-bg)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Manifesto Text */}
          <div className="lg:col-span-6 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-2">
              CLIENT EMPOWERMENT
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
              No knowledge lock-in. <br />
              Written administration manuals.
            </h2>

            <p className="mt-6 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              We reject the agency practice of creating artificial technical dependency. Every Grow Invicta build is accompanied by comprehensive, step-by-step written administration manuals and Standard Operating Procedures (SOPs).
            </p>

            <p className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-mono">
              [Note: We deliver permanent written documentation — never ephemeral video calls that are forgotten in a week.]
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[var(--border)] pt-6 font-mono text-xs text-[var(--text-secondary)] gsap-stagger-container">
              <div className="p-4 neo-card-inset gsap-stagger-item">
                <div className="text-[var(--text-primary)] font-bold mb-1">01. Infrastructure</div>
                <div className="text-[var(--text-muted)] text-[11px]">Deployment &amp; DNS setup.</div>
              </div>
              <div className="p-4 neo-card-inset gsap-stagger-item">
                <div className="text-[var(--text-primary)] font-bold mb-1">02. Content Operations</div>
                <div className="text-[var(--text-muted)] text-[11px]">CMS &amp; front-end editing.</div>
              </div>
              <div className="p-4 neo-card-inset gsap-stagger-item">
                <div className="text-[var(--text-primary)] font-bold mb-1">03. Source Assets</div>
                <div className="text-[var(--text-muted)] text-[11px]">Git &amp; Canva master links.</div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="btn-primary"
              >
                <span>Experience Our Process</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Document Schema View */}
          <div className="lg:col-span-6 gsap-doc-reveal">
            <BorderGlow
              className="p-6 sm:p-8"
              borderRadius={2}
              glowRadius={30}
              glowIntensity={1.0}
              colors={["#7C3AED", "#FF6A00"]}
              
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6 font-mono text-xs">
                <span className="text-[var(--text-primary)] font-bold">GROW_INVICTA_HANDOVER_MANUAL.MD</span>
                <span className="text-[var(--text-muted)] uppercase">Standard Deliverable</span>
              </div>

              <div className="space-y-4 font-mono text-xs text-[var(--text-secondary)]">
                <div className="p-4 neo-card-inset">
                  <div className="text-[var(--text-primary)] font-bold mb-1">01. INFRASTRUCTURE &amp; DEPLOYMENT</div>
                  <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                    - GitHub Organization Repository Transfer<br />
                    - Vercel / Cloudways Direct Production DNS Records<br />
                    - Environment Variables &amp; API Key Secure Vault
                  </p>
                </div>

                <div className="p-4 neo-card-inset">
                  <div className="text-[var(--text-primary)] font-bold mb-1">02. CONTENT OPERATIONS &amp; EDITING</div>
                  <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                    - Modifying typography tokens, headlines &amp; CTA buttons<br />
                    - Uploading &amp; indexing 4 pre-loaded authority SEO articles<br />
                    - Lead intake webhook endpoints &amp; form notifications
                  </p>
                </div>

                <div className="p-4 neo-card-inset">
                  <div className="text-[var(--text-primary)] font-bold mb-1">03. SOURCE CODE &amp; MASTER ASSETS</div>
                  <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                    - Live editable Canva master template links<br />
                    - 300 DPI CMYK print export presets with crop marks
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span>Non-Technical Language</span>
                <span className="text-[var(--text-primary)]">100% Client Property</span>
              </div>
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  );
}
