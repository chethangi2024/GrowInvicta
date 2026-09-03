"use client";

import React from "react";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "brand" | "outline";
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * AnimatedButton
 * - Features high-velocity text shine and sweeping border beam from Vengence UI
 * - Supports both native <button> actions and Next.js <Link> navigation
 * - Theme & brand aware for Grow Invicta
 */
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = "primary",
  href,
  className = "",
  size = "md",
  onClick,
  disabled,
  type = "button",
  ...rest
}) => {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-[11px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-7 py-3.5 text-sm",
  };

  const variantClasses = {
    primary:
      "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover-bg)] border border-[var(--btn-primary-border)] [--shine:rgba(255,255,255,0.9)] shadow-[var(--btn-primary-shadow)]",
    secondary:
      "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] hover:text-[var(--text-primary)] hover:bg-[var(--btn-secondary-hover-bg)] border border-[var(--btn-secondary-border)] [--shine:rgba(255,255,255,0.6)] shadow-[var(--btn-secondary-shadow)]",
    brand:
      "bg-gradient-to-r from-[#8B5CF6] via-[#E0287D] to-[#FF6B00] text-white border border-[var(--border)] [--shine:rgba(255,255,255,0.95)] shadow-[0_0_25px_rgba(224,40,125,0.4)]",
    outline:
      "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-hover)] hover:border-[var(--border-hover)] [--shine:rgba(255,255,255,0.7)]",
  };

  const content = (
    <>
      {/* Text with light shine sweep */}
      <motion.span
        className="tracking-wider uppercase font-semibold font-mono flex items-center justify-center gap-2 h-full w-full relative z-10 select-none whitespace-nowrap"
        style={{
          WebkitMaskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
          maskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
        }}
        initial={{ ["--mask-x" as any]: "100%" } as any}
        animate={{ ["--mask-x" as any]: "-100%" } as any}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
          repeatDelay: 1.2,
        }}
      >
        {children}
      </motion.span>

      {/* Border shine beam effect */}
      <motion.span
        className="block absolute inset-0 rounded-[2px] p-px pointer-events-none"
        style={{
          background:
            "linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        initial={{ backgroundPosition: "100% 0", opacity: 0 }}
        animate={{
          backgroundPosition: ["100% 0", "0% 0"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1.2,
        }}
      />
    </>
  );

  const baseClasses = cn(
    "group inline-flex items-center justify-center relative overflow-hidden rounded-[2px] cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
        className="inline-flex"
      >
        <Link href={href} className={baseClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }}
      className={baseClasses}
      {...(rest as any)}
    >
      {content}
    </motion.button>
  );
};

export default AnimatedButton;
