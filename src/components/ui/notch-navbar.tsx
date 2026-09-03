"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Code2,
  Sparkles,
  Layers,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SOLUTIONS } from "@/lib/constants";

export interface NotchNavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
}

export function NotchNavbar({ className, logo, ...props }: NotchNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  }, [pathname]);

  const leftItems = [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
  ];

  const rightItems = [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 h-16 flex px-0 transition-all duration-300 pointer-events-none select-none",
          scrolled ? "drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]" : "",
          className
        )}
        {...props}
      >
        {/* Left Side Bar - Flexible width with double hairline */}
        <div className="flex-1 h-10 bg-[var(--section-bg)]/95 backdrop-blur-md z-20 relative min-w-0 pointer-events-auto">
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="39.5"
              x2="100%"
              y2="39.5"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.75"
            />
            <line
              x1="0"
              y1="36.5"
              x2="100%"
              y2="36.5"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Responsive Notch Container - 3 Slices */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px pointer-events-auto">
          {/* Left Slice (Curved Corner Transition) */}
          <div className="w-[50px] h-full relative shrink-0">
            <div
              className="absolute inset-0 bg-[var(--section-bg)]/95 backdrop-blur-md"
              style={{
                clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')",
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 50 64"
            >
              <path
                d="M0 39.5 C25 39.5 25 63.5 50 63.5"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.75"
              />
              <path
                d="M0 36.5 C25 36.5 25 60.5 50 60.5"
                fill="none"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Center Slice (Main Notch Content Area) */}
          <div className="flex-1 h-full relative min-w-0 -ml-px">
            {/* Background & Bottom Double Lines */}
            <div className="absolute inset-0 bg-[var(--section-bg)]/95 backdrop-blur-md">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="63.5"
                  x2="100%"
                  y2="63.5"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="0.75"
                />
                <line
                  x1="0"
                  y1="60.5"
                  x2="100%"
                  y2="60.5"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            {/* Content Layer */}
            <div className="relative w-full h-full flex items-end justify-between pb-2.5 px-3 sm:px-6 md:px-8 gap-4 sm:gap-8">
              {/* Desktop Left Nav */}
              <nav className="hidden lg:flex items-center gap-5 mb-0.5 shrink-0">
                {/* Solutions Dropdown Menu Trigger */}
                <div
                  className="relative"
                  onMouseEnter={() => setSolutionsDropdownOpen(true)}
                  onMouseLeave={() => setSolutionsDropdownOpen(false)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-1 ${
                      pathname.startsWith("/solutions")
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                    aria-expanded={solutionsDropdownOpen}
                  >
                    <span>Solutions</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        solutionsDropdownOpen
                          ? "rotate-180 text-[var(--text-primary)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    />
                  </button>

                  {/* Solutions Flyout Grid */}
                  <AnimatePresence>
                    {solutionsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 pt-2 w-[560px] z-50"
                      >
                        <div className="bg-[var(--section-bg)] border border-[var(--border)] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-2 gap-1.5 rounded-[2px]">
                          <div className="col-span-2 px-3 py-1.5 border-b border-[var(--border)] flex items-center justify-between mb-0.5">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-muted)]">
                              8 Core Capabilities
                            </span>
                            <Link
                              href="/solutions"
                              className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono flex items-center gap-1 font-semibold transition-colors"
                            >
                              Directory <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>
                          {SOLUTIONS.map((sol) => (
                            <Link
                              key={sol.id}
                              href={`/solutions/${sol.slug}`}
                              className="px-3 py-2.5 hover:bg-[var(--border-subtle)] border border-transparent hover:border-[var(--border)] transition-all duration-200 rounded-[2px] flex items-center justify-between group/item"
                            >
                              <span className="text-xs font-semibold text-[var(--text-primary)] group-hover/item:text-white transition-colors">
                                {sol.title}
                              </span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-[var(--text-primary)] transition-all duration-200 shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {leftItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap py-1 ${
                      pathname === item.href
                        ? "text-[var(--text-primary)] font-bold"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button (Left on Mobile) */}
              <button
                type="button"
                className="lg:hidden mb-0.5 p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* Logo (Center of Notch) */}
              <div className="flex items-center justify-center shrink-0 mx-1 sm:mx-4 mb-0.5">
                {logo || (
                  <Link
                    href="/"
                    className="flex items-center gap-2 group relative"
                    aria-label="Grow Invicta Home"
                  >
                    <div className="relative h-7 w-[140px] sm:h-8 sm:w-[165px] md:h-9 md:w-[178px] shrink-0 transition-transform duration-300 group-hover:scale-[1.02]">
                      <Image
                        src="/brand/grow-invicta-logo-color.webp"
                        alt="Grow Invicta"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                  </Link>
                )}
              </div>

              {/* Desktop Right Nav & Actions */}
              <nav className="hidden lg:flex items-center gap-5 mb-0.5 shrink-0">
                {rightItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap py-1 ${
                      pathname === item.href
                        ? "text-[var(--text-primary)] font-bold"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="flex items-center gap-3 pl-3 border-l border-[var(--border)] shrink-0">
                  {/* Subtle Brand-Pulsing FAQ ? Button */}
                  <Link
                    href="/faq"
                    aria-label="Frequently Asked Questions"
                    title="Frequently Asked Questions"
                    className={`w-7 h-7 rounded-full border bg-[var(--border-subtle)] flex items-center justify-center text-xs font-mono font-bold transition-colors faq-icon-pulse group ${
                      pathname === "/faq"
                        ? "text-[var(--text-primary)] border-gi-magenta bg-gi-magenta/20"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-gi-magenta"
                    }`}
                  >
                    <span className="text-xs leading-none group-hover:scale-110 transition-transform">
                      ?
                    </span>
                  </Link>

                  {/* Primary Sprint Booking CTA */}
                  <Link
                    href="/contact"
                    className="px-4 py-1.5 bg-white text-black hover:bg-zinc-200 text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-[2px] flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] whitespace-nowrap"
                  >
                    <span>Book 30-Min Call</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </nav>

              {/* Mobile Right Actions */}
              <div className="lg:hidden flex items-center gap-2 mb-0.5">
                <Link
                  href="/faq"
                  aria-label="FAQ"
                  className="w-6 h-6 rounded-full border border-[var(--border)] bg-[var(--border-subtle)] flex items-center justify-center text-[10px] font-mono font-bold text-[var(--text-secondary)]"
                >
                  ?
                </Link>
                <Link
                  href="/contact"
                  className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-wider rounded-[2px] whitespace-nowrap"
                >
                  Book Call
                </Link>
              </div>
            </div>
          </div>

          {/* Right Slice (Curved Corner Transition) */}
          <div className="w-[50px] h-full relative shrink-0 -ml-px">
            <div
              className="absolute inset-0 bg-[var(--section-bg)]/95 backdrop-blur-md"
              style={{
                clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')",
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 50 64"
            >
              <path
                d="M0 63.5 C25 63.5 25 39.5 50 39.5"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="0.75"
              />
              <path
                d="M0 60.5 C25 60.5 25 36.5 50 36.5"
                fill="none"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </div>

        {/* Right Side Bar - Flexible width with double hairline */}
        <div className="flex-1 h-10 bg-[var(--section-bg)]/95 backdrop-blur-md z-20 relative min-w-0 -ml-px pointer-events-auto">
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="39.5"
              x2="100%"
              y2="39.5"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.75"
            />
            <line
              x1="0"
              y1="36.5"
              x2="100%"
              y2="36.5"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </header>

      {/* Mobile Menu Full Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[var(--section-bg)]/98 backdrop-blur-2xl border-b border-[var(--border)] p-6 lg:hidden shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-4 max-w-md mx-auto">
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono block">
                Index &amp; Capabilities
              </span>

              <div className="flex flex-col gap-2.5 font-medium">
                <Link
                  href="/"
                  className="text-lg font-bold text-[var(--text-primary)] py-1 hover:text-[var(--text-secondary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  href="/solutions"
                  className="text-lg font-bold text-[var(--text-primary)] py-1 hover:text-[var(--text-secondary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Solutions
                </Link>

                <div className="pl-3 flex flex-col gap-1.5 border-l border-[var(--border)] my-1 font-mono">
                  {SOLUTIONS.slice(0, 4).map((s) => (
                    <Link
                      key={s.id}
                      href={`/solutions/${s.slug}`}
                      className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-0.5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {s.title}
                    </Link>
                  ))}
                  <Link
                    href="/solutions"
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] pt-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    + 4 more capabilities &rarr;
                  </Link>
                </div>

                <Link
                  href="/about"
                  className="text-lg font-bold text-[var(--text-primary)] py-1 hover:text-[var(--text-secondary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>

                <Link
                  href="/pricing"
                  className="text-lg font-bold text-[var(--text-primary)] py-1 hover:text-[var(--text-secondary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>

                <Link
                  href="/portfolio"
                  className="text-lg font-bold text-[var(--text-primary)] py-1 hover:text-[var(--text-secondary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Portfolio
                </Link>

                <Link
                  href="/blog"
                  className="text-lg font-bold text-[var(--text-primary)] py-1 hover:text-[var(--text-secondary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog &amp; Insights
                </Link>

                <Link
                  href="/faq"
                  className="text-lg font-bold text-[var(--text-primary)] py-1 hover:text-[var(--text-secondary)] flex items-center justify-between"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Frequently Asked Questions</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--border)] text-gi-magenta">
                    FAQ
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="text-lg font-bold text-[var(--text-primary)] py-1 hover:text-[var(--text-secondary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              <div className="h-px bg-[var(--border)] my-2" />

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="w-full text-center py-3 font-bold uppercase text-xs tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors rounded-[2px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book a Free 30-Min Call
                </Link>
                <a
                  href="mailto:mail@growinvicta.com"
                  className="text-center text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] py-1 font-mono"
                >
                  mail@growinvicta.com
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NotchNavbar;
