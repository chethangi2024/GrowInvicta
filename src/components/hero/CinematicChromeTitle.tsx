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
    <div className={`cinematic-chrome-wrapper ${className}`} aria-label={text}>
      <span className="cinematic-chrome-3d" data-text={text}>
        {/* Layer 1: Metallic Surface Chrome Gradient */}
        <span className="cinematic-chrome-face" aria-hidden="true">
          {text}
        </span>

        {/* Layer 2: Beveled Specular Edge Chisel */}
        <span className="cinematic-chrome-bevel" aria-hidden="true">
          {text}
        </span>

        {/* Layer 3: Horizon Specular Sheen */}
        <span className="cinematic-chrome-horizon" aria-hidden="true">
          {text}
        </span>

        {/* Layer 4: Cinematic Moving Studio Light Reflection */}
        <span className="cinematic-chrome-light-sweep" aria-hidden="true">
          {text}
        </span>
      </span>
    </div>
  );
}
