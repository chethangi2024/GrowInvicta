"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, Sparkles, AlertCircle } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

export interface QuoteFormProps {
  initialService?: string;
  initialPlan?: string;
  initialAnimation?: boolean;
}

const SERVICE_OPTIONS = [
  { id: "custom-coded", label: "Custom Coded Website (Next.js & Motion)" },
  { id: "wordpress", label: "WordPress CMS (Elementor)" },
  { id: "shopify", label: "Shopify E-Commerce Store" },
  { id: "web-applications", label: "Custom Web Application & SaaS" },
  { id: "ai-search-seo", label: "AI Search & SEO / GEO" },
  { id: "business-growth", label: "Business Growth & Social Management" },
  { id: "video-editing", label: "Video Editing Services" },
  { id: "creative-branding", label: "Creative & Branding" },
  { id: "other", label: "Other / Custom Digital Scope" },
];

const TIMELINE_OPTIONS = [
  "Express Sprint (3–7 Days Staging)",
  "Standard Milestone (10–14 Days)",
  "Animated / Custom Complex (7–15+ Days)",
  "Flexible / Planning Phase",
];

const BUDGET_OPTIONS_INR = [
  "₹12,000 – ₹25,000 (Website Subscription / Sprint)",
  "₹25,000 – ₹50,000 (E-Commerce / Advanced Web)",
  "₹50,000 – ₹1,00,000+ (Web Application / Multi-Sprint)",
  "Custom / Retainer Scope",
];

export default function QuoteForm({ initialService, initialPlan, initialAnimation }: QuoteFormProps) {
  const searchParams = useSearchParams();

  const paramService = searchParams.get("service") || initialService || "custom-coded";
  const paramPlan = searchParams.get("plan") || initialPlan || "subscription";
  const paramAnim = searchParams.get("animation") === "true" || initialAnimation || false;

  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    country: "India",
    service: paramService,
    existingWebsiteUrl: "",
    requirement: "",
    timeline: "Express Sprint (3–7 Days Staging)",
    budget: "₹12,000 – ₹25,000 (Website Subscription / Sprint)",
    honeypot: "",
  });

  // Dynamic conditional sub-fields state
  const [dynamicDetails, setDynamicDetails] = useState<Record<string, any>>({
    plan: paramPlan,
    animationUpgrade: paramAnim,
    approxPages: "1 to 8 Pages",
    websiteType: "New Build",
    shopifyType: "New Storefront",
    appType: "Client Portal / SaaS MVP",
    seoGoal: "Dual-Engine (Google SEO + AI Search GEO)",
    growthAddOns: { posts: 8, reels: 4, blogs: 4 },
  });

  useEffect(() => {
    if (searchParams.get("service")) {
      setFormData((prev) => ({ ...prev, service: searchParams.get("service") || prev.service }));
    }
    if (searchParams.get("plan")) {
      setDynamicDetails((prev) => ({ ...prev, plan: searchParams.get("plan") || prev.plan }));
    }
    if (searchParams.get("animation")) {
      setDynamicDetails((prev) => ({
        ...prev,
        animationUpgrade: searchParams.get("animation") === "true",
      }));
    }
  }, [searchParams]);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.requirement.trim()) {
      setErrorMessage("Please complete all required fields (Name, Email, WhatsApp/Phone, and Requirement).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    // Bot honeypot check
    if (formData.honeypot && formData.honeypot.trim().length > 0) {
      setStatus("success");
      return;
    }

    setErrorMessage("");
    setStatus("submitting");

    try {
      const selectedServiceObj = SERVICE_OPTIONS.find((s) => s.id === formData.service) || SERVICE_OPTIONS[0];
      const leadId = `GI-LEAD-${Date.now()}`;
      const timestamp = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        dateStyle: "full",
        timeStyle: "medium",
      }) + " (IST)";

      let dynamicDetailsFormatted = "None";
      if (dynamicDetails && Object.keys(dynamicDetails).length > 0) {
        dynamicDetailsFormatted = Object.entries(dynamicDetails)
          .map(([k, v]) => {
            const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
            return `${label}: ${typeof v === "object" ? JSON.stringify(v) : v}`;
          })
          .join(" | ");
      }

      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "64b81da3-e7c0-4d0a-90a5-6466c57633b9";

      const payload = {
        access_key: accessKey,
        subject: `New Quote Request — ${selectedServiceObj.label} — ${formData.fullName}`,
        from_name: `Grow Invicta — ${formData.fullName}`,
        to_email: "iamchethandm@gmail.com",
        replyto: formData.email,
        "Lead ID": leadId,
        "Submitted At": timestamp,
        "Full Name": formData.fullName,
        "Email Address": formData.email,
        "Phone / WhatsApp": formData.phone,
        "Business / Company": formData.businessName || "Not provided",
        "Country": formData.country || "Not provided",
        "Selected Service": selectedServiceObj.label,
        "Existing Website": formData.existingWebsiteUrl || "None",
        "Target Timeline": formData.timeline,
        "Budget Range": formData.budget,
        "Service Configuration": dynamicDetailsFormatted,
        "Requirement Brief": formData.requirement,
        botcheck: "",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resJson = await response.json();

      if (response.ok && resJson.success) {
        setStatus("success");
      } else {
        setErrorMessage(resJson.message || "Failed to submit quote request. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const selectedServiceObj = SERVICE_OPTIONS.find((s) => s.id === formData.service) || SERVICE_OPTIONS[0];

  return (
    <BorderGlow
      className="p-6 sm:p-10"
      borderRadius={2}
      glowRadius={36}
      glowIntensity={1.15}
      colors={["#7C3AED", "#FF6A00"]}
      backgroundColor="#0d0e12"
    >
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-[var(--border)]">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-bold">
            STEP 01 • PROJECT SCOPE INTAKE
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border)] px-2 py-0.5">
            Direct Principal Scoping
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
          Request a Transparent Project Quote
        </h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
          Tell us about your business goals. We evaluate your scope and reply with clear deliverables, tech architecture, and upfront pricing.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-8 sm:p-12 neo-card-inset text-center flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[#00D084] mb-2">
            <Check className="w-7 h-7 text-[#00D084]" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D084] font-bold">
            SUBMISSION CONFIRMED
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            THANK YOU
          </h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed font-sans">
            We&apos;ve received your project enquiry for <span className="text-[var(--text-primary)] font-semibold">{selectedServiceObj.label}</span>. We will review your details and get back to you with the next steps.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/"
              className="btn-primary w-full sm:w-auto font-mono text-xs cursor-pointer"
            >
              <span>BACK TO HOME</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  fullName: "",
                  businessName: "",
                  email: "",
                  phone: "",
                  country: "India",
                  service: "custom-coded",
                  existingWebsiteUrl: "",
                  requirement: "",
                  timeline: "Express Sprint (3–7 Days Staging)",
                  budget: "₹12,000 – ₹25,000 (Website Subscription / Sprint)",
                  honeypot: "",
                });
                setStatus("idle");
              }}
              className="btn-secondary w-full sm:w-auto font-mono text-xs cursor-pointer"
            >
              <span>SUBMIT ANOTHER BRIEF</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
          {errorMessage && (
            <div className="p-4 border border-red-500/40 bg-red-500/10 text-xs font-mono text-red-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Honeypot Spam Filter (Hidden from users) */}
          <input
            type="text"
            name="hp_field"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* SECTION 1: CONTACT DETAILS */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-3">
              01 / CONTACT INFORMATION
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1.5 font-semibold">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ravi Kumar"
                  className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] transition-all"
                />
              </div>

              <div>
                <label htmlFor="businessName" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1.5 font-semibold">
                  Business / Company Name
                </label>
                <input
                  id="businessName"
                  type="text"
                  autoComplete="organization"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="HealthPlus Clinic"
                  className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1.5 font-semibold">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ravi.kumar@example.com"
                  className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1.5 font-semibold">
                  WhatsApp / Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="country" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1.5 font-semibold">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="India / United States / United Kingdom / UAE / Singapore"
                  className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] transition-all"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: PROJECT DETAILS */}
          <div className="pt-4 border-t border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold block mb-3">
              02 / PROJECT SPECIFICATIONS
            </span>

            {/* Service Selection Dropdown */}
            <div className="mb-4">
              <label htmlFor="service" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1.5 font-semibold">
                What do you need? *
              </label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[#7C3AED] transition-all cursor-pointer font-medium"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-[#111318] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* DYNAMIC CONDITIONAL FIELDS */}
            {(formData.service === "custom-coded" || formData.service === "wordpress") && (
              <div className="mb-4 p-4 bg-[#111318] border border-[var(--border)] space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#7C3AED] font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>Website Package Customization</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                      Billing Model Preference
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDynamicDetails({ ...dynamicDetails, plan: "subscription" })}
                        className={`py-2 px-3 text-xs font-mono font-semibold border transition-all ${
                          dynamicDetails.plan === "subscription"
                            ? "bg-white text-black border-white"
                            : "bg-[var(--section-bg)] text-[var(--text-secondary)] border-[var(--border)]"
                        }`}
                      >
                        Subscription
                      </button>
                      <button
                        type="button"
                        onClick={() => setDynamicDetails({ ...dynamicDetails, plan: "onetime" })}
                        className={`py-2 px-3 text-xs font-mono font-semibold border transition-all ${
                          dynamicDetails.plan === "onetime"
                            ? "bg-white text-black border-white"
                            : "bg-[var(--section-bg)] text-[var(--text-secondary)] border-[var(--border)]"
                        }`}
                      >
                        One-Time
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                      Approximate Page Count
                    </label>
                    <select
                      value={dynamicDetails.approxPages || "1 to 8 Pages"}
                      onChange={(e) => setDynamicDetails({ ...dynamicDetails, approxPages: e.target.value })}
                      className="w-full px-3 py-2 bg-[var(--section-bg)] border border-[var(--border)] text-xs text-[var(--text-primary)]"
                    >
                      <option value="1 to 8 Pages">Up to 8 Pages (Standard Included)</option>
                      <option value="9 to 15 Pages">9 to 15 Pages</option>
                      <option value="16 to 30+ Pages">16 to 30+ Custom Pages</option>
                    </select>
                  </div>

                  {formData.service === "custom-coded" && (
                    <div className="sm:col-span-2 pt-2">
                      <label className="flex items-center gap-3 p-3 bg-[var(--section-bg)] border border-[var(--border)] cursor-pointer hover:border-[#7C3AED]/60 transition-colors">
                        <input
                          type="checkbox"
                          checked={dynamicDetails.animationUpgrade || false}
                          onChange={(e) => setDynamicDetails({ ...dynamicDetails, animationUpgrade: e.target.checked })}
                          className="w-4 h-4 accent-[#7C3AED] rounded"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-[var(--text-primary)]">Animation Website Upgrade</span>
                          <span className="text-[var(--text-secondary)] block text-[11px]">
                            Add bespoke GSAP scroll animations, 3D micro-interactions &amp; fluid page transitions (+₹10,000 / +$299)
                          </span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {formData.service === "shopify" && (
              <div className="mb-4 p-4 bg-[#111318] border border-[var(--border)] space-y-3">
                <div className="text-[11px] font-mono text-[#00D084] font-bold uppercase">
                  Shopify Storefront Scope
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                      Project Type
                    </label>
                    <select
                      value={dynamicDetails.shopifyType || "New Storefront"}
                      onChange={(e) => setDynamicDetails({ ...dynamicDetails, shopifyType: e.target.value })}
                      className="w-full px-3 py-2 bg-[var(--section-bg)] border border-[var(--border)] text-xs text-[var(--text-primary)]"
                    >
                      <option value="New Storefront">New Storefront Build</option>
                      <option value="Theme Redesign & Speed">Theme Redesign &amp; Speed Boost</option>
                      <option value="Migration to Shopify">Migration to Shopify</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[var(--text-muted)] mb-1">
                      Product SKU Estimate
                    </label>
                    <input
                      type="text"
                      value={dynamicDetails.productSkuCount || ""}
                      onChange={(e) => setDynamicDetails({ ...dynamicDetails, productSkuCount: e.target.value })}
                      placeholder="e.g. 10–50 products"
                      className="w-full px-3 py-2 bg-[var(--section-bg)] border border-[var(--border)] text-xs text-[var(--text-primary)]"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.service === "business-growth" && (
              <div className="mb-4 p-4 bg-[#111318] border border-[var(--border)] space-y-3">
                <div className="text-[11px] font-mono text-[#7C3AED] font-bold uppercase">
                  Social Channels &amp; Content Mix
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  Base plan includes 8 Image Posts, 4 Reels, and 4 Authority Blogs / month. Specify any desired add-ons:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 bg-[var(--section-bg)] border border-[var(--border)]">
                    <span className="text-[var(--text-muted)] block text-[10px]">GRAPHIC POSTS</span>
                    <span className="font-bold text-[var(--text-primary)]">8+ Base / Mo</span>
                  </div>
                  <div className="p-3 bg-[var(--section-bg)] border border-[var(--border)]">
                    <span className="text-[var(--text-muted)] block text-[10px]">DYNAMIC REELS</span>
                    <span className="font-bold text-[var(--text-primary)]">4+ Base / Mo</span>
                  </div>
                  <div className="p-3 bg-[var(--section-bg)] border border-[var(--border)]">
                    <span className="text-[var(--text-muted)] block text-[10px]">SEO BLOGS</span>
                    <span className="font-bold text-[var(--text-primary)]">4+ Base / Mo</span>
                  </div>
                </div>
              </div>
            )}

            {formData.service === "ai-search-seo" && (
              <div className="mb-4 p-4 bg-[#111318] border border-[var(--border)] space-y-3">
                <div className="text-[11px] font-mono text-[#00D084] font-bold uppercase">
                  SEO &amp; AI Search (GEO) Focus
                </div>
                <select
                  value={dynamicDetails.seoGoal || "Dual-Engine (Google SEO + AI Search GEO)"}
                  onChange={(e) => setDynamicDetails({ ...dynamicDetails, seoGoal: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--section-bg)] border border-[var(--border)] text-xs text-[var(--text-primary)]"
                >
                  <option value="Dual-Engine (Google SEO + AI Search GEO)">Dual-Engine (Google SEO + AI Search GEO)</option>
                  <option value="AI Engine Citations (ChatGPT, Perplexity)">AI Engine Citations (ChatGPT, Perplexity)</option>
                  <option value="Local Healthcare / Practice Search">Local Healthcare / Practice Search</option>
                  <option value="E-Commerce Store Product SEO">E-Commerce Store Product SEO</option>
                </select>
              </div>
            )}

            {/* Existing Website URL */}
            <div className="mb-4">
              <label htmlFor="websiteUrl" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1.5 font-semibold">
                Existing Website / Reference URL
              </label>
              <input
                id="websiteUrl"
                type="url"
                value={formData.existingWebsiteUrl}
                onChange={(e) => setFormData({ ...formData, existingWebsiteUrl: e.target.value })}
                placeholder="https://example.com (or leave empty if new venture)"
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] transition-all"
              />
            </div>

            {/* Tell us about your requirement */}
            <div className="mb-4">
              <label htmlFor="requirement" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1.5 font-semibold">
                Tell us about your requirement *
              </label>
              <textarea
                id="requirement"
                required
                rows={4}
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                placeholder="Briefly describe what you are looking to build, design, or grow. E.g. We need a high-speed website for our clinic, booking functionality, and GEO optimization."
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] transition-all resize-y leading-relaxed font-sans"
              />
            </div>

            {/* Timeline & Budget Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="timeline" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1.5 font-semibold">
                  Preferred Timeline
                </label>
                <select
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[#7C3AED] transition-all cursor-pointer"
                >
                  {TIMELINE_OPTIONS.map((t) => (
                    <option key={t} value={t} className="bg-[#111318] text-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1.5 font-semibold">
                  Budget Range (Approx.)
                </label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[#7C3AED] transition-all cursor-pointer"
                >
                  {BUDGET_OPTIONS_INR.map((b) => (
                    <option key={b} value={b} className="bg-[#111318] text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] font-mono text-[var(--text-muted)] text-center sm:text-left">
              Direct review by Chethan N. No marketing spam.
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary w-full sm:w-auto font-mono text-xs cursor-pointer shadow-lg inline-flex items-center justify-center gap-2"
            >
              {status === "submitting" ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border border-white border-t-transparent animate-spin" />
                  <span>TRANSMITTING BRIEF...</span>
                </>
              ) : (
                <>
                  <span>GET A QUOTE ↗</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </BorderGlow>
  );
}
