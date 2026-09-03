"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

export default function ContactHubForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    websiteUrl: "",
    serviceNeeded: "",
    targetTimeline: "",
    projectScope: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const serviceOptions = [
    "Custom Coded Websites (Next.js & Motion)",
    "WordPress CMS Websites (Elementor)",
    "Shopify E-Commerce Stores",
    "Custom Web Applications & SaaS",
    "AI Search & SEO / GEO",
    "Business Growth & Social Management",
    "Video Editing Services",
    "Creative & Canva Branding",
  ];

  const timelineOptions = [
    "Express Sprint (3–7 Days Staging)",
    "Standard Milestone (10–14 Days)",
    "Animated / Custom Complex (7–15+ Days)",
    "Flexible / Planning Phase",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.serviceNeeded || !formData.targetTimeline || !formData.projectScope.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }
    if (!formData.consent) {
      setErrorMessage("Please accept the privacy consent checkbox to submit your brief.");
      return;
    }

    setErrorMessage("");
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  return (
    <BorderGlow
      className="p-6 sm:p-8"
      borderRadius={2}
      glowRadius={32}
      glowIntensity={1.0}
      colors={["#7C3AED", "#FF6A00"]}
      
    >
      <div className="mb-6 pb-4 border-b border-[var(--border)]">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">
          DIRECT INTAKE
        </span>
        <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          Send a Project Inquiry
        </h3>
        <p className="text-xs text-[var(--text-secondary)] mt-1 font-mono">
          Response guaranteed in 24 business hours
        </p>
      </div>

      {status === "success" ? (
        <div className="p-8 neo-card-inset text-center flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[#00D084] mb-2">
            <Check className="w-5 h-5 text-[#00D084]" />
          </div>
          <h4 className="text-lg font-bold text-[var(--text-primary)]">Project Brief Received</h4>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm font-mono leading-relaxed">
            Thank you, {formData.name}. Chethan N will personally review your brief and respond within 24 business hours.
          </p>
          <button
            onClick={() => {
              setFormData({
                name: "",
                email: "",
                phone: "",
                websiteUrl: "",
                serviceNeeded: "",
                targetTimeline: "",
                projectScope: "",
                consent: false,
              });
              setStatus("idle");
            }}
            className="mt-4 px-4 py-2 border border-[var(--border-hover)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] uppercase transition-colors"
          >
            Submit Another Brief
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
          {errorMessage && (
            <div className="p-3 border border-red-500/40 bg-red-500/10 text-xs font-mono text-red-300">
              {errorMessage}
            </div>
          )}

          {/* Full Name & Business Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Chethan D M"
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="businessEmail" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Business Email *
              </label>
              <input
                id="businessEmail"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="chethan@company.com"
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
              />
            </div>
          </div>

          {/* Phone & Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phoneNumber" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Phone / WhatsApp Number (Optional)
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 96204 11122"
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="websiteUrl" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Current Website / Reference URL (Optional)
              </label>
              <input
                id="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://yourcompany.com"
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
              />
            </div>
          </div>

          {/* Service Needed & Target Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="serviceNeeded" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Service Needed *
              </label>
              <select
                id="serviceNeeded"
                required
                value={formData.serviceNeeded}
                onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
              >
                <option value="" disabled className="bg-[var(--section-bg)] text-[var(--text-muted)]">Select a capability...</option>
                {serviceOptions.map((srv) => (
                  <option key={srv} value={srv} className="bg-[var(--section-bg)] text-[var(--text-primary)]">
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="targetTimeline" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Target Timeline *
              </label>
              <select
                id="targetTimeline"
                required
                value={formData.targetTimeline}
                onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
              >
                <option value="" disabled className="bg-[var(--section-bg)] text-[var(--text-muted)]">Select target timeline...</option>
                {timelineOptions.map((tl) => (
                  <option key={tl} value={tl} className="bg-[var(--section-bg)] text-[var(--text-primary)]">
                    {tl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Scope & Objectives */}
          <div>
            <label htmlFor="projectScope" className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
              Project Scope &amp; Deliverable Goals *
            </label>
            <textarea
              id="projectScope"
              required
              rows={3}
              value={formData.projectScope}
              onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
              placeholder="Tell us about your brand, current challenges, technical preferences, or specific features needed..."
              className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200 resize-none"
            />
          </div>

          {/* Privacy & Anti-Spam Agreement */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="consent"
              type="checkbox"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-0.5 h-3.5 w-3.5 rounded-none border border-[var(--border-hover)] bg-[var(--section-bg)] text-[#7C3AED] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="contactConsent" className="text-[11px] text-[var(--text-secondary)] leading-relaxed cursor-pointer select-none">
              By submitting this form, you agree to our{" "}
              <Link href="/privacy" className="text-[var(--text-secondary)] underline hover:text-[var(--text-primary)]">
                Privacy Policy
              </Link>{" "}
              and consent to Grow Invicta storing and processing your details solely to respond to this project inquiry. Zero spam, zero third-party data sharing.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full btn-primary py-3.5 px-4 font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{status === "submitting" ? "Submitting..." : "Submit Project Brief →"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] border-t border-[var(--border)]">
            <span>Direct Review by Chethan N</span>
            <span>&lt;24h Response</span>
          </div>
        </form>
      )}
    </BorderGlow>
  );
}
