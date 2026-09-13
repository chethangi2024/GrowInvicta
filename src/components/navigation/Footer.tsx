"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";
import BorderGlow from "@/components/ui/BorderGlow";

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  return (
    <footer className="spatial-section bg-[var(--page-bg)] border-t border-[var(--border)] pt-20 pb-12 text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-Footer Conversion Statement (Rendered on ALL pages EXCEPT /contact) */}
        {!isContactPage && (
          <BorderGlow
            className="p-8 sm:p-14 mb-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
            borderRadius={2}
            glowRadius={36}
            glowIntensity={1.15}
            colors={["#7C3AED", "#FF6A00"]}
            
          >
            <div className="max-w-xl">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--text-muted)] mb-3 block">
                Start Your Sprint
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-tight">
                Ready to launch without agency lock-in?
              </h3>
              <p className="text-[var(--text-secondary)] text-sm mt-3 leading-relaxed">
                Receive your 3–7 day express staging prototype and 100% full asset, source code, and infrastructure handover.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <Link
                href="/contact?action=quote"
                className="btn-primary w-full sm:w-auto cursor-pointer font-mono text-xs"
              >
                <span>GET A QUOTE ↗</span>
              </Link>
              <a
                href="https://cal.com/iamchethandm/30mincallwithchethan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto cursor-pointer font-mono text-xs inline-flex items-center justify-center gap-1.5"
              >
                <span>BOOK A CALL ↗</span>
              </a>
            </div>
          </BorderGlow>
        )}

        {/* Multi-Column Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[var(--border)]">
          {/* Brand & Location */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="inline-block relative h-9 w-[172px] sm:h-10 sm:w-[191px]">
              <Image
                src="/brand/grow-invicta-logo-color.webp"
                alt="Grow Invicta"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed mt-2">
              Fast-track digital experiences that launch without the agency lock-in. Custom Next.js web development, WordPress/Elementor, Shopify, web applications, SEO/GEO, video editing, and branding.
            </p>

            <div className="flex flex-col gap-2 pt-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                <span>Bengaluru, Karnataka, India (Global Delivery)</span>
              </div>
              <a
                href="mailto:mail@growinvicta.com"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                <span>mail@growinvicta.com</span>
              </a>

              {/* Social Media Channels */}
              <div className="pt-3 flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono">
                  Follow Us
                </span>
                <span className="text-[var(--border)]">|</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/growinvicta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Grow Invicta on Instagram (opens in new tab)"
                    className="p-1.5 rounded-[2px] bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#E1306C]/60 text-[var(--text-secondary)] hover:text-white transition-all group"
                  >
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/grow-invicta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Grow Invicta Company on LinkedIn (opens in new tab)"
                    className="p-1.5 rounded-[2px] bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#0077B5]/60 text-[var(--text-secondary)] hover:text-white transition-all group"
                  >
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Column (No Numbers) */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] mb-2 font-bold">
              Solutions
            </span>
            {SOLUTIONS.map((sol) => (
              <Link
                key={sol.id}
                href={`/solutions/${sol.slug}`}
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5"
              >
                {sol.title}
              </Link>
            ))}
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] mb-2 font-bold">
              Company
            </span>
            <Link href="/about" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5">
              About Grow Invicta
            </Link>
            <Link href="/pricing" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5">
              Transparent Pricing
            </Link>
            <Link href="/faq" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5">
              FAQ &amp; Knowledge Base
            </Link>
            <Link href="/portfolio" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5">
              Portfolio
            </Link>
            <Link href="/contact?action=quote" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5">
              Get a Quote
            </Link>
            <a
              href="https://cal.com/iamchethandm/30mincallwithchethan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5 inline-flex items-center gap-1"
            >
              <span>Book a Call</span>
              <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
            </a>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] mb-2 font-bold">
              Legal &amp; Policies
            </span>
            <Link href="/privacy" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5">
              Terms of Service
            </Link>
            <Link href="/refund" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5">
              Refund Policy
            </Link>
            <Link href="/disclaimer" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5">
              SEO &amp; Delivery Disclaimer
            </Link>
            <Link href="/cookie-policy" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-0.5">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Large Editorial Background Wordmark */}
        <div className="relative pt-12 pb-4 select-none pointer-events-none border-b border-[var(--border)] w-full flex items-center justify-center gsap-footer-wordmark">
          <svg
            viewBox="0 0 1400 170"
            className="w-full h-auto max-w-full block"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="footerWordmarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="65%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="url(#footerWordmarkGrad)"
              className="font-black uppercase"
              style={{
                fontFamily: "var(--font-poppins), system-ui, sans-serif",
                fontWeight: 900,
                fontSize: "144px",
                letterSpacing: "-0.04em",
              }}
            >
              GROW INVICTA
            </text>
          </svg>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <div>
            &copy; 2026 Grow Invicta. All rights reserved. High-performance digital engineering.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-[var(--text-muted)]">
              <span>Speed</span>
              <span>/</span>
              <span>Transparency</span>
              <span>/</span>
              <span>Ownership</span>
              <span>/</span>
              <span>Quality</span>
            </div>
            <span className="hidden sm:inline text-[var(--border)]">|</span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/growinvicta/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opens in new tab)"
                className="text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/grow-invicta/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                className="text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
