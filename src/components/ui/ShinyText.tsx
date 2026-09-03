"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "motion/react";
import "./ShinyText.css";

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: "left" | "right";
  yoyo?: boolean;
  pauseOnHover?: boolean;
  delay?: number;
  style?: React.CSSProperties;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 2.5,
  className = "",
  color = "#B5B5B5",
  shineColor = "#FFFFFF",
  spread = 120,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  delay = 0.5,
  style = {},
}: ShinyTextProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const progress = useMotionValue(direction === "left" ? 100 : -100);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useAnimationFrame((time) => {
    if (disabled || isReducedMotion || (pauseOnHover && isHovered)) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = time + delay * 1000;
    }

    const elapsed = time - startTimeRef.current;
    if (elapsed < 0) return;

    const cycleDuration = Math.max(speed * 1000, 100);
    const t = (elapsed % cycleDuration) / cycleDuration;

    if (yoyo) {
      const pingPong = (Math.sin(t * Math.PI * 2 - Math.PI / 2) + 1) / 2;
      const val = direction === "left" ? 150 - pingPong * 300 : -150 + pingPong * 300;
      progress.set(val);
    } else {
      const val = direction === "left" ? 150 - t * 300 : -150 + t * 300;
      progress.set(val);
    }
  });

  const backgroundPosition = useTransform(progress, (v) => `${v}% center`);

  if (isReducedMotion || disabled) {
    return (
      <span
        className={`shiny-text disabled ${className}`}
        style={{
          color: shineColor || "#FFFFFF",
          ...style,
        }}
      >
        {text}
      </span>
    );
  }

  return (
    <motion.span
      className={`shiny-text ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundImage: `linear-gradient(${direction === "left" ? "120deg" : "60deg"}, ${color} calc(50% - ${spread}px), ${shineColor} 50%, ${color} calc(50% + ${spread}px))`,
        backgroundSize: `${Math.max(spread * 3, 200)}% 100%`,
        backgroundPosition,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
    >
      {text}
    </motion.span>
  );
}
