"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const TOTAL_FRAMES = 240;

function getFramePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/hero-frames/ezgif-frame-${padded}.jpg`;
}

const WORDMARK_LETTERS = [
  { char: "G", space: false },
  { char: "R", space: false },
  { char: "O", space: false },
  { char: "W", space: true },
  { char: "I", space: false },
  { char: "N", space: false },
  { char: "V", space: false },
  { char: "I", space: false },
  { char: "C", space: false },
  { char: "T", space: false },
  { char: "A", space: false },
];

const SERVICES = [
  { num: "01", name: "WEBSITE DESIGN" },
  { num: "02", name: "SEO & AI SEARCH OPTIMIZATION" },
  { num: "03", name: "BUSINESS GROWTH & SOCIAL MEDIA" },
  { num: "04", name: "VIDEO EDITING" },
  { num: "05", name: "CREATIVE & BRANDING" },
];

export default function ScrollytellingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameObjRef = useRef<{ frame: number }>({ frame: 0 });

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lightRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const capabilityRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);
  const wordmarkTimelineRef = useRef<any>(null);

  const [isInitialReady, setIsInitialReady] = useState<boolean>(true);
  const [activePhase, setActivePhase] = useState<number>(0);

  // Draw frame on canvas with aspect ratio cover and seamless background blend
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clampedIndex = Math.min(Math.max(Math.round(frameIndex), 0), TOTAL_FRAMES - 1);
    const img = imagesRef.current[clampedIndex] || imagesRef.current[0];
    const width = canvas.width;
    const height = canvas.height;

    // Clear background to pure near-black
    ctx.fillStyle = "#050505";
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
        offsetY = (height - drawHeight) / 2;
      } else {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetY = (width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Vignette overlay for seamless edge blending into #050505
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.25,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.65
      );
      gradient.addColorStop(0, "rgba(5, 5, 5, 0)");
      gradient.addColorStop(0.7, "rgba(5, 5, 5, 0.6)");
      gradient.addColorStop(1, "rgba(5, 5, 5, 0.95)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
  }, []);

  // Preload images
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (!isMounted) return;
      images[0] = firstImg;
      setIsInitialReady(true);
      drawFrame(0);
    };
    firstImg.onerror = () => {
      if (!isMounted) return;
      setIsInitialReady(true);
    };

    // Load remaining frames asynchronously
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (!isMounted) return;
        images[i - 1] = img;
      };
    }

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Setup GSAP Sequential Wordmark Letter Animation (G -> R -> O -> W -> I -> N -> V -> I -> C -> T -> A)
  const triggerWordmarkAnimation = useCallback(() => {
    import("gsap").then(({ gsap }) => {
      if (wordmarkTimelineRef.current) {
        wordmarkTimelineRef.current.kill();
      }

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      wordmarkTimelineRef.current = tl;

      // Sequential light sweep across each letter
      lightRefs.current.forEach((lightEl, i) => {
        if (!lightEl) return;
        const letterEl = letterRefs.current[i];
        const offset = i * 0.16;

        tl.to(
          lightEl,
          {
            opacity: 1,
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          },
          offset
        )
        .to(
          letterEl,
          {
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.85)) drop-shadow(0 0 20px rgba(224,40,125,0.4))",
            duration: 0.2,
          },
          offset
        )
        .to(
          lightEl,
          {
            opacity: 0,
            scale: 1,
            duration: 0.22,
            ease: "power2.in",
          },
          offset + 0.18
        )
        .to(
          letterEl,
          {
            filter: "none",
            duration: 0.22,
          },
          offset + 0.18
        );
      });
    });
  }, []);

  // Initial Entrance Animation on Page Load
  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const masterTl = gsap.timeline();

      // 1. Clean emerging entrance of wordmark from darkness
      const validLetterEls = letterRefs.current.filter(Boolean);
      if (validLetterEls.length > 0) {
        masterTl.fromTo(
          validLetterEls,
          { opacity: 0, filter: "blur(10px)", y: 12 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "power3.out",
          }
        );
      }

      // 2. Animate Eyebrow & Capabilities on Website Open
      if (eyebrowRef.current) {
        masterTl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );
      }

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
          "-=0.3"
        );
      }

      // 3. Reveal Scroll to Explore Indicator
      if (scrollCueRef.current) {
        masterTl.fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }

      // 4. Trigger sequential edge-light sweep
      triggerWordmarkAnimation();
    });
  }, [triggerWordmarkAnimation]);

  // Setup GSAP ScrollTrigger safely via dynamic import
  useEffect(() => {
    let scrollTriggerInstance: any = null;
    let isCancelled = false;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      drawFrame(frameObjRef.current.frame);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

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
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetFrame = Math.min(
            Math.floor(progress * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          );
          frameObjRef.current.frame = targetFrame;
          drawFrame(targetFrame);

          // 4 Continuous Narrative Phases
          if (progress < 0.22) {
            setActivePhase(0);
          } else if (progress < 0.50) {
            setActivePhase(1);
          } else if (progress < 0.75) {
            setActivePhase(2);
          } else {
            setActivePhase(3);
          }
        },
      });
    }).catch((err) => {
      console.warn("GSAP ScrollTrigger initialization fallback:", err);
    });

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", resizeCanvas);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [drawFrame]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[350vh] sm:min-h-[400vh] bg-[#050505]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-[#050505]/70 z-10 pointer-events-none" />

        {/* ========================================================================= */}
        {/* ACT 01: BRAND REVEAL & FIVE CAPABILITIES (Screen 1 / Phase 0)             */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 ${
            activePhase === 0
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
              : "opacity-0 -translate-y-12 scale-95 pointer-events-none invisible"
          }`}
        >
          {/* Sequential Edge-Light Tracing Wordmark (G -> R -> O -> W -> I -> N -> V -> I -> C -> T -> A) */}
          <div
            onMouseEnter={triggerWordmarkAnimation}
            className="select-none cursor-default py-2 inline-flex items-center justify-center flex-wrap"
          >
            <h1 className="sr-only">GROW INVICTA</h1>
            <div className="flex items-center justify-center flex-wrap" aria-hidden="true">
              {WORDMARK_LETTERS.map((item, index) => (
                <span
                  key={index}
                  ref={(el) => { letterRefs.current[index] = el; }}
                  className={`relative inline-block text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black uppercase leading-[0.9] ${
                    item.space ? "mr-4 sm:mr-8" : "mr-0.5 sm:mr-1"
                  }`}
                  style={{
                    letterSpacing: "-0.03em",
                  }}
                >
                  {/* Clean Silver-White Fill */}
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 block transition-all duration-200">
                    {item.char}
                  </span>

                  {/* Travelling Sequential Edge-Light Border Contour */}
                  <span
                    ref={(el) => { lightRefs.current[index] = el; }}
                    className="absolute inset-[-2px] z-20 pointer-events-none rounded-[2px] opacity-0"
                    style={{
                      border: "1.5px solid rgba(255, 255, 255, 0.9)",
                      boxShadow: "0 0 12px rgba(255, 255, 255, 0.85), inset 0 0 8px rgba(224, 40, 125, 0.4)",
                    }}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Capability Eyebrow */}
          <div
            ref={eyebrowRef}
            className="mt-8 mb-4 flex items-center justify-center gap-3"
          >
            <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-zinc-700" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-400 font-medium">
              We build &amp; grow digital presences through
            </span>
            <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-zinc-700" />
          </div>

          {/* Five Capability Items (No Links, No Clicks — Subtle Zoom & Highlight on Hover) */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2.5 max-w-5xl select-none">
            {SERVICES.map((srv, idx) => (
              <div
                key={srv.name}
                ref={(el) => { capabilityRefs.current[idx] = el; }}
                className="group inline-block cursor-default py-1 transition-all duration-300 ease-out hover:scale-105"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 group-hover:text-white font-mono text-[10px] transition-colors duration-200">
                    {srv.num}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.75)] transition-all duration-200">
                    {srv.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Elevated SCROLL TO EXPLORE Indicator (Comfortably Visible in Lower-Third) */}
          <div
            ref={scrollCueRef}
            className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
              <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase font-semibold">
                SCROLL
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gi-purple via-gi-magenta to-gi-orange uppercase font-bold">
                TO EXPLORE
              </span>
              <div className="w-[1px] h-7 bg-gradient-to-b from-gi-magenta via-gi-orange to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 02: POSITIONING HEADLINE & CALL TO ACTIONS (Screen 2 / Phase 1)       */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-700 ${
            activePhase === 1
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
              : activePhase < 1
              ? "opacity-0 translate-y-12 scale-95 pointer-events-none invisible"
              : "opacity-0 -translate-y-12 scale-95 pointer-events-none invisible"
          }`}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.15rem] font-bold tracking-tight text-white max-w-5xl leading-[1.12] text-balance">
            We build High-converting websites with Google and AI search optimizations, backed by digital growth solutions.
          </h2>

          {/* Strict Monochrome CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/contact"
              className="btn-primary w-full sm:w-auto cursor-pointer"
            >
              <span>Book a Free 30-Min Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solutions"
              className="btn-secondary w-full sm:w-auto cursor-pointer"
            >
              <span>Explore Solutions</span>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-2 text-[11px] text-zinc-500 uppercase tracking-widest font-mono">
            <span>Scroll to continue</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 03: THE GROW INVICTA PHILOSOPHY (Screen 3 / Phase 2)                  */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 ${
            activePhase === 2
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
              : activePhase < 2
              ? "opacity-0 translate-y-12 scale-95 pointer-events-none invisible"
              : "opacity-0 -translate-y-12 scale-95 pointer-events-none invisible"
          }`}
        >
          <div className="p-8 sm:p-12 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/[0.12] max-w-3xl shadow-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gradient font-bold mb-3 block">
              The Grow Invicta Philosophy
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              You own your code. <br /><span className="text-brand-gradient">You own your assets.</span>
            </h3>
            <p className="mt-4 text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
              No hidden dependencies. No inflated hosting markups. Every sprint is designed to empower your business with complete source code, Super Admin access, and written administration guides.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="p-4 bg-white/[0.02] border border-white/[0.08] hover:border-gi-magenta/40 transition-colors">
                <div className="text-white font-mono text-sm font-bold">3–7 Days</div>
                <div className="text-xs text-zinc-400 mt-0.5">Express Staging</div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/[0.08] hover:border-gi-magenta/40 transition-colors">
                <div className="text-white font-mono text-sm font-bold">100%</div>
                <div className="text-xs text-zinc-400 mt-0.5">Client Ownership</div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/[0.08] hover:border-gi-magenta/40 transition-colors col-span-2 sm:col-span-1">
                <div className="text-white font-mono text-sm font-bold">$0</div>
                <div className="text-xs text-zinc-400 mt-0.5">Agency Markup</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 04: HANDOVER TARGET (Screen 4 / Phase 3)                              */}
        {/* ========================================================================= */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-700 ${
            activePhase === 3
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
              : "opacity-0 translate-y-12 scale-95 pointer-events-none invisible"
          }`}
        >
          <div className="p-8 sm:p-12 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/[0.12] max-w-2xl shadow-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gradient font-bold mb-3 block">
              Day 10 Handover Target
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Rapid execution without compromising engineering quality.
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-zinc-300">
              Explore our 4 operational guarantees and 8 core digital solutions below.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/contact"
                className="btn-primary cursor-pointer"
              >
                <span>Schedule Free Call</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Pinned Hairline Trust Bar */}
        <div className="absolute bottom-6 left-0 right-0 z-20 px-4 pointer-events-none hidden md:block">
          <div className="max-w-5xl mx-auto flex items-center justify-between py-2.5 px-6 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/[0.1] text-xs text-zinc-300 font-mono">
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
