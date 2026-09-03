"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import "./AccordionGallery.css";

export interface AccordionGalleryItem {
  image: string;
  label?: string;
  category?: string;
  link?: string;
  alt?: string;
}

export interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: "hover" | "click";
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
}

export default function AccordionGallery({
  items,
  defaultIndex = 2,
  accentColor = "#FF6A00",
  overlayColor = "#07080A",
  textColor = "#FFFFFF",
  height = 520,
  gap = 14,
  radius = 12,
  expandRatio = 0.48,
  orientation = "horizontal",
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.45,
  tilt = 6,
  stagger = 0.05,
  trigger = "hover",
  showLabels = true,
  grayscale = true,
  className = "",
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const ctaRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<any>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(400);

  const vertical = orientation === "vertical";
  const count = items.length;
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0))
  );

  const applyLayout = useCallback(
    async (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length || count === 0) return;

      const prefersReduced =
        typeof window !== "undefined" && window.matchMedia
          ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
          : false;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      const { gsap } = await import("gsap");

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];
        const cta = ctaRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(
          panel,
          { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease },
          0
        );

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 0.85) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              "--ag-gray": gray,
              "--ag-dim": isActive ? 0 : 0.45,
              duration: dur,
              ease,
            },
            0
          );
        }

        if (showLabels && (bar || text || cta)) {
          const labelElements = [bar, text, cta].filter(Boolean);
          if (isActive) {
            tl.to(
              labelElements,
              {
                opacity: 1,
                x: 0,
                duration: dur,
                ease,
                stagger: prefersReduced ? 0 : stagger,
              },
              0
            );
          } else {
            tl.to(
              labelElements,
              {
                opacity: 0,
                x: -12,
                duration: dur * 0.5,
                ease,
              },
              0
            );
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(
        180,
        usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.25
      );
      mediaSizeRef.current = size;
      el.style.setProperty("--ag-media-size", `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const handleEnter = (i: number) => {
    if (trigger === "hover") setActive(i);
  };

  const handleClick = (i: number) => {
    setActive(i);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${
        vertical ? " accordion-gallery--vertical" : ""
      }${className ? ` ${className}` : ""}`}
      style={{
        ["--ag-accent" as any]: accentColor,
        ["--ag-overlay" as any]: overlayColor,
        ["--ag-text" as any]: textColor,
        ["--ag-gap" as any]: `${gap}px`,
        ["--ag-radius" as any]: `${radius}px`,
        height: vertical ? `${Math.round(height * 1.5)}px` : `${height}px`,
      }}
      role="list"
      aria-label="Portfolio accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <div
            key={item.label || i}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            style={{ borderRadius: `${radius}px` }}
            onClick={() => handleClick(i)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
          >
            {/* Visual Frame */}
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(el) => {
                  mediaRefs.current[i] = el;
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt || item.label || ""}
                  draggable="false"
                  loading="lazy"
                />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            {/* Top Subtle Status Badge */}
            <div className="ag-panel__top-badge">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-[var(--border)] text-[var(--text-secondary)]">
                {item.category || "Web Architecture"}
              </span>
              {isActive && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Platform
                </span>
              )}
            </div>

            {/* Bottom Reveal Caption */}
            {showLabels && (
              <div className="ag-panel__label" aria-hidden="true">
                <div className="ag-panel__info">
                  <span
                    className="ag-panel__bar"
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                  />
                  <div
                    className="ag-panel__text-wrapper"
                    ref={(el) => {
                      textRefs.current[i] = el;
                    }}
                  >
                    <span className="ag-panel__text">{item.label}</span>
                    <span className="ag-panel__subtext">
                      {item.link ? item.link.replace("https://", "") : "100% Client Ownership"}
                    </span>
                  </div>
                </div>

                {/* External Action Button */}
                {item.link && (
                  <div
                    className="ag-panel__cta"
                    ref={(el) => {
                      ctaRefs.current[i] = el;
                    }}
                  >
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--border)] hover:bg-[var(--border-hover)] backdrop-blur-md border border-[var(--border)] text-xs font-mono font-semibold text-[var(--text-primary)] tracking-wider uppercase transition-all duration-200 hover:scale-105"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Visit Site</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-orange-400" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
