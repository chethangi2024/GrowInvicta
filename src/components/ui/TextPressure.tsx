"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
}

export default function TextPressure({
  text = "GROW INVICTA",
  fontFamily = "Compressa VF",
  fontUrl = "https://res.cloudinary.com/drh9ymg7y/raw/upload/v1731497972/CompressaPRO-GX_b9axqi.woff2",
  width = true,
  weight = true,
  italic = false,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = "#FFFFFF",
  strokeColor = "#FFFFFF",
  className = "",
  minFontSize = 36,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const chars = text.split("");

  // Load custom variable font if provided
  useEffect(() => {
    if (!fontUrl) {
      setIsFontLoaded(true);
      return;
    }

    const fontFaceName = fontFamily.replace(/['"]/g, "");
    const font = new FontFace(fontFaceName, `url(${fontUrl}) format('woff2')`, {
      style: "normal",
      weight: "100 900",
      display: "swap",
    });

    font
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        setIsFontLoaded(true);
      })
      .catch((err) => {
        console.warn("TextPressure font loading fallback:", err);
        setIsFontLoaded(true);
      });
  }, [fontFamily, fontUrl]);

  // Handle responsive font sizing
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerWidth, height: containerHeight } =
      containerRef.current.getBoundingClientRect();

    if (containerWidth <= 0) return;

    let calculatedFontSize = containerWidth / (chars.length / 1.5);
    calculatedFontSize = Math.max(calculatedFontSize, minFontSize);

    setFontSize(calculatedFontSize);
    setScaleY(1);
    setLineHeight(1);
  }, [chars.length, minFontSize]);

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [setSize]);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        cursorRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // RAF loop for smooth variable font dynamics
  useEffect(() => {
    let animationFrameId: number;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updatePressure = () => {
      if (prefersReducedMotion) {
        spansRef.current.forEach((span) => {
          if (!span) return;
          span.style.fontVariationSettings = `'wght' 700, 'wdth' 100`;
          span.style.color = textColor;
        });
        return;
      }

      // Smooth cursor lerp
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 12;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 12;

      const titleEl = titleRef.current;
      if (!titleEl) {
        animationFrameId = requestAnimationFrame(updatePressure);
        return;
      }

      const titleRect = titleEl.getBoundingClientRect();
      const maxDistance = titleRect.width * 0.75 || 400;

      spansRef.current.forEach((span) => {
        if (!span) return;

        const spanRect = span.getBoundingClientRect();
        const charCenter = {
          x: spanRect.left + spanRect.width / 2,
          y: spanRect.top + spanRect.height / 2,
        };

        const distance = Math.hypot(
          mouseRef.current.x - charCenter.x,
          mouseRef.current.y - charCenter.y
        );

        // Normalize distance (0 when cursor is right over letter, 1 when far)
        const normalized = Math.min(Math.max(distance / maxDistance, 0), 1);
        const intensity = 1 - normalized; // 1 at center, 0 at outer edges

        // Weight: 300 to 900
        const charWeight = weight ? Math.round(300 + intensity * 600) : 700;

        // Width: 80% to 125%
        const charWidth = width ? Math.round(80 + intensity * 45) : 100;

        // Italic: strictly false as per design instruction
        const charItalic = italic ? Math.round(intensity * 10) : 0;

        const fontVariationSettings = `'wght' ${charWeight}, 'wdth' ${charWidth}${
          italic ? `, 'ital' ${charItalic}` : ""
        }`;

        span.style.fontVariationSettings = fontVariationSettings;
        span.style.color = textColor;

        if (alpha) {
          span.style.opacity = `${0.5 + intensity * 0.5}`;
        }
      });

      animationFrameId = requestAnimationFrame(updatePressure);
    };

    animationFrameId = requestAnimationFrame(updatePressure);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, weight, italic, alpha, textColor]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-transparent select-none ${className}`}
      style={{
        fontFamily: isFontLoaded
          ? `${fontFamily.replace(/['"]/g, "")}, var(--font-poppins), sans-serif`
          : "var(--font-poppins), sans-serif",
      }}
    >
      <style>{`
        .text-pressure-title {
          font-optical-sizing: auto;
        }
        .stroke span {
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>
      <h1
        ref={titleRef}
        className={`text-pressure-title ${
          flex ? "flex justify-between items-center" : "inline-block"
        } ${stroke ? "stroke" : ""} uppercase tracking-normal w-full m-0 p-0 text-center leading-none`}
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: "center center",
          fontWeight: 700,
        }}
      >
        {chars.map((char, index) => (
          <span
            key={index}
            ref={(el) => {
              spansRef.current[index] = el;
            }}
            data-char={char}
            className="inline-block transition-transform duration-75 text-[var(--text-primary)]"
            style={{
              color: textColor,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
}
