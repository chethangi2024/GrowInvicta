"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Award,
  Layers,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  CLIENT_WEBSITES,
  TESTIMONIALS,
} from "@/lib/constants";
import BorderGlow from "@/components/ui/BorderGlow";
import StackedLogos, { ALL_CLIENT_LOGOS } from "@/components/ui/stacked-logos";
import WebsiteProjectCard from "@/components/portfolio/WebsiteProjectCard";
import CreativePortfolioGallery, {
  CREATIVE_PORTFOLIO_DATA,
} from "@/components/portfolio/CreativePortfolioGallery";

type PortfolioTab = "all" | "websites" | "brands" | "designs";

function PortfolioContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as PortfolioTab) || "all";
  const [activeTab, setActiveTab] = useState<PortfolioTab>(
    ["all", "websites", "brands", "designs"].includes(initialTab)
      ? initialTab
      : "all"
  );

  // Sync tab with URL search params if changed
  useEffect(() => {
    const tabParam = searchParams.get("tab") as PortfolioTab;
    if (tabParam && ["all", "websites", "brands", "designs"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Calculate total creative items count
  const creativeCount = Object.values(CREATIVE_PORTFOLIO_DATA).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  const tabs = [
    {
      id: "all" as PortfolioTab,
      label: "All Work",
      count: CLIENT_WEBSITES.length + ALL_CLIENT_LOGOS.length + creativeCount,
      icon: Layers,
    },
    {
      id: "websites" as PortfolioTab,
      label: "Websites",
      count: CLIENT_WEBSITES.length,
      icon: Globe,
    },
    {
      id: "brands" as PortfolioTab,
      label: "Brands",
      count: ALL_CLIENT_LOGOS.length,
      icon: Award,
    },
    {
      id: "designs" as PortfolioTab,
      label: "Design & Creatives",
      count: creativeCount,
      icon: Sparkles,
    },
  ];

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Portfolio Header */}
        <div className="max-w-4xl mb-12 sm:mb-14 gsap-reveal-header">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold">
              OUR COMPLETE PORTFOLIO
            </span>
            <span className="text-[var(--text-muted)] font-mono text-xs">/</span>
            <span className="text-xs font-mono text-[var(--text-secondary)] uppercase">
              100% Client Ownership
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Selected Work &amp; Production Deployments
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Explore our real production platforms, brand identity systems, and marketing collateral delivered under our transparent sprint model with zero vendor lock-in.
          </p>
        </div>

        {/* Global Category Tabs (Styled following the Blog Page System) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 sm:mb-14 border-b border-[var(--border)] scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap rounded-[2px] ${
                  isActive
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:bg-white/[0.03]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-[#7C3AED]"}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-[2px] font-semibold ${
                    isActive
                      ? "bg-black/15 text-black"
                      : "bg-[var(--border-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ALL WORK OVERVIEW */}
        {activeTab === "all" && (
          <motion.div
            key="tab-all"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-24 sm:space-y-28"
          >
            {/* Section 1: Live Production Websites */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-1.5">
                    SECTION 01
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                    Live Production Websites
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                    13 real production platforms deployed with 100% full source ownership.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("websites")}
                  className="btn-secondary self-start sm:self-auto text-xs"
                >
                  <span>View All 13 Websites →</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {CLIENT_WEBSITES.slice(0, 6).map((project, idx) => (
                  <WebsiteProjectCard
                    key={project.url}
                    project={project}
                    priority={idx < 3}
                  />
                ))}
              </div>
            </div>

            {/* Section 2: Trusted Client Brands */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-1.5">
                    SECTION 02
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                    Trusted Client Brands &amp; Healthcare Leaders
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                    Animated client network across healthcare, tech, education, and enterprise.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("brands")}
                  className="btn-secondary self-start sm:self-auto text-xs"
                >
                  <span>View All 26 Brands →</span>
                </button>
              </div>

              <StackedLogos />
            </div>

            {/* Section 3: Design & Creative Work (Interactive PDF & Lightbox) */}
            <div>
              <CreativePortfolioGallery />
            </div>

            {/* Section 4: Client Testimonials */}
            <div>
              <div className="max-w-2xl mb-8">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-1.5">
                  ENDORSEMENTS
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                  What Founders &amp; Directors Say
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, idx) => (
                  <BorderGlow
                    key={idx}
                    className="p-6 sm:p-7 flex flex-col justify-between rounded-xl transition-all duration-300 hover:bg-[var(--card-bg-hover)]"
                    borderRadius={12}
                    glowRadius={30}
                    glowIntensity={1.0}
                    colors={["#7C3AED", "#FF6A00"]}
                    backgroundColor="#0F1116"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-sm font-bold text-[var(--text-primary)] font-mono uppercase">
                          {t.company}
                        </h3>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                          {t.source}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#FF6A00] mb-3 block">
                        {t.projectService}
                      </span>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic mb-6 leading-relaxed">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>
                    <div className="pt-4 border-t border-[var(--border)] font-mono text-xs">
                      <div className="font-bold text-[var(--text-primary)]">
                        {t.clientName || t.company}
                      </div>
                      {t.role && (
                        <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{t.role}</div>
                      )}
                      <div className="text-[10px] text-[var(--text-muted)] mt-1">{t.location}</div>
                    </div>
                  </BorderGlow>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: WEBSITES (ALL 13 PRODUCTION WEBSITES) */}
        {activeTab === "websites" && (
          <motion.div
            key="tab-websites"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="max-w-3xl mb-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-1">
                PRODUCTION PLATFORMS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                Live Production Client Websites
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                All 13 live deployed web platforms built for speed, SEO authority, and 100% full asset ownership. Click any project to visit the live platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {CLIENT_WEBSITES.map((project, idx) => (
                <WebsiteProjectCard
                  key={project.url}
                  project={project}
                  priority={idx < 6}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: BRANDS (26 ANIMATED CLIENT NETWORK + ROSTER GRID) */}
        {activeTab === "brands" && (
          <motion.div
            key="tab-brands"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-16"
          >
            {/* Animated Brand Showcase */}
            <div>
              <div className="max-w-3xl mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-1">
                  ANIMATED BRAND SHOWCASE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                  Interactive Client Brand Matrix
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  Hover to inspect any client brand. Auto-cycles smoothly through our client roster.
                </p>
              </div>

              <StackedLogos />
            </div>

            {/* Complete 26 Brand Roster Grid */}
            <div>
              <div className="max-w-3xl mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-1">
                  COMPLETE BRAND DIRECTORY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                  All 26+ Client Partnerships
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  Healthcare networks, engineering firms, creative agencies, and fast-growing businesses.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {ALL_CLIENT_LOGOS.map((brand, idx) => (
                  <div
                    key={`${brand.name}-${idx}`}
                    className="p-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg flex flex-col items-center justify-between text-center hover:border-[#7C3AED]/50 hover:bg-[var(--card-bg-hover)] transition-all duration-200 group"
                  >
                    <div className="relative w-full h-16 bg-white/[0.04] dark:bg-white/[0.06] border border-white/[0.08] rounded-md p-2 flex items-center justify-center mb-3 group-hover:bg-white/[0.09] transition-colors">
                      <Image
                        src={brand.src}
                        alt={brand.name}
                        width={130}
                        height={46}
                        className="max-h-full w-auto max-w-full object-contain filter brightness-100 contrast-110 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="w-full">
                      <span className="text-xs font-bold text-[var(--text-primary)] line-clamp-1 block">
                        {brand.name}
                      </span>
                      {brand.category && (
                        <span className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5 block">
                          {brand.category}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: DESIGN & CREATIVES (4 CATEGORIES WITH WORKING PDF + IMAGE LIGHTBOX) */}
        {activeTab === "designs" && (
          <motion.div
            key="tab-designs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <CreativePortfolioGallery />
          </motion.div>
        )}

        {/* Bottom Handover Guarantee Callout */}
        <div className="mt-20 sm:mt-24 p-8 sm:p-12 border border-[var(--border)] bg-[var(--card-bg)] rounded-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                100% Asset &amp; IP Guarantee
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              Every deliverable is 100% owned by you.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
              From Git repositories and DNS records to editable Canva master links and 300 DPI print files, you receive complete unencumbered ownership on Day 10.
            </p>
          </div>

          <Link
            href="/contact"
            className="btn-primary shrink-0 whitespace-nowrap"
          >
            <span>Start Your Sprint</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-36 pb-28 min-h-screen bg-[var(--page-bg)] flex items-center justify-center">
          <div className="text-center font-mono text-sm text-[var(--text-secondary)]">
            Loading Portfolio...
          </div>
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
