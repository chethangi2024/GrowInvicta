"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Globe } from "lucide-react";
import { ClientWebsiteProject } from "@/lib/constants";
import BorderGlow from "@/components/ui/BorderGlow";

interface WebsiteProjectCardProps {
  project: ClientWebsiteProject;
  priority?: boolean;
}

export default function WebsiteProjectCard({
  project,
  priority = false,
}: WebsiteProjectCardProps) {
  // Extract display domain from URL
  const displayDomain = project.url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  return (
    <div className="group block text-left h-full">
      <BorderGlow
        className="p-0 overflow-hidden flex flex-col h-full rounded-xl transition-all duration-300 group-hover:scale-[1.015]"
        borderRadius={12}
        edgeSensitivity={24}
        glowRadius={32}
        glowIntensity={1.1}
        colors={["#7C3AED", "#FF6A00"]}
        backgroundColor="#0F1116"
      >
        {/* Project Screenshot Frame with Browser Bar */}
        <div className="relative w-full aspect-[16/10] bg-[#07080A] overflow-hidden flex flex-col border-b border-[var(--border)]">
          {/* Subtle Browser Window Header */}
          <div className="px-3.5 py-2 bg-[var(--section-bg)]/90 backdrop-blur-md border-b border-[var(--border)] flex items-center justify-between z-10 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[var(--page-bg)]/80 border border-[var(--border)] rounded text-[10px] font-mono text-[var(--text-muted)] max-w-[190px] truncate">
              <Globe className="w-2.5 h-2.5 text-[#7C3AED] shrink-0" />
              <span className="truncate">{displayDomain}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">Live</span>
            </div>
          </div>

          {/* Screenshot Image Container */}
          <div className="relative flex-grow w-full h-full overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} live website platform`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              priority={priority}
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/70 via-transparent to-transparent pointer-events-none" />

            {/* Hover Action Overlay */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-[#0A0A0C]/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-20 cursor-pointer"
              aria-label={`Visit live website for ${project.title}`}
            >
              <div className="px-4 py-2 bg-[var(--card-bg)] border border-[#7C3AED]/70 text-[var(--text-primary)] font-mono text-xs font-semibold flex items-center gap-2 rounded shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FF6A00]" />
              </div>
            </a>
          </div>
        </div>

        {/* Project Metadata & Footer */}
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-[var(--card-bg)]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF6A00] font-semibold">
                {project.category}
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)] px-1.5 py-0.5 rounded">
                Production
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>

          <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono">
            <span className="text-[var(--text-muted)] truncate max-w-[180px]">
              {displayDomain}
            </span>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#7C3AED] hover:text-[#FF6A00] group-hover:translate-x-0.5 transition-all whitespace-nowrap"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}
