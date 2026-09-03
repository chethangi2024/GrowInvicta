"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ClientLogo {
  name: string;
  src: string;
  category?: string;
}

export interface StackedLogosProps {
  columns?: number;
  logoGroups?: ClientLogo[][];
  interval?: number; // Duration each logo is visible in seconds
  className?: string;
  glowColor?: string;
}

// 26 real client logos distributed into 6 balanced stacked columns
export const DEFAULT_CLIENT_LOGOS: ClientLogo[][] = [
  [
    { name: "Svastha Hospital", src: "/client-logos/Svastha Hospital.webp", category: "Hospital" },
    { name: "Bricknbeams", src: "/client-logos/Bricknbeams.webp", category: "Real Estate" },
    { name: "Class101", src: "/client-logos/Class101.webp", category: "Education" },
    { name: "Law Corp", src: "/client-logos/Law Corp.webp", category: "Legal Practice" },
    { name: "Studio K Photography", src: "/client-logos/Studio K Photography.webp", category: "Media & Studio" },
  ],
  [
    { name: "Nethra Drishti Eye Hospital", src: "/client-logos/Nethra Drishti Eye Hospital.webp", category: "Ophthalmology" },
    { name: "Climate Trends", src: "/client-logos/Climate Trends.webp", category: "Environment" },
    { name: "KSWDC", src: "/client-logos/KSWDC.webp", category: "Government & NGO" },
    { name: "Sylvan Learning", src: "/client-logos/Sylvan Learning.webp", category: "Education" },
    { name: "Tiiger Trail", src: "/client-logos/Tiiger Trail.webp", category: "Hospitality" },
  ],
  [
    { name: "Brillanze Eye", src: "/client-logos/Brillanze Eye.webp", category: "Eye Hospital" },
    { name: "Code Wizard", src: "/client-logos/Code Wizard.webp", category: "AI & Tech" },
    { name: "Fusion Studio", src: "/client-logos/Fusion Studio.webp", category: "Creative Agency" },
    { name: "Ninchana Public School", src: "/client-logos/Ninchana Public School.webp", category: "Institutional" },
  ],
  [
    { name: "Dr. Vamsi Clinic", src: "/client-logos/Dr. Vamsi Clinic.webp", category: "Healthcare" },
    { name: "Elite Construction", src: "/client-logos/Elite Construction.webp", category: "Engineering" },
    { name: "Marvel", src: "/client-logos/Marvel.webp", category: "Retail Brand" },
    { name: "Totem Design Cult", src: "/client-logos/Totem Design Cult.webp", category: "Architecture" },
  ],
  [
    { name: "City Diagnostic", src: "/client-logos/City Diagnostic.webp", category: "Diagnostics" },
    { name: "Eden Education Center", src: "/client-logos/Eden Education Center.webp", category: "Education" },
    { name: "Hoppipolla", src: "/client-logos/Hoppipolla.webp", category: "Hospitality" },
    { name: "Skill Zynga", src: "/client-logos/Skill Zynga.webp", category: "E-Learning" },
  ],
  [
    { name: "Oasis Imaging Centre", src: "/client-logos/Oasis Imaging Centre.webp", category: "Imaging" },
    { name: "Rootlet", src: "/client-logos/Rootlet.webp", category: "Childcare" },
    { name: "Starrbites", src: "/client-logos/Starrbites.webp", category: "F&B Brand" },
    { name: "Svastha Clinic", src: "/client-logos/Svastha Clinic.webp", category: "Outpatient Clinic" },
  ],
];

// Flat array of all 26 client logos for roster grid display
export const ALL_CLIENT_LOGOS: ClientLogo[] = DEFAULT_CLIENT_LOGOS.flat();

export function StackedLogos({
  logoGroups = DEFAULT_CLIENT_LOGOS,
  interval = 3.5,
  className,
  glowColor = "rgba(124, 58, 237, 0.25)",
}: StackedLogosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndices, setCurrentIndices] = useState<number[]>(() =>
    logoGroups.map(() => 0)
  );
  const [isPaused, setIsPaused] = useState(false);

  // Mouse position tracker for interactive grid glow
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  // Staggered interval animation cycling through each column
  useEffect(() => {
    if (isPaused) return;

    const intervalMs = interval * 1000;
    const timers = logoGroups.map((group, colIdx) => {
      // Stagger column start
      const timeout = setTimeout(() => {
        const intervalId = setInterval(() => {
          setCurrentIndices((prev) => {
            const next = [...prev];
            next[colIdx] = (next[colIdx] + 1) % group.length;
            return next;
          });
        }, intervalMs);

        // Store interval ID on window/closure
        (timers as any)[`interval_${colIdx}`] = intervalId;
      }, colIdx * 350);

      return timeout;
    });

    return () => {
      timers.forEach((t, colIdx) => {
        clearTimeout(t);
        if ((timers as any)[`interval_${colIdx}`]) {
          clearInterval((timers as any)[`interval_${colIdx}`]);
        }
      });
    };
  }, [logoGroups, interval, isPaused]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        "group relative w-full overflow-hidden border border-[var(--border)] bg-[var(--card-bg)] rounded-[4px]",
        className
      )}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, rgba(255, 106, 0, 0.08) 40%, transparent 70%)`,
        }}
      />

      {/* Grid Pattern with Clean Separators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-[var(--border)] relative z-20">
        {logoGroups.map((group, colIdx) => {
          const activeIndex = currentIndices[colIdx] ?? 0;
          const currentLogo = group[activeIndex] || group[0];

          return (
            <div
              key={colIdx}
              className="relative h-32 sm:h-36 flex flex-col items-center justify-center p-4 sm:p-5 overflow-hidden hover:bg-[var(--border-subtle)] transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${colIdx}-${currentLogo.name}`}
                  initial={{ opacity: 0, scale: 0.92, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                >
                  {/* Clean Logo Display Container with Light Background Contrast Card */}
                  <div className="relative w-full h-16 max-w-[150px] bg-white/[0.04] dark:bg-white/[0.06] border border-white/[0.08] dark:border-white/[0.1] rounded-lg p-2.5 flex items-center justify-center transition-all duration-300 group-hover:bg-white/[0.09] shadow-sm">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={currentLogo.src}
                        alt={currentLogo.name}
                        width={140}
                        height={50}
                        className="max-h-full w-auto max-w-full object-contain filter brightness-100 contrast-110 drop-shadow-sm transition-all duration-300"
                        loading="eager"
                      />
                    </div>
                  </div>

                  {/* Brand Name Sub-label */}
                  <span className="text-[10px] font-mono text-[var(--text-muted)] mt-2 line-clamp-1 text-center font-medium max-w-full px-1">
                    {currentLogo.name}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Minimal Column Index Indicator */}
              <div className="absolute bottom-1 right-2 font-mono text-[9px] text-[var(--text-muted)] opacity-60 select-none pointer-events-none">
                {activeIndex + 1}/{group.length}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StackedLogos;
