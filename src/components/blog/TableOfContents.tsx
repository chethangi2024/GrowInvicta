"use client";

import React, { useState } from "react";
import { List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 for H2, 3 for H3
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractHeadings(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace("## ", "").trim();
      if (text && !text.toLowerCase().includes("frequently asked questions") && !text.toLowerCase().includes("faqs")) {
        items.push({
          id: generateSlug(text),
          text,
          level: 2,
        });
      }
    } else if (trimmed.startsWith("### ")) {
      const text = trimmed.replace("### ", "").trim();
      if (text) {
        items.push({
          id: generateSlug(text),
          text,
          level: 3,
        });
      }
    }
  }

  return items;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export default function TableOfContents({
  content,
  className,
}: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const items = extractHeadings(content);

  if (items.length === 0) return null;

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -90; // Offset for floating fixed navbar
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "my-8 p-5 sm:p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 text-left group w-full justify-between cursor-pointer"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-[var(--text-primary)]">
              Table of Contents
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-[var(--section-bg)] text-[var(--text-muted)] border border-[var(--border)] rounded-full">
              {items.length} sections
            </span>
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
          />
        </button>
      </div>

      {isOpen && (
        <ol className="mt-4 pt-4 border-t border-[var(--border)] space-y-2 font-mono text-xs text-[var(--text-secondary)]">
          {items.map((item, idx) => (
            <li
              key={idx}
              className={cn(
                "transition-colors leading-normal",
                item.level === 2 ? "font-medium text-[var(--text-primary)] pt-1" : "pl-4 text-[var(--text-muted)]"
              )}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToHeading(e, item.id)}
                className="hover:text-[#7C3AED] hover:underline underline-offset-4 flex items-baseline gap-2 py-0.5 transition-colors"
              >
                <span className="text-[10px] opacity-60">
                  {item.level === 2 ? "•" : "└"}
                </span>
                <span className="truncate">{item.text}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
