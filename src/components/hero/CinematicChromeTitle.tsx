"use client";

import React from "react";
import "./CinematicChromeTitle.css";

interface CinematicChromeTitleProps {
  text?: string;
  className?: string;
}

export default function CinematicChromeTitle({
  text = "GROW INVICTA",
  className = "",
}: CinematicChromeTitleProps) {
  return (
    <span className={`hero-clean-title ${className}`}>
      {text}
    </span>
  );
}
