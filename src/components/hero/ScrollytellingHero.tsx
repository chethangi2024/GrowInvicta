"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CinematicChromeTitle from "./CinematicChromeTitle";

const SERVICES = [
  { name: "WEBSITE DESIGN" },
  { name: "SEO & AI SEARCH OPTIMIZATION" },
  { name: "BUSINESS GROWTH & SOCIAL MEDIA" },
  { name: "VIDEO EDITING" },
  { name: "CREATIVE & BRANDING" },
];

function ScrollToExplore({
  className = "absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2",
  innerRef,
}: {
  className?: string;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={innerRef}
      className={`flex flex-col items-center gap-2 z-30 pointer-events-auto select-none ${className}`}
    >
      <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--text-secondary)] uppercase font-semibold">
          SCROLL
        </span>
        <span className="text-[9px] font-mono tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gi-purple via-gi-magenta to-gi-orange uppercase font-bold">
          TO EXPLORE
        </span>
        <div className="w-[1px] h-7 bg-gradient-to-b from-gi-magenta via-gi-orange to-transparent animate-pulse" />
      </div>
    </div>
  );
}

export default function ScrollytellingHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const phase0Ref = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  const capabilityRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  // Direct DOM Phase state updates to avoid React re-renders during scroll
  const updatePhaseDOM = useCallback((progress: number) => {
    const p0 = phase0Ref.current;
    const p1 = phase1Ref.current;
    const p2 = phase2Ref.current;
    const p3 = phase3Ref.current;
    if (!p0 || !p1 || !p2 || !p3) return;

    let phase = 0;
    if (progress < 0.26) {
      phase = 0;
    } else if (progress < 0.54) {
      phase = 1;
    } else if (progress < 0.80) {
      phase = 2;
    } else {
      phase = 3;
    }

    // Phase 0: Brand Reveal & 5 Capabilities
    if (phase === 0) {
      p0.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else {
      p0.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 -translate-y-12 scale-95 pointer-events-none invisible";
    }

    // Phase 1: Core Value Proposition & CTAs
    if (phase === 1) {
      p1.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else if (phase < 1) {
      p1.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible";
    } else {
      p1.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 -translate-y-12 scale-95 pointer-events-none invisible";
    }

    // Phase 2: Built Around You & Asset Autonomy
    if (phase === 2) {
      p2.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else if (phase < 2) {
      p2.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible";
    } else {
      p2.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 -translate-y-12 scale-95 pointer-events-none invisible";
    }

    // Phase 3: Final Hero Transition & Sprint CTA
    if (phase === 3) {
      p3.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else {
      p3.className =
        "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible";
    }
  }, []);

  // GSAP ScrollTrigger Integration for Hero Narrative Phases
  useEffect(() => {
    let isDisposed = false;
    let scrollTriggerInstance: any = null;

    Promise.all([
      import("gsap"),
      import("gsap/dist/ScrollTrigger")
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (isDisposed) return;
      gsap.registerPlugin(ScrollTrigger);

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (isDisposed) return;
          updatePhaseDOM(self.progress);
        },
      });

      // Entrance animation for header elements
      const masterTl = gsap.timeline();
      const validCapEls = capabilityRefs.current.filter(Boolean);
      if (validCapEls.length > 0) {
        masterTl.fromTo(
          validCapEls,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: "power2.out",
          },
          "+=0.1"
        );
      }

      if (scrollCueRef.current) {
        masterTl.fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }
    });

    return () => {
      isDisposed = true;
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [updatePhaseDOM]);

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full min-h-[350vh] sm:min-h-[400vh] bg-transparent"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        {/* Ambient Spatial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080A]/90 via-transparent to-[#07080A]/60 z-10 pointer-events-none" />

        {/* ========================================================================= */}
        {/* ACT 01: BRAND REVEAL & FIVE CAPABILITIES (Screen 1 / Phase 0)             */}
        {/* ========================================================================= */}
        <div
          ref={phase0Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
        >
          {/* Cinematic 3D Specular Chrome Wordmark - Bright, Crisp, High Contrast */}
          <div className="w-full max-w-4xl sm:max-w-5xl mx-auto py-2 flex items-center justify-center overflow-hidden px-2">
            <h1 className="text-[clamp(1.85rem,8vw,5.5rem)] font-bold font-poppins tracking-tight uppercase select-none leading-none max-w-full">
              <CinematicChromeTitle text="GROW INVICTA" />
            </h1>
          </div>

          {/* Five Capability Items */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2.5 max-w-5xl select-none">
            {SERVICES.map((srv, idx) => (
              <div
                key={srv.name}
                ref={(el) => {
                  capabilityRefs.current[idx] = el;
                }}
                className="group inline-block cursor-default py-1 transition-all duration-300 ease-out hover:scale-105"
              >
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-200">
                  {srv.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 02: POSITIONING HEADLINE & CALL TO ACTIONS (Screen 2 / Phase 1)       */}
        {/* ========================================================================= */}
        <div
          ref={phase1Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.15rem] font-bold tracking-tight text-[var(--text-primary)] max-w-5xl leading-[1.12] text-balance">
            We build High-converting websites with digital growth solutions
          </h2>

          {/* Strict Monochrome CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/portfolio"
              className="btn-primary w-full sm:w-auto cursor-pointer font-mono text-xs"
            >
              <span>View Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solutions"
              className="btn-secondary w-full sm:w-auto cursor-pointer font-mono text-xs"
            >
              <span>Explore Solutions</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 03: OWNERSHIP & SUPPORT (Screen 3 / Phase 2)                          */}
        {/* ========================================================================= */}
        <div
          ref={phase2Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible"
        >
          <div className="p-8 sm:p-12 bg-[#0a0a0a]/90 backdrop-blur-md border border-[var(--border)] max-w-3xl shadow-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-bold mb-3 block">
              BUILT AROUND YOU
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.15]">
              Built for you. <br />
              Owned by you. <br />
              <span className="text-brand-gradient">Supported by us.</span>
            </h3>
            <p className="mt-5 text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              We build your digital presence without unnecessary lock-in. You retain ownership of your website and digital assets, while our subscription option keeps your website maintained, updated and backed up.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-4 bg-[var(--border-subtle)] border border-[var(--border)] hover:border-[#7C3AED]/50 transition-colors">
                <div className="text-[var(--text-primary)] font-mono text-base font-bold">100%</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Client Ownership</div>
              </div>
              <div className="p-4 bg-[var(--border-subtle)] border border-[var(--border)] hover:border-[#7C3AED]/50 transition-colors">
                <div className="text-[#00D084] font-mono text-base font-bold">ONGOING</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Maintenance &amp; Updates</div>
              </div>
              <div className="p-4 bg-[var(--border-subtle)] border border-[var(--border)] hover:border-[#7C3AED]/50 transition-colors">
                <div className="text-[#7C3AED] font-mono text-base font-bold">YOUR CHOICE</div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 font-medium">Subscription or One-Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 04: FINAL HERO CTA (Screen 4 / Phase 3)                               */}
        {/* ========================================================================= */}
        <div
          ref={phase3Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible"
        >
          <div className="p-8 sm:p-12 bg-[#0a0a0a]/90 backdrop-blur-md border border-[var(--border)] max-w-2xl shadow-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-bold mb-3 block">
              READY WHEN YOU ARE
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-snug">
              From idea to execution. <br />
              <span className="text-brand-gradient">Built to move your business forward.</span>
            </h3>
            <p className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              Websites, AI Search &amp; SEO, social growth, video editing and digital solutions &mdash; built around what your business actually needs.
            </p>
            <div className="mt-8 flex items-center justify-center">
              <Link
                href="/contact?action=quote"
                className="btn-primary font-mono text-xs cursor-pointer shadow-lg"
              >
                <span>GET STARTED ↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Persistent Hero UI Overlay: Single Static SCROLL TO EXPLORE Indicator */}
        <ScrollToExplore innerRef={scrollCueRef} />

        {/* Bottom Pinned Hairline Trust Bar */}
        <div className="absolute bottom-6 left-0 right-0 z-20 px-4 pointer-events-none hidden md:block">
          <div className="max-w-5xl mx-auto flex items-center justify-between py-2.5 px-6 bg-[#0a0a0a]/80 backdrop-blur-md border border-[var(--border)] text-xs text-[var(--text-secondary)] font-mono">
            <div>3–7 Day Express Staging</div>
            <div className="text-zinc-600">/</div>
            <div>100% Asset Ownership</div>
            <div className="text-zinc-600">/</div>
            <div>Written Documentation</div>
            <div className="text-zinc-600">/</div>
            <div>30 Days Post-Launch QA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
