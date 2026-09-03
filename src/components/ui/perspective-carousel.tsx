"use client";

import * as React from "react";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PerspectiveCarouselItem {
  src: string;
  title: string;
  url: string;
  category?: string;
  alt?: string;
}

export interface PerspectiveCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: PerspectiveCarouselItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  loop?: boolean;
  slideWidth?: number;
  rotationStep?: number;
  inactiveScale?: number;
  transition?: Transition;
  showControls?: boolean;
  showDots?: boolean;
  viewportClassName?: string;
  slideClassName?: string;
  imageClassName?: string;
  labelClassName?: string;
  controlsClassName?: string;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.12,
  duration: 0.85,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function PerspectiveCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  loop = true,
  slideWidth = 440,
  rotationStep = 36,
  inactiveScale = 0.82,
  transition = DEFAULT_TRANSITION,
  showControls = true,
  showDots = true,
  viewportClassName,
  slideClassName,
  imageClassName,
  labelClassName,
  controlsClassName,
  className,
  onKeyDown,
  tabIndex,
  ...props
}: PerspectiveCarouselProps) {
  const maxIndex = Math.max(0, items.length - 1);
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(() =>
    clamp(defaultActiveIndex, 0, maxIndex)
  );
  const currentIndex = clamp(activeIndex ?? uncontrolledIndex, 0, maxIndex);
  const safeSlideWidth = Math.max(280, slideWidth);
  const safeInactiveScale = clamp(inactiveScale, 0.5, 1);

  const selectSlide = React.useCallback(
    (nextIndex: number) => {
      if (!items.length) return;

      const resolvedIndex = loop
        ? (nextIndex + items.length) % items.length
        : clamp(nextIndex, 0, maxIndex);

      if (activeIndex === undefined) {
        setUncontrolledIndex(resolvedIndex);
      }

      onActiveIndexChange?.(resolvedIndex);
    },
    [activeIndex, items.length, loop, maxIndex, onActiveIndexChange]
  );

  if (!items.length) {
    return null;
  }

  const isPreviousDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === maxIndex;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(currentIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(currentIndex + 1);
    }
  };

  const currentItem = items[currentIndex];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="3D Perspective Client Websites Carousel"
      tabIndex={tabIndex ?? 0}
      onKeyDown={handleKeyDown}
      className={cn("relative isolate w-full pt-1 pb-4 select-none", className)}
      {...props}
    >
      {/* 3D Perspective Stage Container */}
      <div
        className={cn(
          "relative w-full h-[320px] sm:h-[350px] md:h-[370px] overflow-hidden flex items-center justify-center",
          viewportClassName
        )}
        style={{ perspective: "1400px" }}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 flex w-fit -translate-y-1/2 items-center"
          animate={{ x: -(currentIndex * safeSlideWidth + safeSlideWidth / 2) }}
          transition={transition}
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index;
            const diff = index - currentIndex;

            return (
              <div
                key={`${item.src}-${index}`}
                className="shrink-0 px-2 sm:px-4"
                style={{ width: safeSlideWidth, perspective: "1400px" }}
              >
                <motion.div
                  className={cn(
                    "flex w-full flex-col items-center gap-4 will-change-transform",
                    slideClassName
                  )}
                  animate={{
                    rotateY: -diff * rotationStep,
                    scale: isActive ? 1 : safeInactiveScale,
                    opacity: Math.abs(diff) > 2 ? 0.25 : isActive ? 1 : 0.65,
                    zIndex: isActive ? 30 : 20 - Math.abs(diff),
                  }}
                  transition={transition}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Website Browser Frame */}
                  <div
                    onClick={() => selectSlide(index)}
                    className={cn(
                      "group relative aspect-[16/10] w-full cursor-pointer rounded-[4px] border overflow-hidden transition-all duration-300",
                      isActive
                        ? "border-[var(--border-hover)] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(139,92,246,0.25)] ring-1 ring-[var(--border)]"
                        : "border-[var(--border)] shadow-2xl opacity-85 hover:opacity-100"
                    )}
                  >
                    {/* Top Browser Bar Mockup */}
                    <div className="h-6 w-full bg-[#121216] border-b border-[var(--border)] px-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/60" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                        <div className="w-2 h-2 rounded-full bg-green-500/60" />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] truncate max-w-[180px]">
                        {item.url.replace(/^https?:\/\//, "")}
                      </span>
                      <div className="w-4" />
                    </div>

                    {/* Screenshot Preview */}
                    <div className="relative w-full h-[calc(100%-1.5rem)] bg-[var(--section-bg)]">
                      <Image
                        src={item.src}
                        alt={item.alt ?? item.title}
                        fill
                        sizes="(max-width: 768px) 320px, 480px"
                        priority={isActive}
                        className={cn(
                          "object-cover object-top select-none transition-transform duration-500 group-hover:scale-105",
                          imageClassName
                        )}
                      />
                      {/* Dark overlay for inactive slides */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-black/40 transition-opacity" />
                      )}
                    </div>
                  </div>

                  {/* Slide Title & Quick Info */}
                  <motion.div
                    className={cn(
                      "flex flex-col items-center gap-1 text-center",
                      labelClassName
                    )}
                    animate={{
                      filter: isActive ? "blur(0px)" : "blur(1px)",
                      opacity: isActive ? 1 : 0.4,
                    }}
                    transition={transition}
                  >
                    <span className="text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-tight">
                      {item.title}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] font-mono">
                      {item.category || item.url.replace(/^https?:\/\//, "")}
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Active Item Live Action Bar */}
      {currentItem && (
        <motion.div
          key={currentItem.url}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <a
            href={currentItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-2.5 px-6 font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span>Visit Live Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            Direct client production deployment &bull; 100% Client Owned
          </span>
        </motion.div>
      )}

      {/* Carousel Navigation Controls */}
      {showControls && (
        <div
          className={cn(
            "mx-auto flex w-fit items-center justify-center gap-4 rounded-full border border-[var(--border)] bg-[var(--section-bg)]/90 px-3 py-1.5 text-[var(--text-primary)] shadow-2xl backdrop-blur-md",
            controlsClassName
          )}
        >
          <button
            type="button"
            aria-label="Show previous client website"
            disabled={isPreviousDisabled}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
            onClick={() => selectSlide(currentIndex - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {showDots && (
            <div className="flex items-center justify-center gap-1.5 px-2">
              {items.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  aria-current={currentIndex === index ? "true" : undefined}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    currentIndex === index
                      ? "w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      : "w-1.5 bg-white/30 hover:bg-white/60"
                  )}
                  onClick={() => selectSlide(index)}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            aria-label="Show next client website"
            disabled={isNextDisabled}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
            onClick={() => selectSlide(currentIndex + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default PerspectiveCarousel;
