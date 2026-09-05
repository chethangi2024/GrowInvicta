"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { animate, motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOLUTIONS, SEED_ARTICLES } from "@/lib/constants";
import AnimatedButton from "@/components/ui/animated-button";

export interface NavItem {
  label: string;
  href: string;
  isSolutions?: boolean;
}

export interface SpotlightNavbarProps {
  items?: NavItem[];
  className?: string;
}

export function SpotlightNavbar({
  items = [
    { label: "Solutions", href: "/solutions", isSolutions: true },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  className,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Find index based on current path
  const getActiveIndexFromPath = () => {
    if (!pathname || pathname === "/") return -1;
    if (pathname.startsWith("/solutions")) return 0;
    if (pathname.startsWith("/about") || pathname.startsWith("/company")) return 1;
    if (pathname.startsWith("/pricing")) return 2;
    if (pathname.startsWith("/portfolio")) return 3;
    if (
      pathname.startsWith("/blog") ||
      SEED_ARTICLES.some(
        (a) =>
          pathname === `/${a.slug}` ||
          pathname === `/${a.slug}/` ||
          pathname.startsWith(`/${a.slug}`)
      )
    ) {
      return 4; // Blog
    }
    if (pathname.startsWith("/contact")) return 5;
    const found = items.findIndex(
      (it) => it.href === pathname || (it.href !== "/" && pathname.startsWith(it.href))
    );
    return found;
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndexFromPath());
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Spotlight and Ambience spring coordinates
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    setActiveIndex(getActiveIndexFromPath());
    setSolutionsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse move listener for smooth spotlight tracking
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setHoverX(x);
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
    };

    const handleMouseLeave = () => {
      setHoverX(null);
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const targetX = itemRect.left - navRect.left + itemRect.width / 2;

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 240,
          damping: 24,
          onUpdate: (v) => {
            spotlightX.current = v;
            nav.style.setProperty("--spotlight-x", `${v}px`);
          },
        });
      }
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeIndex]);

  // Spring animation for the active item ambience glow bar
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;
    if (activeIndex === -1) return;

    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);

    if (activeItem) {
      const navRect = nav.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetX = itemRect.left - navRect.left + itemRect.width / 2;

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 240,
        damping: 24,
        onUpdate: (v) => {
          ambienceX.current = v;
          nav.style.setProperty("--ambience-x", `${v}px`);
        },
      });
    }
  }, [activeIndex]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 pointer-events-none select-none",
          scrolled
            ? "bg-[var(--page-bg)]/95 backdrop-blur-2xl border-b border-[var(--border)] py-3 shadow-[0_10px_35px_rgba(0,0,0,0.25)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
            : "pt-4 sm:pt-6 bg-transparent",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
          {/* Logo Area */}
          <Link
            href="/"
            className="flex items-center gap-2 group relative py-1 shrink-0"
            aria-label="Grow Invicta Home"
          >
            <div className="relative h-6 w-[124px] sm:h-9 sm:w-[178px] shrink-0 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/brand/grow-invicta-logo-color.webp"
                alt="Grow Invicta"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Center: Floating Spotlight Navigation Bar */}
          <nav
            ref={navRef}
            className={cn(
              "hidden lg:flex items-center relative h-11 px-1.5 rounded-full overflow-visible transition-all duration-300",
              scrolled
                ? "bg-[var(--card-bg)]/98 backdrop-blur-2xl border border-[var(--border)] shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.9)]"
                : "bg-[var(--section-bg)]/92 backdrop-blur-xl border border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            )}
            style={
              {
                "--spotlight-color": "rgba(255, 255, 255, 0.16)",
                "--ambience-color": "rgba(255, 255, 255, 1)",
              } as React.CSSProperties
            }
          >
            {/* Nav Links */}
            <ul className="relative flex items-center h-full gap-0.5 z-10 font-mono text-xs font-semibold">
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;

                if (item.isSolutions) {
                  return (
                    <li
                      key={item.label}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => setSolutionsOpen(true)}
                      onMouseLeave={() => setSolutionsOpen(false)}
                    >
                      <Link
                        href={item.href}
                        data-index={idx}
                        className={cn(
                          "px-4 py-2 uppercase tracking-wider transition-colors duration-200 rounded-full flex items-center gap-1",
                          isActive
                            ? "text-[var(--text-primary)] font-bold"
                            : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 transition-transform duration-200",
                            solutionsOpen ? "rotate-180 text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                          )}
                        />
                      </Link>

                      {/* Solutions Flyout Dropdown */}
                      <AnimatePresence>
                        {solutionsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.16 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[520px] z-50 pointer-events-auto"
                          >
                            <div className="bg-[var(--section-bg)] border border-[var(--border)] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.95)] grid grid-cols-2 gap-1.5 rounded-[4px]">
                              <div className="col-span-2 px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-[2px] flex items-center justify-between mb-0.5">
                                <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-muted)] font-semibold">
                                  8 Core Capabilities
                                </span>
                                <Link
                                  href="/solutions"
                                  className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono flex items-center gap-1 font-semibold transition-colors"
                                >
                                  <span>View Directory</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </Link>
                              </div>
                              {SOLUTIONS.map((sol) => (
                                <Link
                                  key={sol.id}
                                  href={`/solutions/${sol.slug}`}
                                  className="px-3 py-2.5 bg-[var(--card-bg)] hover:bg-[var(--card-bg-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-all duration-200 rounded-[2px] flex items-center justify-between group/item shadow-sm"
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
                    </li>
                  );
                }

                return (
                  <li key={item.label} className="relative h-full flex items-center">
                    <Link
                      href={item.href}
                      data-index={idx}
                      className={cn(
                        "px-4 py-2 uppercase tracking-wider transition-colors duration-200 rounded-full",
                        isActive
                          ? "text-[var(--text-primary)] font-bold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* LIGHTING LAYER 1: Moving Cursor Spotlight (White) */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-[1] rounded-full transition-opacity duration-300"
              style={{
                opacity: hoverX !== null ? 1 : 0,
                background: `
                  radial-gradient(
                    120px circle at var(--spotlight-x, 50%) 100%,
                    var(--spotlight-color, rgba(255, 255, 255, 0.16)) 0%,
                    transparent 50%
                  )
                `,
              }}
            />

            {/* LIGHTING LAYER 2: Active State Ambience Bar (Crisp White Glow) */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2] rounded-full overflow-hidden transition-opacity duration-200"
              style={{
                opacity: activeIndex === -1 ? 0 : 1,
                background: `
                  radial-gradient(
                    60px circle at var(--ambience-x, 50%) 0%,
                    var(--ambience-color, rgba(255, 255, 255, 1)) 0%,
                    rgba(255, 255, 255, 0.4) 40%,
                    transparent 100%
                  )
                `,
              }}
            />
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3.5">
            {/* Flashy FAQ Trigger */}
            <Link
              href="/faq"
              aria-label="Frequently Asked Questions"
              title="Frequently Asked Questions"
              className={cn(
                "w-8 h-8 rounded-full border border-[var(--border-hover)] flex items-center justify-center text-xs font-mono font-bold faq-flash-button group cursor-pointer"
              )}
            >
              <span className="text-xs leading-none font-bold group-hover:scale-110 transition-transform">
                ?
              </span>
            </Link>

            {/* Primary Action Button with Animated Border Shine */}
            <AnimatedButton
              href="/contact?action=quote"
              variant="primary"
              size="sm"
              className="font-mono text-xs"
            >
              <span>GET A QUOTE ↗</span>
            </AnimatedButton>
          </div>

          {/* Mobile Right Quick Triggers */}
          <div className="flex items-center lg:hidden gap-1.5 shrink-0">
            <Link
              href="/faq"
              aria-label="Frequently Asked Questions"
              className="w-7 h-7 rounded-full border border-[var(--border-hover)] flex items-center justify-center text-xs font-mono font-bold faq-flash-button shrink-0"
            >
              <span className="text-xs">?</span>
            </Link>
            <AnimatedButton
              href="/contact?action=quote"
              variant="primary"
              size="sm"
              className="text-[10px] font-mono px-2 py-1 whitespace-nowrap shrink-0"
            >
              GET QUOTE
            </AnimatedButton>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[var(--page-bg)]/98 backdrop-blur-2xl border-b border-[var(--border)] p-6 lg:hidden shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-4 max-w-md mx-auto">
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono block">
                Directory
              </span>

              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg font-bold text-[var(--text-primary)] py-1 hover:text-[var(--text-secondary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="/faq"
                  className="text-lg font-bold text-[var(--text-primary)] py-1 hover:text-[var(--text-secondary)] flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Frequently Asked Questions</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--border)] text-[#7C3AED]">
                    FAQ
                  </span>
                </Link>
              </div>

              <div className="h-px bg-[var(--border)] my-2" />

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact?action=quote"
                  className="w-full text-center py-3 font-bold uppercase text-xs tracking-wider text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover-bg)] transition-colors rounded-[2px]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  GET A QUOTE ↗
                </Link>
                <a
                  href="https://cal.com/iamchethandm/30mincallwithchethan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 font-bold uppercase text-xs tracking-wider text-[var(--text-primary)] border border-[var(--border)] hover:bg-white/[0.05] transition-colors rounded-[2px]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  BOOK A CALL ↗
                </a>
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

export default SpotlightNavbar;
