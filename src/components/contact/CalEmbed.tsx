"use client";

import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

export default function CalEmbed() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const calUrl = "https://cal.com/iamchethandm/30mincallwithchethan";

  return (
    <div className="border border-white/[0.12] bg-[#0a0a0a] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
            Live Calendar
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Book a Free 30-Min Strategy Call
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Pick a time directly. We outline scope, deliverables, and express staging targets.
          </p>
        </div>

        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary self-start sm:self-auto shrink-0"
        >
          <span>Open Full Screen</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 font-mono text-xs text-zinc-300">
        <div className="p-3 border border-white/[0.08] bg-[#050505]">
          <div className="text-white font-bold">30 Minutes</div>
          <div className="text-zinc-500 text-[11px]">Google Meet Video</div>
        </div>
        <div className="p-3 border border-white/[0.08] bg-[#050505]">
          <div className="text-white font-bold">No Sales Pitch</div>
          <div className="text-zinc-500 text-[11px]">Architecture &amp; Scope</div>
        </div>
        <div className="p-3 border border-white/[0.08] bg-[#050505]">
          <div className="text-white font-bold">Direct with Lead</div>
          <div className="text-zinc-500 text-[11px]">Fast Alignment</div>
        </div>
      </div>

      {/* Cal.com Iframe */}
      <div className="w-full h-[620px] bg-[#050505] border border-white/[0.08] relative">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-[#050505]">
            <div className="w-8 h-8 rounded-full border border-white/20 border-t-white animate-spin" />
            <span className="text-xs text-zinc-400 font-mono">Loading calendar slots...</span>
          </div>
        )}
        <iframe
          src={`${calUrl}?embed=true`}
          className="w-full h-full border-0 relative z-20"
          onLoad={() => setIframeLoaded(true)}
          title="Book a 30-Min Call with Grow Invicta"
        />
      </div>
    </div>
  );
}
