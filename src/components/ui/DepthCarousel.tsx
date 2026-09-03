"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, ExternalLink, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import "./DepthCarousel.css";

export interface DepthCarouselItem {
  image: string;
  title: string;
  url: string;
  category?: string;
  alt?: string;
}

export interface DepthCarouselProps {
  items: DepthCarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: "left" | "right";
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  onChange?: (index: number, item: DepthCarouselItem) => void;
  className?: string;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export const DepthCarousel: React.FC<DepthCarouselProps> = ({
  items = [],
  cardWidth = 620,
  cardHeight = 346,
  radius = 12,
  tint = "#15100b",
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = "right",
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  duration = 650,
  ease = "power3.out",
  autoplay = true,
  autoplayDelay = 3500,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = "",
}) => {
  const data = useMemo(() => items, [items]);
  const count = data.length;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const posRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleRef = useRef(1);
  const containerWidthRef = useRef(1200);
  const cfgRef = useRef<any>({});
  const onChangeRef = useRef(onChange);

  const dragRef = useRef<{
    x: number;
    startPos: number;
    lastX: number;
    lastT: number;
    v: number;
    moved: boolean;
    id: number;
  } | null>(null);

  const wheelTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoTimerRef = useRef<number | null>(null);
  const reducedRef = useRef(false);

  const [active, setActive] = useState(0);

  onChangeRef.current = onChange;
  cfgRef.current = {
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    cardHeight,
    autoplayDelay,
  };

  const layout = useCallback((pos: number) => {
    const cfg = cfgRef.current;
    const n = cfg.count;
    if (!n) return;
    const dir = cfg.tiltDirection === "left" ? -1 : 1;
    const sc = scaleRef.current;
    const containerW = containerWidthRef.current;

    // Adapt visible cards and spread for tablet/mobile to prevent horizontal clipping
    let maxVisible = cfg.visibleCards;
    let actualSpread = cfg.spread;
    let actualDepth = cfg.depth;

    if (containerW < 640) {
      maxVisible = 1.5;
      actualSpread = Math.min(30, cfg.spread * 0.35);
      actualDepth = Math.min(140, cfg.depth * 0.65);
    } else if (containerW < 1024) {
      maxVisible = 2.5;
      actualSpread = Math.min(60, cfg.spread * 0.7);
      actualDepth = Math.min(180, cfg.depth * 0.85);
    }

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      let d = i - pos;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }

      const back = Math.max(0, d);
      const az = Math.abs(d);
      const shown = az <= maxVisible + 0.5;

      const tz = -actualDepth * d;
      const tx = dir * actualSpread * d;
      const ry = dir * cfg.tilt * clamp(d, -1, 1);

      let opacity = d < 0 ? Math.max(0, 1 + d * 1.5) : 1;
      if (!shown) opacity = 0;

      const brightness = Math.max(0.18, 1 - back * cfg.falloff);
      const blurPx =
        cfg.blur > 0
          ? Math.min(cfg.blur, (back / Math.max(1, maxVisible)) * cfg.blur)
          : 0;
      const zi = Math.round(2000 - d * 20);

      el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(
        2
      )}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = `brightness(${brightness.toFixed(
        3
      )}) blur(${blurPx.toFixed(2)}px)`;
      el.style.zIndex = String(zi);
      el.style.pointerEvents = shown && opacity > 0.1 ? "auto" : "none";

      const ov = overlayRefs.current[i];
      if (ov) ov.style.opacity = clamp(back * cfg.falloff * 1.4, 0, 0.88).toFixed(3);
    }
  }, []);

  const notify = useCallback(
    (idx: number) => {
      setActive(idx);
      onChangeRef.current?.(idx, data[idx]);
    },
    [data]
  );

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill();
      const cfg = cfgRef.current;
      const proxy = { p: posRef.current };
      const dur = animate && !reducedRef.current ? cfg.duration / 1000 : 0;
      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          const n = cfg.count;
          if (n > 0) posRef.current = ((posRef.current % n) + n) % n;
          layout(posRef.current);
        },
      });
    },
    [layout]
  );

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const cfg = cfgRef.current;
      const n = cfg.count;
      if (!n) return;
      const idx = cfg.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
      let delta = idx - posRef.current;
      if (cfg.loop && n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }
      tweenTo(posRef.current + delta, animate);
      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [tweenTo, notify]
  );

  const navigateBy = useCallback(
    (step: number) => setFocus(focusRef.current + step, true),
    [setFocus]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      containerWidthRef.current = w;
      const cfg = cfgRef.current;
      
      // Responsive scale calculation
      let calculatedScale = 1;
      if (w < 640) {
        calculatedScale = clamp((w - 24) / cfg.cardWidth, 0.48, 0.88);
      } else if (w < 1024) {
        calculatedScale = clamp((w - 60) / (cfg.cardWidth + 120), 0.65, 0.95);
      } else {
        const needed = cfg.cardWidth + Math.abs(cfg.spread) * 2 + 100;
        calculatedScale = clamp(w / needed, 0.8, 1);
      }
      scaleRef.current = calculatedScale;
      layout(posRef.current);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [layout]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const cfg = cfgRef.current;
      if (cfg.count < 2) return;
      // Only hijack horizontal or strong wheel events inside carousel
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5) {
        e.preventDefault();
        tweenRef.current?.kill();
        const delta = e.deltaX;
        const step = clamp(delta / (cfg.cardWidth * 0.9), -0.6, 0.6);
        posRef.current += step;
        layout(posRef.current);
        if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
        wheelTimerRef.current = setTimeout(
          () => setFocus(Math.round(posRef.current), true),
          130
        );
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [layout, setFocus]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const cfg = cfgRef.current;
    if (cfg.count < 2) return;
    tweenRef.current?.kill();
    dragRef.current = {
      x: e.clientX,
      startPos: posRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: e.pointerId,
    };
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const cfg = cfgRef.current;
      const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 50);
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 5) {
        drag.moved = true;
        rootRef.current?.setPointerCapture(drag.id);
      }
      if (!drag.moved) return;
      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.v = (e.clientX - drag.lastX) / dt;
      drag.lastX = e.clientX;
      drag.lastT = now;
      posRef.current = drag.startPos - dx / stepPx;
      layout(posRef.current);
    },
    [layout]
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const cfg = cfgRef.current;
    const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 50);
    const projected = posRef.current - (drag.v * 180) / stepPx;
    setFocus(Math.round(projected), true);
  }, [setFocus]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateBy(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy]
  );

  const onCardClick = useCallback(
    (index: number) => {
      if (dragRef.current?.moved) return;
      setFocus(index, true);
    },
    [setFocus]
  );

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!autoplay || reducedRef.current || count < 2) return;
    const root = rootRef.current;
    let hovered = false;
    let focused = false;
    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoTimerRef.current = window.setInterval(() => {
        if (!hovered && !focused) navigateBy(1);
      }, Math.max(cfgRef.current.autoplayDelay, 1000));
    };
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };
    root?.addEventListener("mouseenter", onEnter);
    root?.addEventListener("mouseleave", onLeave);
    root?.addEventListener("focusin", onFocusIn);
    root?.addEventListener("focusout", onFocusOut);
    start();
    return () => {
      stop();
      root?.removeEventListener("mouseenter", onEnter);
      root?.removeEventListener("mouseleave", onLeave);
      root?.removeEventListener("focusin", onFocusIn);
      root?.removeEventListener("focusout", onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  useEffect(() => {
    layout(posRef.current);
  }, [
    layout,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    cardWidth,
    cardHeight,
    radius,
    count,
  ]);

  useEffect(
    () => () => {
      tweenRef.current?.kill();
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    },
    []
  );

  const activeItem = data[active] || data[0];
  const displayDomain = (activeItem?.url || "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  return (
    <div
      ref={rootRef}
      className={cn("depth-carousel", className)}
      style={{ "--dc-perspective": `${perspective}px` } as React.CSSProperties}
      role="group"
      aria-roledescription="carousel"
      aria-label="Grow Invicta Selected Client Portfolio Carousel"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      {/* 3D Depth Stage */}
      <div className="depth-carousel__stage" ref={stageRef}>
        {data.map((item, i) => {
          const itemDomain = item.url
            .replace(/^https?:\/\//, "")
            .replace(/^www\./, "")
            .replace(/\/$/, "");

          return (
            <div
              key={item.url || i}
              className={cn(
                "depth-carousel__card",
                active === i && "is-active"
              )}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${item.title}`}
              aria-hidden={active !== i}
              onClick={() => onCardClick(i)}
            >
              {/* Top Browser Bar */}
              <div className="depth-carousel__chrome select-none">
                <div className="depth-carousel__chrome-dots">
                  <span className="depth-carousel__chrome-dot bg-[#EF4444]" />
                  <span className="depth-carousel__chrome-dot bg-[#F59E0B]" />
                  <span className="depth-carousel__chrome-dot bg-[#10B981]" />
                </div>
                <div className="depth-carousel__chrome-badge">
                  <Lock className="w-2.5 h-2.5 text-[#10B981] shrink-0" />
                  <span className="depth-carousel__chrome-url">
                    {itemDomain}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold hidden sm:inline">
                    Live
                  </span>
                </div>
              </div>

              {/* Image Preview Container */}
              <div className="depth-carousel__img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="depth-carousel__img"
                  src={item.image}
                  alt={item.alt || `${item.title} live platform screenshot`}
                  loading={i < 4 ? "eager" : "lazy"}
                  draggable={false}
                />

                {/* Hover overlay for active card */}
                {active === i && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="depth-carousel__active-hover-btn"
                    aria-label={`Visit live platform: ${item.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#FF6A00]" />
                  </a>
                )}
              </div>

              {/* Receding Depth Tint Overlay */}
              <span
                className="depth-carousel__tint"
                ref={(el) => {
                  overlayRefs.current[i] = el;
                }}
                style={{ background: tint }}
              />
            </div>
          );
        })}
      </div>

      {/* Active Slide Info & Live Link CTA */}
      {activeItem && (
        <div className="depth-carousel__active-info-panel gsap-reveal-header">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF6A00] font-semibold bg-[#FF6A00]/10 px-2 py-0.5 rounded border border-[#FF6A00]/20">
                {activeItem.category || "Production Platform"}
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)] px-1.5 py-0.5 rounded hidden sm:inline">
                100% Client Owned
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">
              {activeItem.title}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-mono truncate max-w-xs sm:max-w-md mt-0.5">
              {displayDomain}
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={activeItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2.5 px-5 font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2"
            >
              <span>Visit Live Platform</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Controls & Indicators */}
      {(showControls || showIndicators) && count > 1 && (
        <div className="depth-carousel__controls">
          {showControls && (
            <button
              type="button"
              className="depth-carousel__arrow"
              aria-label="Previous portfolio project"
              onClick={() => navigateBy(-1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {showIndicators && (
            <div className="depth-carousel__dots" role="tablist" aria-label="Portfolio projects">
              {data.map((item, i) => (
                <button
                  key={item.url || i}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Go to project ${i + 1}: ${item.title}`}
                  className={cn(
                    "depth-carousel__dot",
                    active === i && "is-active"
                  )}
                  onClick={() => setFocus(i, true)}
                />
              ))}
            </div>
          )}

          {showControls && (
            <button
              type="button"
              className="depth-carousel__arrow"
              aria-label="Next portfolio project"
              onClick={() => navigateBy(1)}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DepthCarousel;

