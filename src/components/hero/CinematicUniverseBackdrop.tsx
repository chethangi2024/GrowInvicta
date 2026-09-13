"use client";

import React, { useEffect, useRef } from "react";
import "./CinematicUniverse.css";

// Deterministic celestial micro-star coordinates (prevents hydration mismatch)
const CELESTIAL_STARS = [
  { top: "18%", left: "14%", size: 1.5, delay: "0s", duration: "4.2s" },
  { top: "24%", left: "42%", size: 1.0, delay: "1.2s", duration: "5.1s" },
  { top: "12%", left: "68%", size: 2.0, delay: "0.5s", duration: "3.8s" },
  { top: "34%", left: "82%", size: 1.2, delay: "2.1s", duration: "6.0s" },
  { top: "62%", left: "18%", size: 1.5, delay: "1.8s", duration: "4.5s" },
  { top: "78%", left: "35%", size: 1.0, delay: "0.8s", duration: "5.5s" },
  { top: "45%", left: "52%", size: 1.8, delay: "2.5s", duration: "4.0s" },
  { top: "82%", left: "64%", size: 1.2, delay: "1.5s", duration: "5.2s" },
  { top: "15%", left: "92%", size: 1.6, delay: "0.2s", duration: "4.8s" },
  { top: "68%", left: "88%", size: 1.0, delay: "2.8s", duration: "6.2s" },
  { top: "88%", left: "12%", size: 1.4, delay: "1.1s", duration: "4.6s" },
  { top: "40%", left: "8%", size: 1.0, delay: "3.1s", duration: "5.8s" },
];

interface CinematicUniverseBackdropProps {
  progress?: number;
}

export default function CinematicUniverseBackdrop({
  progress = 0,
}: CinematicUniverseBackdropProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const parallaxGroupRef = useRef<HTMLDivElement | null>(null);

  // Smooth lerped mouse parallax on desktop (only ticks while moving, sleeps when settled)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    let isDisposed = false;

    const renderParallax = () => {
      if (isDisposed) return;
      const diffX = Math.abs(targetX - currentX);
      const diffY = Math.abs(targetY - currentY);

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (parallaxGroupRef.current) {
        parallaxGroupRef.current.style.transform = `translate3d(${currentX.toFixed(
          2
        )}px, ${currentY.toFixed(2)}px, 0)`;
      }

      // Continue loop only while actively moving; halt when settled to free CPU
      if (diffX > 0.01 || diffY > 0.01) {
        rafId = requestAnimationFrame(renderParallax);
      } else {
        rafId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      targetX = normX * 18;
      targetY = normY * 12;

      if (rafId === null) {
        rafId = requestAnimationFrame(renderParallax);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      isDisposed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Fade out celestial bodies as user scrolls through the hero into following sections
  const universeOpacity = Math.max(0, 1 - progress * 1.6);

  return (
    <div
      ref={containerRef}
      className="cinematic-universe"
      style={{ opacity: universeOpacity }}
      aria-hidden="true"
    >
      {/* Deep Cosmic Nebulae */}
      <div className="cinematic-universe__nebula-indigo" />
      <div className="cinematic-universe__nebula-warm" />
      <div className="cinematic-universe__vignette" />

      {/* Parallax Group for Celestial Objects */}
      <div ref={parallaxGroupRef} className="absolute inset-0 pointer-events-none">
        {/* Celestial Body 1: Distant Moon / Lunar Exoplanet */}
        <div className="celestial-moon" />

        {/* Celestial Body 2: Distant Terrestrial Minor Planet */}
        <div className="celestial-planet-minor" />

        {/* Sparse Twinkling Stardust Points */}
        {CELESTIAL_STARS.map((star, idx) => (
          <span
            key={idx}
            className="celestial-star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `starTwinkle ${star.duration} ease-in-out infinite`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
