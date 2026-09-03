"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BorderGlow from "@/components/ui/BorderGlow";

export default function PrincipalProfileImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Smooth lerp physics state
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    // Initial entrance animation
    const timer = setTimeout(() => setIsVisible(true), 150);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      clearTimeout(timer);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Lerp loop for smooth, frictionless 3D tilt
  useEffect(() => {
    if (isReducedMotion) return;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.08);
      current.current.y = lerp(current.current.y, target.current.y, 0.08);

      if (cardRef.current) {
        const rotateX = current.current.y * -8;
        const rotateY = current.current.x * 8;
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;
      }

      if (glareRef.current) {
        const glareX = 50 + current.current.x * 35;
        const glareY = 50 + current.current.y * 35;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.18) 0%, rgba(139, 92, 246, 0.12) 40%, transparent 70%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isReducedMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    target.current = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    };
  };

  const handleMouseLeave = () => {
    target.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[380px] lg:max-w-[420px] mx-auto transition-all duration-1000 ease-out select-none ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-[0.97]"
      }`}
    >
      {/* Outer Technical Frame with BorderGlow */}
      <div
        ref={cardRef}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="will-change-transform"
      >
        <BorderGlow
          className="p-3 sm:p-4 group"
          borderRadius={2}
          glowRadius={36}
          glowIntensity={1.2}
          colors={["#8B5CF6", "#E0287D", "#FF6B00"]}
          backgroundColor="#090909"
        >
          {/* Subtle Brand Accent Hairline at top */}
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-purple-500/70 via-gi-magenta/60 to-transparent" />

          {/* Technical Corner Brackets */}
          <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[var(--border-hover)] pointer-events-none" />
          <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[var(--border-hover)] pointer-events-none" />
          <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[var(--border-hover)] pointer-events-none" />
          <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[var(--border-hover)] pointer-events-none" />

          {/* Image Container */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1px] bg-[var(--page-bg)] border border-[var(--border)]">
            <Image
              src="/images/chethan-n.webp"
              alt="Chethan N — Founder and Lead Digital Engineer at Grow Invicta"
              width={840}
              height={1120}
              priority
              quality={95}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
            />

            {/* Interactive Specular Glare Layer */}
            <div
              ref={glareRef}
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
            />

            {/* Subtle Bottom Vignette Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07080A]/90 via-[#07080A]/40 to-transparent pointer-events-none" />

            {/* Bottom Principal Label */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5">
              <div className="text-[var(--text-primary)] font-bold text-sm tracking-tight drop-shadow-sm">
                Chethan N
              </div>
              <div className="text-[var(--text-secondary)] font-mono text-[10px] uppercase tracking-wider mt-0.5">
                Founder &amp; Digital Consultant
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </div>
  );
}
