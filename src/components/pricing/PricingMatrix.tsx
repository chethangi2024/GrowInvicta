"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles, Plus, Minus, Info } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";
import AnimatedButton from "@/components/ui/animated-button";
import {
  PRICING_CONFIG,
  WebsitePricingCardData,
  FixedScopePricingData,
  GeoSeoPricingData,
} from "@/lib/pricing-config";

export type Currency = "inr" | "usd";

export default function PricingMatrix() {
  const [currency, setCurrency] = useState<Currency>("inr");

  // Custom Coded Animation Upgrade Toggle
  const [isAnimationUpgrade, setIsAnimationUpgrade] = useState<boolean>(false);

  // Web plan toggles: "subscription" | "onetime"
  const [customCodedMode, setCustomCodedMode] = useState<"subscription" | "onetime">("subscription");
  const [wordpressMode, setWordpressMode] = useState<"subscription" | "onetime">("subscription");

  // SEO / GEO plan toggle: "onetime" | "monthly"
  const [seoMode, setSeoMode] = useState<"onetime" | "monthly">("onetime");

  // Business Growth Add-ons State
  const [growthAddOns, setGrowthAddOns] = useState<Record<string, number>>({
    images: 0,
    reels: 0,
    blogs: 0,
  });

  const updateGrowthAddOn = (id: string, delta: number, min: number, max: number, step: number) => {
    setGrowthAddOns((prev) => {
      const current = prev[id] || 0;
      const next = Math.min(Math.max(current + delta * step, min), max);
      return { ...prev, [id]: next };
    });
  };

  // Calculate Business Growth Total
  const bgConfig = PRICING_CONFIG.businessGrowth;
  const basePrice = currency === "inr" ? bgConfig.basePriceInr : bgConfig.basePriceUsd;
  const addOnsTotal = bgConfig.addOns.reduce((acc, addOn) => {
    const qty = growthAddOns[addOn.id] || 0;
    const unitPrice = currency === "inr" ? addOn.priceInrPerUnit : addOn.priceUsdPerUnit;
    return acc + qty * unitPrice;
  }, 0);
  const totalGrowthPrice = basePrice + addOnsTotal;

  const formatPrice = (amount: number, curr: Currency) => {
    if (curr === "inr") {
      return `₹${amount.toLocaleString("en-IN")}`;
    }
    return `$${amount.toLocaleString("en-US")}`;
  };

  // Calculate Custom Coded Display Price
  const customCodedBaseInr = customCodedMode === "subscription" ? 12000 : 15000;
  const customCodedBaseUsd = customCodedMode === "subscription" ? 399 : 499;
  const animUpgradeInr = isAnimationUpgrade ? 10000 : 0;
  const animUpgradeUsd = isAnimationUpgrade ? 299 : 0;
  const customCodedPriceInr = formatPrice(customCodedBaseInr + animUpgradeInr, "inr");
  const customCodedPriceUsd = formatPrice(customCodedBaseUsd + animUpgradeUsd, "usd");

  const customCodedSubDetail = customCodedMode === "subscription"
    ? currency === "inr"
      ? `First year: ${customCodedPriceInr} • Yearly renewal: ₹8,000`
      : `First year: ${customCodedPriceUsd} • Yearly renewal: $249/year`
    : currency === "inr"
      ? `One time: ${customCodedPriceInr} • Zero recurring agency fees`
      : `One time: ${customCodedPriceUsd} • Zero recurring agency fees`;

  return (
    <div className="space-y-20">
      {/* Currency Switcher & Overview Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">
            CURRENCY &amp; BILLING TELEMETRY
          </span>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Domestic (INR with GST invoicing) or International (USD via Stripe / Wire) contracts.
          </p>
        </div>

        <div className="inline-flex items-center neo-card-inset p-1.5 gap-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setCurrency("inr")}
            className={`px-4 py-2 text-xs font-mono font-semibold transition-all rounded-[2px] ${
              currency === "inr"
                ? "bg-white text-black shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            aria-pressed={currency === "inr"}
          >
            ₹ INR (India)
          </button>
          <button
            type="button"
            onClick={() => setCurrency("usd")}
            className={`px-4 py-2 text-xs font-mono font-semibold transition-all rounded-[2px] ${
              currency === "usd"
                ? "bg-white text-black shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
            aria-pressed={currency === "usd"}
          >
            $ USD (International)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: WEBSITES & DEVELOPMENT */}
      {/* ========================================================================= */}
      <div className="space-y-8">
        <div className="border-b border-[var(--border-subtle)] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#7C3AED] mb-1">
              <span>SECTION 01</span>
              <span>•</span>
              <span>ENGINEERING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Websites &amp; Development
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md">
            Sub-second Next.js builds, WordPress CMS engines, Shopify commerce, and custom full-stack web applications.
          </p>
        </div>

        {/* 2-Column Grid for Custom Coded and WordPress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Custom Coded Card */}
          {(() => {
            const card = PRICING_CONFIG.websites.customCoded;
            const currentPlan = card[customCodedMode];
            return (
              <BorderGlow
                key={card.id}
                className="p-7 sm:p-9 flex flex-col justify-between group"
                borderRadius={2}
                edgeSensitivity={25}
                glowRadius={32}
                glowIntensity={1.3}
                colors={["#7C3AED", "#FF6A00"]}
                backgroundColor="#151820"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6 pb-3.5 border-b border-[var(--border)] font-mono text-[10px]">
                    <span className="text-[var(--text-secondary)] uppercase tracking-wider">{card.category}</span>
                    <span className="px-2.5 py-0.5 border border-[#7C3AED]/50 text-[var(--text-primary)] bg-[#7C3AED]/15 shadow-[0_0_10px_rgba(124,58,237,0.2)]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {card.summary}
                  </p>

                  {/* Interactive Segmented Toggle */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 p-1 neo-card-inset rounded-[2px] gap-1">
                      <button
                        type="button"
                        onClick={() => setCustomCodedMode("subscription")}
                        className={`py-2 text-xs font-mono font-semibold transition-all rounded-[2px] ${
                          customCodedMode === "subscription"
                            ? "bg-white text-black shadow-sm"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        Subscription
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomCodedMode("onetime")}
                        className={`py-2 text-xs font-mono font-semibold transition-all rounded-[2px] ${
                          customCodedMode === "onetime"
                            ? "bg-white text-black shadow-sm"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        One Time
                      </button>
                    </div>
                  </div>

                  {/* Price Area */}
                  <div className="mb-6 p-4 neo-card-inset rounded-[2px] border border-[var(--border-subtle)]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
                        {currency === "inr" ? customCodedPriceInr : customCodedPriceUsd}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        {currency === "inr" ? currentPlan.periodLabelInr : currentPlan.periodLabelUsd}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] block mt-1">
                      {customCodedSubDetail}
                    </span>
                  </div>

                  {/* Optional Animation Upgrade Selector */}
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={() => setIsAnimationUpgrade(!isAnimationUpgrade)}
                      className={`w-full p-3.5 rounded-[2px] text-left transition-all border flex items-center justify-between gap-3 ${
                        isAnimationUpgrade
                          ? "bg-[#7C3AED]/15 border-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.25)]"
                          : "neo-card-inset border-[var(--border-subtle)] hover:border-[var(--border-hover)]"
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`w-4 h-4 rounded-[2px] border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                            isAnimationUpgrade
                              ? "bg-[#7C3AED] border-[#7C3AED] text-white"
                              : "border-[var(--border)] bg-[var(--border-subtle)]"
                          }`}
                        >
                          {isAnimationUpgrade && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[var(--text-primary)]">
                              Animation Website
                            </span>
                            <span className="text-[10px] font-mono font-semibold text-[#7C3AED] px-1.5 py-0.2 bg-[#7C3AED]/15 border border-[#7C3AED]/40 rounded-[2px]">
                              {currency === "inr" ? "+₹10,000" : "+$299"}
                            </span>
                          </div>
                          <span className="text-[11px] text-[var(--text-secondary)] block mt-0.5 leading-snug">
                            Add premium motion, transitions and interactive animations
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                      DELIVERABLES &amp; INCLUSIONS:
                    </span>
                    {currentPlan.inclusions.map((inc, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <Check className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{inc}</span>
                      </div>
                    ))}
                    {isAnimationUpgrade && (
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[#7C3AED]">
                        <Sparkles className="w-4 h-4 text-[#7C3AED] shrink-0 mt-0.5" />
                        <span className="font-semibold text-[var(--text-primary)]">
                          Includes bespoke GSAP scroll-triggers, 3D Canvas / WebGL micro-interactions &amp; fluid page transitions
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Small Note */}
                  <div className="mb-6 p-3 neo-card-inset border border-dashed border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                    <span>{card.note}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5 border-t border-[var(--border)]">
                  <AnimatedButton
                    href={`/contact?action=quote&service=custom-coded&plan=${customCodedMode}&animation=${isAnimationUpgrade}`}
                    variant="primary"
                    size="md"
                    className="w-full font-mono text-xs shadow-md"
                  >
                    <span>GET A QUOTE ↗</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </AnimatedButton>
                </div>
              </BorderGlow>
            );
          })()}

          {/* WordPress Card */}
          {(() => {
            const card = PRICING_CONFIG.websites.wordpress;
            const currentPlan = card[wordpressMode];
            return (
              <BorderGlow
                key={card.id}
                className="p-7 sm:p-9 flex flex-col justify-between group"
                borderRadius={2}
                edgeSensitivity={25}
                glowRadius={32}
                glowIntensity={1.0}
                colors={["#7C3AED", "#FF6A00"]}
                backgroundColor="#111318"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6 pb-3.5 border-b border-[var(--border)] font-mono text-[10px]">
                    <span className="text-[var(--text-secondary)] uppercase tracking-wider">{card.category}</span>
                    <span className="px-2.5 py-0.5 border border-[var(--border)] text-[var(--text-secondary)]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {card.summary}
                  </p>

                  {/* Interactive Segmented Toggle */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 p-1 neo-card-inset rounded-[2px] gap-1">
                      <button
                        type="button"
                        onClick={() => setWordpressMode("subscription")}
                        className={`py-2 text-xs font-mono font-semibold transition-all rounded-[2px] ${
                          wordpressMode === "subscription"
                            ? "bg-white text-black shadow-sm"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        Subscription
                      </button>
                      <button
                        type="button"
                        onClick={() => setWordpressMode("onetime")}
                        className={`py-2 text-xs font-mono font-semibold transition-all rounded-[2px] ${
                          wordpressMode === "onetime"
                            ? "bg-white text-black shadow-sm"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        One Time
                      </button>
                    </div>
                  </div>

                  {/* Price Area */}
                  <div className="mb-6 p-4 neo-card-inset rounded-[2px]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
                        {currency === "inr" ? currentPlan.priceInr : currentPlan.priceUsd}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        {currency === "inr" ? currentPlan.periodLabelInr : currentPlan.periodLabelUsd}
                      </span>
                    </div>
                    {currentPlan.subDetailInr && (
                      <span className="text-[11px] font-mono text-[var(--text-muted)] block mt-1">
                        {currency === "inr" ? currentPlan.subDetailInr : currentPlan.subDetailUsd}
                      </span>
                    )}
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                      DELIVERABLES &amp; INCLUSIONS:
                    </span>
                    {currentPlan.inclusions.map((inc, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <Check className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{inc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Small Note */}
                  <div className="mb-6 p-3 neo-card-inset border border-dashed border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                    <span>{card.note}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5 border-t border-[var(--border)]">
                  <AnimatedButton
                    href={`/contact?action=quote&service=wordpress&plan=${wordpressMode}`}
                    variant="secondary"
                    size="md"
                    className="w-full font-mono text-xs shadow-md"
                  >
                    <span>GET A QUOTE ↗</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </AnimatedButton>
                </div>
              </BorderGlow>
            );
          })()}
        </div>

        {/* 2-Column Grid for Shopify Commerce & Custom Web Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shopify Commerce Card */}
          {(() => {
            const card = PRICING_CONFIG.shopify;
            return (
              <BorderGlow
                key={card.id}
                className="p-7 sm:p-9 flex flex-col justify-between group"
                borderRadius={2}
                edgeSensitivity={25}
                glowRadius={32}
                glowIntensity={1.0}
                colors={["#7C3AED", "#FF6A00"]}
                backgroundColor="#111318"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6 pb-3.5 border-b border-[var(--border)] font-mono text-[10px]">
                    <span className="text-[var(--text-secondary)] uppercase tracking-wider">{card.category}</span>
                    <span className="px-2.5 py-0.5 border border-[var(--border)] text-[var(--text-secondary)]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {card.summary}
                  </p>

                  {/* Price Area */}
                  <div className="mb-6 p-4 neo-card-inset rounded-[2px]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
                        {currency === "inr" ? card.priceInr : card.priceUsd}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        {currency === "inr" ? card.priceLabelInr : card.priceLabelUsd}
                      </span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                      DELIVERABLES &amp; INCLUSIONS:
                    </span>
                    {card.inclusions.map((inc, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <Check className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5 border-t border-[var(--border)]">
                  <AnimatedButton
                    href="/contact?action=quote&service=shopify"
                    variant="secondary"
                    size="md"
                    className="w-full font-mono text-xs shadow-md"
                  >
                    <span>GET A QUOTE ↗</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </AnimatedButton>
                </div>
              </BorderGlow>
            );
          })()}

          {/* Custom Web Applications Card */}
          {(() => {
            const card = PRICING_CONFIG.webApplications;
            return (
              <BorderGlow
                key={card.id}
                className="p-7 sm:p-9 flex flex-col justify-between group"
                borderRadius={2}
                edgeSensitivity={25}
                glowRadius={32}
                glowIntensity={1.0}
                colors={["#7C3AED", "#FF6A00"]}
                backgroundColor="#111318"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6 pb-3.5 border-b border-[var(--border)] font-mono text-[10px]">
                    <span className="text-[var(--text-secondary)] uppercase tracking-wider">{card.category}</span>
                    <span className="px-2.5 py-0.5 border border-[var(--border)] text-[var(--text-secondary)]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {card.summary}
                  </p>

                  {/* Price Area */}
                  <div className="mb-6 p-4 neo-card-inset rounded-[2px]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
                        {currency === "inr" ? card.priceInr : card.priceUsd}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        {currency === "inr" ? card.priceLabelInr : card.priceLabelUsd}
                      </span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                      DELIVERABLES &amp; INCLUSIONS:
                    </span>
                    {card.inclusions.map((inc, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <Check className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5 border-t border-[var(--border)]">
                  <AnimatedButton
                    href="/contact?action=quote&service=web-applications"
                    variant="secondary"
                    size="md"
                    className="w-full font-mono text-xs shadow-md"
                  >
                    <span>GET A QUOTE ↗</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </AnimatedButton>
                </div>
              </BorderGlow>
            );
          })()}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: MARKETING & GROWTH */}
      {/* ========================================================================= */}
      <div className="space-y-8">
        <div className="border-b border-[var(--border-subtle)] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#00D084] mb-1">
              <span>SECTION 02</span>
              <span>•</span>
              <span>AUTHORITY &amp; DEMAND</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Marketing &amp; Growth
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md">
            Dual-engine GEO &amp; SEO search optimization, organic social lead funnels, and dynamic package configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Search & SEO / GEO Card */}
          {(() => {
            const card = PRICING_CONFIG.aiSearchSeo;
            const currentPlan = seoMode === "onetime" ? card.oneTime : card.monthly;
            return (
              <BorderGlow
                key={card.id}
                className="p-7 sm:p-9 flex flex-col justify-between group"
                borderRadius={2}
                edgeSensitivity={25}
                glowRadius={32}
                glowIntensity={1.0}
                colors={["#7C3AED", "#FF6A00"]}
                backgroundColor="#111318"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6 pb-3.5 border-b border-[var(--border)] font-mono text-[10px]">
                    <span className="text-[var(--text-secondary)] uppercase tracking-wider">{card.category}</span>
                    <span className="px-2.5 py-0.5 border border-[var(--border)] text-[var(--text-secondary)]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {card.summary}
                  </p>

                  {/* Interactive Toggle for One Time vs Monthly */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 p-1 neo-card-inset rounded-[2px] gap-1">
                      <button
                        type="button"
                        onClick={() => setSeoMode("onetime")}
                        className={`py-2 text-xs font-mono font-semibold transition-all rounded-[2px] ${
                          seoMode === "onetime"
                            ? "bg-white text-black shadow-sm"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        One Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setSeoMode("monthly")}
                        className={`py-2 text-xs font-mono font-semibold transition-all rounded-[2px] ${
                          seoMode === "monthly"
                            ? "bg-white text-black shadow-sm"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        Ongoing Monthly
                      </button>
                    </div>
                  </div>

                  {/* Price Area */}
                  <div className="mb-6 p-4 neo-card-inset rounded-[2px]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">
                      {currentPlan.title}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
                        {currency === "inr" ? currentPlan.priceInr : currentPlan.priceUsd}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        {currency === "inr" ? currentPlan.labelInr : currentPlan.labelUsd}
                      </span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                      DELIVERABLES &amp; INCLUSIONS:
                    </span>
                    {currentPlan.inclusions.map((inc, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <Check className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5 border-t border-[var(--border)]">
                  <AnimatedButton
                    href={`/contact?action=quote&service=ai-search-seo&plan=${seoMode}`}
                    variant="secondary"
                    size="md"
                    className="w-full font-mono text-xs shadow-md"
                  >
                    <span>GET A QUOTE ↗</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </AnimatedButton>
                </div>
              </BorderGlow>
            );
          })()}

          {/* Business Growth & Social Management (Interactive Package Builder) */}
          {(() => {
            const bgConfig = PRICING_CONFIG.businessGrowth;
            return (
              <BorderGlow
                key={bgConfig.id}
                className="p-7 sm:p-9 flex flex-col justify-between group"
                borderRadius={2}
                edgeSensitivity={25}
                glowRadius={32}
                glowIntensity={1.2}
                colors={["#7C3AED", "#00D084"]}
                backgroundColor="#151820"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6 pb-3.5 border-b border-[var(--border)] font-mono text-[10px]">
                    <span className="text-[var(--text-secondary)] uppercase tracking-wider">{bgConfig.category}</span>
                    <span className="px-2.5 py-0.5 border border-[#00D084]/40 text-[#00D084] bg-[#00D084]/10">
                      {bgConfig.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    {bgConfig.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {bgConfig.summary}
                  </p>

                  {/* Dynamic Price Summary Box */}
                  <div className="mb-6 p-4 neo-card-inset rounded-[2px] border border-[var(--border)]">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        Base Plan: {formatPrice(basePrice, currency)}/mo
                      </span>
                      {addOnsTotal > 0 && (
                        <span className="text-[11px] font-mono text-[#00D084]">
                          + {formatPrice(addOnsTotal, currency)} add-ons
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
                        {formatPrice(totalGrowthPrice, currency)}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        / month
                      </span>
                    </div>
                  </div>

                  {/* Interactive Add-On Selectors */}
                  <div className="mb-6 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider">
                        CUSTOMIZE DELIVERABLES:
                      </span>
                      {addOnsTotal > 0 && (
                        <button
                          type="button"
                          onClick={() => setGrowthAddOns({ images: 0, reels: 0, blogs: 0 })}
                          className="text-[10px] font-mono text-zinc-500 hover:text-[var(--text-primary)] underline transition-colors"
                        >
                          Reset Add-ons
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {bgConfig.addOns.map((addOn) => {
                        const qty = growthAddOns[addOn.id] || 0;
                        const unitRate = currency === "inr" ? `+₹${addOn.priceInrPerUnit}` : `+$${addOn.priceUsdPerUnit}`;
                        return (
                          <div
                            key={addOn.id}
                            className={`p-3 border transition-all flex items-center justify-between gap-3 ${
                              qty > 0
                                ? "bg-[#11141c] border-[#00D084]/60"
                                : "bg-[var(--section-bg)] border-[var(--border)]"
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-[var(--text-primary)]">
                                  {addOn.name}
                                </span>
                                <span className="text-[10px] font-mono text-[#00D084]">
                                  {unitRate}/{addOn.unitLabel}
                                </span>
                              </div>
                              <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">
                                {addOn.desc}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => updateGrowthAddOn(addOn.id, -1, addOn.min, addOn.max, addOn.step)}
                                disabled={qty <= addOn.min}
                                aria-label={`Decrease ${addOn.name}`}
                                className="w-6 h-6 border border-[var(--border)] flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs font-bold w-6 text-center text-[var(--text-primary)]">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateGrowthAddOn(addOn.id, 1, addOn.min, addOn.max, addOn.step)}
                                disabled={qty >= addOn.max}
                                aria-label={`Increase ${addOn.name}`}
                                className="w-6 h-6 border border-[var(--border)] flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Core Inclusions */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                      CORE MONTHLY DELIVERABLES:
                    </span>
                    {bgConfig.coreInclusions.map((inc, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <Check className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5 border-t border-[var(--border)]">
                  <AnimatedButton
                    href="/contact?action=quote&service=business-growth"
                    variant="primary"
                    size="md"
                    className="w-full font-mono text-xs shadow-md"
                  >
                    <span>GET A QUOTE ↗</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </AnimatedButton>
                </div>
              </BorderGlow>
            );
          })()}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: CREATIVE SERVICES */}
      {/* ========================================================================= */}
      <div className="space-y-8">
        <div className="border-b border-[var(--border-subtle)] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FF6A00] mb-1">
              <span>SECTION 03</span>
              <span>•</span>
              <span>CREATIVE PRODUCTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Creative Services
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md">
            Batch short-form video editing, healthcare educational reels, brand identities, and print collateral kits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Editing Card */}
          {(() => {
            const card = PRICING_CONFIG.videoEditing;
            return (
              <BorderGlow
                key={card.id}
                className="p-7 sm:p-9 flex flex-col justify-between group"
                borderRadius={2}
                edgeSensitivity={25}
                glowRadius={32}
                glowIntensity={1.0}
                colors={["#7C3AED", "#FF6A00"]}
                backgroundColor="#111318"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6 pb-3.5 border-b border-[var(--border)] font-mono text-[10px]">
                    <span className="text-[var(--text-secondary)] uppercase tracking-wider">{card.category}</span>
                    <span className="px-2.5 py-0.5 border border-[var(--border)] text-[var(--text-secondary)]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {card.summary}
                  </p>

                  {/* Price Area */}
                  <div className="mb-6 p-4 neo-card-inset rounded-[2px]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
                        {card.priceDisplay}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        • {card.priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                      DELIVERABLES &amp; INCLUSIONS:
                    </span>
                    {card.inclusions.map((inc, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <Check className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5 border-t border-[var(--border)]">
                  <AnimatedButton
                    href="/contact?action=quote&service=video-editing"
                    variant="secondary"
                    size="md"
                    className="w-full font-mono text-xs shadow-md"
                  >
                    <span>GET A QUOTE ↗</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </AnimatedButton>
                </div>
              </BorderGlow>
            );
          })()}

          {/* Creative & Branding Card */}
          {(() => {
            const card = PRICING_CONFIG.creativeBranding;
            return (
              <BorderGlow
                key={card.id}
                className="p-7 sm:p-9 flex flex-col justify-between group"
                borderRadius={2}
                edgeSensitivity={25}
                glowRadius={32}
                glowIntensity={1.0}
                colors={["#7C3AED", "#FF6A00"]}
                backgroundColor="#111318"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6 pb-3.5 border-b border-[var(--border)] font-mono text-[10px]">
                    <span className="text-[var(--text-secondary)] uppercase tracking-wider">{card.category}</span>
                    <span className="px-2.5 py-0.5 border border-[var(--border)] text-[var(--text-secondary)]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {card.summary}
                  </p>

                  {/* Price Area */}
                  <div className="mb-6 p-4 neo-card-inset rounded-[2px]">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)] tracking-tight">
                        {card.priceDisplay}
                      </span>
                      <span className="text-xs font-mono text-[var(--text-secondary)]">
                        • {card.priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-6">
                    <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block mb-2">
                      DELIVERABLES &amp; INCLUSIONS:
                    </span>
                    {card.inclusions.map((inc, iIdx) => (
                      <div key={iIdx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <Check className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)]">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-5 border-t border-[var(--border)]">
                  <AnimatedButton
                    href="/contact?action=quote&service=creative-branding"
                    variant="secondary"
                    size="md"
                    className="w-full font-mono text-xs shadow-md"
                  >
                    <span>GET A QUOTE ↗</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </AnimatedButton>
                </div>
              </BorderGlow>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
