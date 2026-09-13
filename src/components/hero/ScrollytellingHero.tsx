"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CinematicChromeTitle from "./CinematicChromeTitle";
import CinematicUniverseBackdrop from "./CinematicUniverseBackdrop";

const SERVICES = [
  { name: "WEBSITE DESIGN" },
  { name: "SEO & AI SEARCH OPTIMIZATION" },
  { name: "BUSINESS GROWTH & SOCIAL MEDIA" },
  { name: "VIDEO EDITING" },
  { name: "CREATIVE & BRANDING" },
];

function ScrollToExplore({
  className = "absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2",
  innerRef,
}: {
  className?: string;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={innerRef}
      className={`flex flex-col items-center gap-2 z-30 pointer-events-auto select-none transition-opacity duration-300 ${className}`}
    >
      <div className="flex flex-col items-center gap-1 group cursor-pointer">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--text-secondary)] uppercase font-semibold">
          SCROLL
        </span>
        <span className="text-[9px] font-mono tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gi-purple via-gi-magenta to-gi-orange uppercase font-bold">
          TO EXPLORE
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-gi-magenta via-gi-orange to-transparent animate-pulse" />
      </div>
    </div>
  );
}

export default function ScrollytellingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const universeRef = useRef<HTMLDivElement>(null);

  const phase0Ref = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  const capabilityRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  // Direct DOM Phase updates to avoid React re-renders during scroll
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

    const baseClass =
      "absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto transition-all duration-700 items-center lg:items-start text-center lg:text-left";
    const activeClass = `${baseClass} opacity-100 translate-y-0 scale-100 pointer-events-auto visible`;
    const exitUpClass = `${baseClass} opacity-0 -translate-y-10 scale-95 pointer-events-none invisible`;
    const enterDownClass = `${baseClass} opacity-0 translate-y-10 scale-95 pointer-events-none invisible`;

    // Phase 0: Brand Reveal & 5 Capabilities
    p0.className = phase === 0 ? activeClass : exitUpClass;

    // Phase 1: Core Value Proposition & CTAs
    if (phase === 1) {
      p1.className = activeClass;
    } else if (phase < 1) {
      p1.className = enterDownClass;
    } else {
      p1.className = exitUpClass;
    }

    // Phase 2: Built Around You & Asset Autonomy
    if (phase === 2) {
      p2.className = activeClass;
    } else if (phase < 2) {
      p2.className = enterDownClass;
    } else {
      p2.className = exitUpClass;
    }

    // Phase 3: Final Hero Transition & Sprint CTA
    p3.className = phase === 3 ? activeClass : (phase < 3 ? enterDownClass : exitUpClass);

    // Fade universe celestial elements as user scrolls toward the bottom of the hero
    if (universeRef.current) {
      universeRef.current.style.opacity = Math.max(0, 1 - progress * 1.5).toFixed(3);
    }

    // Fade out "Scroll to explore" cue after initial scroll
    if (scrollCueRef.current) {
      const cueOpacity = Math.max(0, 1 - progress * 4);
      scrollCueRef.current.style.opacity = cueOpacity.toFixed(2);
      scrollCueRef.current.style.pointerEvents = cueOpacity > 0.05 ? "auto" : "none";
    }
  }, []);

  // GSAP ScrollTrigger Integration for Hero Narrative Phases
  useEffect(() => {
    let isDisposed = false;
    let scrollTriggerInstance: any = null;

    Promise.all([
      import("gsap"),
      import("gsap/dist/ScrollTrigger"),
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

      // Hero content renders immediately with no opacity 0 delay
      if (scrollCueRef.current) {
        gsap.fromTo(
          scrollCueRef.current,
          { opacity: 0.7, y: 4 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
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
        {/* Ambient Spatial Depth Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030407]/90 via-transparent to-[#030407]/60 z-10 pointer-events-none" />

        {/* Cinematic Universe Backdrop (Subtle Nebulae, Distant Moon & Exoplanet) */}
        <div ref={universeRef} className="absolute inset-0 pointer-events-none z-0">
          <CinematicUniverseBackdrop />
        </div>

        {/* ========================================================================= */}
        {/* ACT 01: BRAND REVEAL & FIVE CAPABILITIES (Screen 1 / Phase 0)             */}
        {/* ========================================================================= */}
        <div
          ref={phase0Ref}
          className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto transition-all duration-700 pointer-events-auto items-center lg:items-start text-center lg:text-left opacity-100 translate-y-0 scale-100 visible"
        >
          <div className="w-full max-w-xl lg:max-w-[50vw] xl:max-w-[48vw] flex flex-col items-center lg:items-start pt-12 sm:pt-0">
            {/* Cinematic Clean Wordmark - Bright, Solid, Crisp */}
            <div className="w-full py-1">
              <h1 className="text-[clamp(2.0rem,6.5vw,4.85rem)] font-bold font-poppins tracking-tight uppercase select-none leading-[0.94] max-w-full">
                <CinematicChromeTitle text="GROW INVICTA" />
              </h1>
            </div>

            {/* Crisp Strategic Narrative */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[var(--text-secondary)] font-normal max-w-lg leading-relaxed text-balance">
              High-converting Next.js websites, custom WordPress CMS &amp; digital growth systems engineered with express 3–7 day live staging and 100% full asset ownership.
            </p>

            {/* Five Capability Items */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-xl select-none">
              {SERVICES.map((srv, idx) => (
                <div
                  key={srv.name}
                  ref={(el) => {
                    capabilityRefs.current[idx] = el;
                  }}
                  className="group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08] hover:border-[#A855F7]/50 hover:bg-white/[0.06] transition-all duration-200 cursor-default"
                >
                  <span className="w-1 h-1 rounded-full bg-gi-orange opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                  <span className="text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">
                    {srv.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Direct Action Buttons on Phase 0 */}
            <div className="mt-5 sm:mt-7 flex flex-row items-center justify-center lg:justify-start gap-2.5 w-auto">
              <Link
                href="/portfolio"
                className="btn-primary font-mono text-xs cursor-pointer shadow-lg px-3.5 sm:px-4 py-2 sm:py-2.5 text-center"
              >
                <span>View Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5 inline ml-1" />
              </Link>
              <Link
                href="/contact?action=quote"
                className="btn-secondary font-mono text-xs cursor-pointer px-3.5 sm:px-4 py-2 sm:py-2.5 text-center"
              >
                <span>Get A Quote</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 02: POSITIONING HEADLINE & CALL TO ACTIONS (Screen 2 / Phase 1)       */}
        {/* ========================================================================= */}
        <div
          ref={phase1Ref}
          className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto transition-all duration-700 items-center lg:items-start text-center lg:text-left opacity-0 translate-y-10 scale-95 pointer-events-none invisible"
        >
          <div className="w-full max-w-xl lg:max-w-[50vw] xl:max-w-[48vw] flex flex-col items-center lg:items-start">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#A855F7] font-bold mb-3 block">
              ENGINEERED FOR GROWTH
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.65rem] font-bold tracking-tight text-[var(--text-primary)] leading-[1.12] text-balance">
              We build High-converting websites with digital growth solutions
            </h2>

            {/* Strict Monochrome CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/portfolio"
                className="btn-primary w-full sm:w-auto cursor-pointer font-mono text-xs text-center"
              >
                <span>View Portfolio</span>
                <ArrowUpRight className="w-4 h-4 inline ml-1" />
              </Link>
              <Link
                href="/solutions"
                className="btn-secondary w-full sm:w-auto cursor-pointer font-mono text-xs text-center"
              >
                <span>Explore Solutions</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 03: OWNERSHIP & SUPPORT (Screen 3 / Phase 2)                          */}
        {/* ========================================================================= */}
        <div
          ref={phase2Ref}
          className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto transition-all duration-700 items-center lg:items-start text-center lg:text-left opacity-0 translate-y-10 scale-95 pointer-events-none invisible"
        >
          <div className="w-full max-w-xl lg:max-w-[50vw] xl:max-w-[48vw] p-6 sm:p-10 bg-[#0a0a0a]/90 backdrop-blur-md border border-[var(--border)] shadow-2xl rounded-sm">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-bold mb-2.5 block">
              BUILT AROUND YOU
            </span>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.15]">
              Built for you. <br />
              Owned by you. <br />
              <span className="text-brand-gradient">Supported by us.</span>
            </h3>
            <p className="mt-3.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              We build your digital presence without unnecessary lock-in. You retain ownership of your website and digital assets, while our subscription option keeps your website maintained, updated and backed up.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left">
              <div className="p-3 bg-[var(--border-subtle)] border border-[var(--border)] hover:border-[#7C3AED]/50 transition-colors">
                <div className="text-[var(--text-primary)] font-mono text-sm font-bold">100%</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-medium">Client Ownership</div>
              </div>
              <div className="p-3 bg-[var(--border-subtle)] border border-[var(--border)] hover:border-[#7C3AED]/50 transition-colors">
                <div className="text-[#00D084] font-mono text-sm font-bold">ONGOING</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-medium">Maintenance &amp; Updates</div>
              </div>
              <div className="p-3 bg-[var(--border-subtle)] border border-[var(--border)] hover:border-[#7C3AED]/50 transition-colors">
                <div className="text-[#7C3AED] font-mono text-sm font-bold">YOUR CHOICE</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-medium">Subscription or One-Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 04: FINAL HERO CTA (Screen 4 / Phase 3)                               */}
        {/* ========================================================================= */}
        <div
          ref={phase3Ref}
          className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto transition-all duration-700 items-center lg:items-start text-center lg:text-left opacity-0 translate-y-10 scale-95 pointer-events-none invisible"
        >
          <div className="w-full max-w-xl lg:max-w-[50vw] xl:max-w-[48vw] p-6 sm:p-10 bg-[#0a0a0a]/90 backdrop-blur-md border border-[var(--border)] shadow-2xl rounded-sm">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-bold mb-2.5 block">
              READY WHEN YOU ARE
            </span>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-snug">
              From idea to execution. <br />
              <span className="text-brand-gradient">Built to move your business forward.</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Websites, AI Search &amp; SEO, social growth, video editing and digital solutions &mdash; built around what your business actually needs.
            </p>
            <div className="mt-6 flex items-center justify-center lg:justify-start">
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
          <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-6 bg-[#0a0a0a]/80 backdrop-blur-md border border-[var(--border)] text-xs text-[var(--text-secondary)] font-mono">
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
