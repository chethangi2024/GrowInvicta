"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CinematicChromeTitle from "./CinematicChromeTitle";

const TOTAL_FRAMES = 300;

function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/hero-frames/ezgif-frame-${padded}.jpg`;
}

const SERVICES = [
  { name: "WEBSITE DESIGN" },
  { name: "SEO & AI SEARCH OPTIMIZATION" },
  { name: "BUSINESS GROWTH & SOCIAL MEDIA" },
  { name: "VIDEO EDITING" },
  { name: "CREATIVE & BRANDING" },
];

// Persistent Scroll to Explore Indicator Overlay
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesMapRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingSetRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const phase0Ref = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);

  const capabilityRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  const [isInitialReady, setIsInitialReady] = useState<boolean>(true);
  const cachedGradientRef = useRef<{
    width: number;
    height: number;
    gradient: CanvasGradient | null;
  }>({ width: 0, height: 0, gradient: null });

  // Priority windowed frame loader
  const loadFrame = useCallback((frameIndex: number): Promise<HTMLImageElement | null> => {
    const clamped = Math.min(Math.max(frameIndex, 0), TOTAL_FRAMES - 1);
    if (imagesMapRef.current.has(clamped)) {
      return Promise.resolve(imagesMapRef.current.get(clamped)!);
    }
    if (loadingSetRef.current.has(clamped)) {
      return Promise.resolve(null);
    }

    loadingSetRef.current.add(clamped);
    return new Promise((resolve) => {
      const img = new Image();
      img.src = getFramePath(clamped + 1);
      img.onload = () => {
        imagesMapRef.current.set(clamped, img);
        loadingSetRef.current.delete(clamped);
        resolve(img);
      };
      img.onerror = () => {
        loadingSetRef.current.delete(clamped);
        resolve(null);
      };
    });
  }, []);

  // Preload dynamic window around target frame
  const preloadSurroundingFrames = useCallback((targetFrame: number) => {
    // Window of ±15 frames around target, loading nearest frames first
    const windowSize = 15;
    for (let offset = 1; offset <= windowSize; offset++) {
      const next = targetFrame + offset;
      const prev = targetFrame - offset;
      if (next < TOTAL_FRAMES && !imagesMapRef.current.has(next) && !loadingSetRef.current.has(next)) {
        loadFrame(next);
      }
      if (prev >= 0 && !imagesMapRef.current.has(prev) && !loadingSetRef.current.has(prev)) {
        loadFrame(prev);
      }
    }
  }, [loadFrame]);

  // Find nearest available loaded frame
  const getNearestLoadedFrame = useCallback((targetFrame: number): HTMLImageElement | null => {
    if (imagesMapRef.current.has(targetFrame)) {
      return imagesMapRef.current.get(targetFrame)!;
    }
    // Search outwards for closest cached frame to prevent any blank flicker
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetFrame - offset;
      if (prev >= 0 && imagesMapRef.current.has(prev)) {
        return imagesMapRef.current.get(prev)!;
      }
      const next = targetFrame + offset;
      if (next < TOTAL_FRAMES && imagesMapRef.current.has(next)) {
        return imagesMapRef.current.get(next)!;
      }
    }
    return imagesMapRef.current.get(0) || null;
  }, []);

  // Draw frame on canvas with aspect ratio cover and crisp rendering
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const clampedIndex = Math.min(Math.max(Math.round(frameIndex), 0), TOTAL_FRAMES - 1);
    const img = getNearestLoadedFrame(clampedIndex);
    const width = canvas.width;
    const height = canvas.height;

    // Clear background to pure near-black
    ctx.fillStyle = "#07080A";
    ctx.fillRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Cached Vignette overlay for seamless edge blending into #07080A
      if (
        !cachedGradientRef.current.gradient ||
        cachedGradientRef.current.width !== width ||
        cachedGradientRef.current.height !== height
      ) {
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.28,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.65
        );
        gradient.addColorStop(0, "rgba(7, 8, 10, 0)");
        gradient.addColorStop(0.75, "rgba(7, 8, 10, 0.45)");
        gradient.addColorStop(1, "rgba(7, 8, 10, 0.90)");
        cachedGradientRef.current = { width, height, gradient };
      }

      if (cachedGradientRef.current.gradient) {
        ctx.fillStyle = cachedGradientRef.current.gradient;
        ctx.fillRect(0, 0, width, height);
      }
    }
  }, [getNearestLoadedFrame]);

  // Request Animation Frame batched render
  const scheduleRender = useCallback((targetFrame: number) => {
    currentFrameRef.current = targetFrame;
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(currentFrameRef.current);
      rafIdRef.current = null;
    });
  }, [drawFrame]);

  // Direct DOM Phase state updates to avoid React reconciliation during scroll
  const updatePhaseDOM = useCallback((progress: number) => {
    const p0 = phase0Ref.current;
    const p1 = phase1Ref.current;
    const p2 = phase2Ref.current;
    const p3 = phase3Ref.current;
    if (!p0 || !p1 || !p2 || !p3) return;

    let phase = 0;
    if (progress < 0.22) {
      phase = 0;
    } else if (progress < 0.50) {
      phase = 1;
    } else if (progress < 0.75) {
      phase = 2;
    } else {
      phase = 3;
    }

    // Phase 0
    if (phase === 0) {
      p0.className = "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else {
      p0.className = "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 -translate-y-12 scale-95 pointer-events-none invisible";
    }

    // Phase 1
    if (phase === 1) {
      p1.className = "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else if (phase < 1) {
      p1.className = "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible";
    } else {
      p1.className = "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-0 -translate-y-12 scale-95 pointer-events-none invisible";
    }

    // Phase 2
    if (phase === 2) {
      p2.className = "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else if (phase < 2) {
      p2.className = "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible";
    } else {
      p2.className = "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 -translate-y-12 scale-95 pointer-events-none invisible";
    }

    // Phase 3
    if (phase === 3) {
      p3.className = "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible";
    } else {
      p3.className = "absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 opacity-0 translate-y-12 scale-95 pointer-events-none invisible";
    }
  }, []);

  // Initial Progressive Load: Load frame 0 immediately, then initial buffer in background
  useEffect(() => {
    let isMounted = true;

    // Load first frame immediately for instant LCP
    loadFrame(0).then((img) => {
      if (!isMounted) return;
      setIsInitialReady(true);
      if (img) {
        drawFrame(0);
      }
      // Preload initial buffer window (first 20 frames) asynchronously
      for (let i = 1; i <= 20; i++) {
        loadFrame(i);
      }
    });

    return () => {
      isMounted = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [loadFrame, drawFrame]);

  // Initial Entrance Animation on Page Load
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

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

      // Reveal Scroll to Explore Indicator
      if (scrollCueRef.current) {
        masterTl.fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }
    });
  }, []);

  // Setup GSAP ScrollTrigger safely via dynamic import
  useEffect(() => {
    let scrollTriggerInstance: any = null;
    let isCancelled = false;
    let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Check if width actually changed (ignore height-only address bar changes)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      cachedGradientRef.current.gradient = null;
      drawFrame(currentFrameRef.current);
    };

    resizeCanvas();

    const onResize = () => {
      const currentWidth = window.innerWidth;
      // Only recalculate buffer dimensions if width changes or significant desktop resize
      if (Math.abs(currentWidth - lastWidth) > 5) {
        lastWidth = currentWidth;
        resizeCanvas();
      }
    };

    window.addEventListener("resize", onResize, { passive: true });

    Promise.all([
      import("gsap"),
      import("gsap/dist/ScrollTrigger")
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (isCancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      if (!container) return;

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetFrame = Math.min(
            Math.floor(progress * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          );

          // Priority progressive loading around active frame
          preloadSurroundingFrames(targetFrame);

          // Batch draw through rAF
          scheduleRender(targetFrame);

          // Direct DOM phase updates without triggering React renders
          updatePhaseDOM(progress);
        },
      });
    }).catch((err) => {
      console.warn("GSAP ScrollTrigger initialization fallback:", err);
    });

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", onResize);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [drawFrame, preloadSurroundingFrames, scheduleRender, updatePhaseDOM]);

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full min-h-[350vh] sm:min-h-[400vh] bg-[#07080A]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-700"
          style={{ opacity: isInitialReady ? 1 : 0 }}
        />

        {/* Ambient Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-[#07080A]/80 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080A]/70 via-transparent to-[#07080A]/70 z-10 pointer-events-none" />

        {/* ========================================================================= */}
        {/* ACT 01: BRAND REVEAL & FIVE CAPABILITIES (Screen 1 / Phase 0)             */}
        {/* ========================================================================= */}
        <div
          ref={phase0Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
        >
          {/* Cinematic 3D Metallic Silver/Chrome Wordmark */}
          <div className="w-full max-w-4xl sm:max-w-5xl mx-auto py-2 flex items-center justify-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold font-poppins tracking-tight uppercase select-none leading-none">
              <CinematicChromeTitle text="GROW INVICTA" />
            </h1>
          </div>

          {/* Five Capability Items */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2.5 max-w-5xl select-none">
            {SERVICES.map((srv, idx) => (
              <div
                key={srv.name}
                ref={(el) => { capabilityRefs.current[idx] = el; }}
                className="group inline-block cursor-default py-1 transition-all duration-300 ease-out hover:scale-105"
              >
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.75)] transition-all duration-200">
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
              className="btn-primary w-full sm:w-auto cursor-pointer"
            >
              <span>View Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solutions"
              className="btn-secondary w-full sm:w-auto cursor-pointer"
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
