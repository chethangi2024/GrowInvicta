"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.1] py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group relative">
            <div className="relative h-9 w-[172px] sm:h-10 sm:w-[191px] shrink-0">
              <Image
                src="/brand/grow-invicta-logo-color.png"
                alt="Grow Invicta"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  pathname.startsWith("/solutions")
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
                aria-expanded={solutionsDropdownOpen}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    solutionsDropdownOpen ? "rotate-180 text-white" : "text-zinc-500"
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {solutionsDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[580px] z-50">
                  <div className="bg-[#0a0a0a] border border-white/[0.12] p-4 shadow-2xl grid grid-cols-2 gap-2">
                    <div className="col-span-2 px-3 py-1.5 border-b border-white/[0.08] flex items-center justify-between">
                      <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-500">
                        8 Core Capabilities
                      </span>
                      <Link
                        href="/solutions"
                        className="text-[11px] text-zinc-300 hover:text-white font-mono flex items-center gap-1"
                      >
                        Index <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                    {SOLUTIONS.map((sol) => (
                      <Link
                        key={sol.id}
                        href={`/solutions/${sol.slug}`}
                        className="p-3 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08] transition-colors group/item flex flex-col"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-mono text-zinc-500 group-hover/item:text-white">
                            {sol.number}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-white/[0.04] text-zinc-400 font-mono">
                            {sol.badge}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-zinc-200 group-hover/item:text-white transition-colors">
                          {sol.title}
                        </h4>
                        <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                          {sol.shortDesc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                pathname === "/portfolio"
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Portfolio
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                pathname === "/about"
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              About
            </Link>

            <Link
              href="/pricing"
              className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                pathname === "/pricing"
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/blog"
              className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                pathname.startsWith("/blog")
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                pathname === "/contact"
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Primary CTA (Monochrome Solid White) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 text-xs font-semibold uppercase tracking-wider transition-colors rounded-[2px]"
            >
              Book a Free 30-Min Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-3">
            <Link
              href="/contact"
              className="px-3.5 py-1.5 bg-white text-black text-[11px] font-semibold uppercase tracking-wider rounded-[2px]"
            >
              Book Call
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505]/98 pt-24 pb-8 px-6 overflow-y-auto lg:hidden">
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            <div className="border-b border-white/[0.1] pb-4">
              <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-mono mb-4 block">
                Index
              </span>
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="text-xl font-bold text-white py-1 hover:text-zinc-300"
                >
                  Home
                </Link>
                <Link
                  href="/solutions"
                  className="text-xl font-bold text-white py-1 hover:text-zinc-300"
                >
                  All Solutions
                </Link>
                <div className="pl-4 flex flex-col gap-2 border-l border-white/[0.1] my-1">
                  {SOLUTIONS.slice(0, 4).map((s) => (
                    <Link
                      key={s.id}
                      href={`/solutions/${s.slug}`}
                      className="text-xs text-zinc-400 hover:text-white py-0.5"
                    >
                      {s.title}
                    </Link>
                  ))}
                  <Link
                    href="/solutions"
                    className="text-xs text-zinc-300 hover:text-white font-mono py-1"
                  >
                    + 4 more solutions →
                  </Link>
                </div>
                <Link
                  href="/portfolio"
                  className="text-xl font-bold text-white py-1 hover:text-zinc-300"
                >
                  Portfolio
                </Link>
                <Link
                  href="/about"
                  className="text-xl font-bold text-white py-1 hover:text-zinc-300"
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="text-xl font-bold text-white py-1 hover:text-zinc-300"
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  className="text-xl font-bold text-white py-1 hover:text-zinc-300"
                >
                  Blog & Insights
                </Link>
                <Link
                  href="/contact"
                  className="text-xl font-bold text-white py-1 hover:text-zinc-300"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full text-center py-3.5 font-bold uppercase text-xs tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors rounded-[2px]"
              >
                Book a Free 30-Min Call
              </Link>
              <a
                href="mailto:contact@growinvicta.com"
                className="text-center text-xs text-zinc-500 hover:text-white py-1 font-mono"
              >
                contact@growinvicta.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
