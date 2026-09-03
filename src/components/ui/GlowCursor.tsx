"use client";

import React, { useRef, useEffect, useCallback } from "react";
import "./GlowCursor.css";

export interface GlowCursorProps {
  children?: React.ReactNode;
  color?: string;
  secondaryColor?: string;
  trailLength?: number;
  trailWidth?: number;
  trailTaper?: number;
  followSpeed?: number;
  glowIntensity?: number;
  glowSpread?: number;
  hotspot?: number;
  brightness?: number;
  opacity?: number;
  pulseSpeed?: number;
  noiseStrength?: number;
  idleFade?: boolean;
  idleTimeout?: number;
  fadeDuration?: number;
  blendMode?: "screen" | "lighten" | "color-dodge" | "plus-lighter" | "normal";
  className?: string;
  style?: React.CSSProperties;
}

interface Point {
  x: number;
  y: number;
}

// Convert hex/rgb string to { r, g, b }
function parseColor(colorStr: string): { r: number; g: number; b: number } {
  if (colorStr.startsWith("#")) {
    let hex = colorStr.slice(1);
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }
  const match = colorStr.match(/\d+/g);
  if (match && match.length >= 3) {
    return {
      r: parseInt(match[0], 10),
      g: parseInt(match[1], 10),
      b: parseInt(match[2], 10),
    };
  }
  return { r: 202, g: 213, b: 215 };
}

export default function GlowCursor({
  children,
  color = "#cad5d7",
  secondaryColor = "#dd780f",
  trailLength = 40,
  trailWidth = 5,
  trailTaper = 0.8,
  followSpeed = 0.16,
  glowIntensity = 1.9,
  glowSpread = 1.2,
  hotspot = 0.65,
  brightness = 1.25,
  opacity = 1,
  pulseSpeed = 1.1,
  noiseStrength = 0.035,
  idleFade = true,
  idleTimeout = 700,
  fadeDuration = 900,
  blendMode = "screen",
  className = "",
  style = {},
}: GlowCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mousePos = useRef<Point>({ x: -1000, y: -1000 });
  const points = useRef<Point[]>([]);
  const isInside = useRef(false);
  const lastMoveTime = useRef(0);
  const currentAlpha = useRef(0);
  const rafId = useRef<number | null>(null);

  const primaryRGB = useRef(parseColor(color));
  const secondaryRGB = useRef(parseColor(secondaryColor));

  useEffect(() => {
    primaryRGB.current = parseColor(color);
    secondaryRGB.current = parseColor(secondaryColor);
  }, [color, secondaryColor]);

  // Handle pointer tracking strictly scoped to container
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePos.current = { x, y };
    isInside.current = true;
    lastMoveTime.current = performance.now();

    // Seed points array on initial entry
    if (points.current.length === 0) {
      points.current = Array.from({ length: trailLength }, () => ({ x, y }));
    }
  }, [trailLength]);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePos.current = { x, y };
    isInside.current = true;
    lastMoveTime.current = performance.now();

    if (points.current.length === 0) {
      points.current = Array.from({ length: trailLength }, () => ({ x, y }));
    }
  }, [trailLength]);

  const handlePointerLeave = useCallback(() => {
    isInside.current = false;
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const resize = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Main animation loop
    const render = (time: number) => {
      rafId.current = requestAnimationFrame(render);

      // Determine target alpha based on presence and idle state
      let targetAlpha = isInside.current ? opacity : 0;

      if (idleFade && isInside.current) {
        const timeSinceMove = time - lastMoveTime.current;
        if (timeSinceMove > idleTimeout) {
          const fadeProgress = Math.min((timeSinceMove - idleTimeout) / fadeDuration, 1);
          targetAlpha = opacity * (1 - fadeProgress);
        }
      }

      // Smooth alpha interpolation
      currentAlpha.current += (targetAlpha - currentAlpha.current) * 0.12;

      // Skip render if invisible to save GPU/CPU cycles
      if (currentAlpha.current < 0.005) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Initialize points if needed
      if (points.current.length === 0) {
        points.current = Array.from({ length: trailLength }, () => ({ ...mousePos.current }));
      }

      const pts = points.current;

      // Update head point towards cursor
      pts[0].x += (mousePos.current.x - pts[0].x) * followSpeed;
      pts[0].y += (mousePos.current.y - pts[0].y) * followSpeed;

      // Update trailing points
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * Math.min(followSpeed * 1.35, 0.45);
        pts[i].y += (pts[i - 1].y - pts[i].y) * Math.min(followSpeed * 1.35, 0.45);
      }

      const pulse = 1 + Math.sin((time / 1000) * pulseSpeed * Math.PI * 2) * 0.08;
      const c1 = primaryRGB.current;
      const c2 = secondaryRGB.current;

      // Draw subtle glow discs along trail from tail to head
      for (let i = pts.length - 1; i >= 0; i--) {
        const progress = 1 - i / pts.length; // 0 (tail) to 1 (head)
        const taper = 1 - (i / pts.length) * trailTaper;
        const radius = Math.max(
          trailWidth * taper * glowSpread * pulse * 7,
          2
        );

        // Micro organic noise offset
        const noiseX = Math.sin(time * 0.003 + i * 0.4) * noiseStrength * 20;
        const noiseY = Math.cos(time * 0.003 + i * 0.4) * noiseStrength * 20;

        const px = pts[i].x + noiseX;
        const py = pts[i].y + noiseY;

        // Blend color between primary and secondary
        const colorBlend = Math.min(Math.max((1 - progress) * 1.2, 0), 1);
        const r = Math.round(c1.r * (1 - colorBlend) + c2.r * colorBlend);
        const g = Math.round(c1.g * (1 - colorBlend) + c2.g * colorBlend);
        const b = Math.round(c1.b * (1 - colorBlend) + c2.b * colorBlend);

        const pointAlpha = currentAlpha.current * Math.pow(progress, 0.75) * (glowIntensity / 1.9) * brightness;

        if (pointAlpha <= 0.001 || radius <= 0) continue;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
        const coreAlpha = Math.min(pointAlpha * hotspot, 1);
        const midAlpha = Math.min(pointAlpha * 0.45, 1);
        const outerAlpha = 0;

        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${coreAlpha})`);
        grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${midAlpha})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${outerAlpha})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connecting soft light filament across trail
      if (pts.length > 2) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          const xc = (pts[i].x + pts[i + 1].x) / 2;
          const yc = (pts[i].y + pts[i + 1].y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
        }
        ctx.strokeStyle = `rgba(${c1.r}, ${c1.g}, ${c1.b}, ${Math.min(currentAlpha.current * 0.4 * brightness, 0.75)})`;
        ctx.lineWidth = Math.max(trailWidth * 0.8 * pulse, 1);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [
    trailLength,
    trailWidth,
    trailTaper,
    followSpeed,
    glowIntensity,
    glowSpread,
    hotspot,
    brightness,
    opacity,
    pulseSpeed,
    noiseStrength,
    idleFade,
    idleTimeout,
    fadeDuration,
  ]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`hero-glow-container glow-cursor-container ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        className="glow-cursor-canvas"
        style={{
          mixBlendMode: blendMode === "normal" ? undefined : blendMode,
        }}
      />
      <div className="glow-cursor-content">{children}</div>
    </div>
  );
}
