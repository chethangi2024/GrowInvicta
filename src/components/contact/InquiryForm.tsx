"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";

interface InquiryFormProps {
  defaultService?: string;
  timelineOptions?: { value: string; label: string }[];
  consentText?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function InquiryForm({
  defaultService = "custom-coded",
  timelineOptions = [
    { value: "express", label: "Express Sprint (3–7 Days)" },
    { value: "standard", label: "Standard Launch (10–14 Days)" },
    { value: "flexible", label: "Flexible Planning" },
  ],
  consentText,
  title = "Send a Project Inquiry",
  subtitle = "Prefer written scope analysis? Submit your brief below. Response within 24 hours on business days.",
}: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    websiteUrl: "",
    serviceNeeded: defaultService,
    targetTimeline: timelineOptions[0]?.value || "express",
    projectDetails: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please accept the privacy consent checkbox to proceed.");
      return;
    }
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="neo-card p-6 sm:p-8">
      <div className="mb-6 pb-4 border-b border-[var(--border)]">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-1">
          Direct Intake
        </span>
        <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          {subtitle}
        </p>
      </div>

      {status === "success" ? (
        <div className="p-8 neo-card-inset text-center flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[#00D084] mb-2">
            <Check className="w-5 h-5 text-[#00D084]" />
          </div>
          <h4 className="text-lg font-bold text-[var(--text-primary)]">Inquiry Received</h4>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm font-mono">
            Thank you, {formData.name}. We will review your project scope and respond within 24 hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-4 py-2 border border-[var(--border-hover)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] uppercase transition-colors"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Chethan D M"
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Business Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="chethan@company.com"
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
              Website / Current URL (Optional)
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="https://yourcompany.com"
              className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Service Needed *
              </label>
              <select
                value={formData.serviceNeeded}
                onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
              >
                {SOLUTIONS.map((sol) => (
                  <option key={sol.id} value={sol.id} className="bg-[var(--section-bg)] text-[var(--text-primary)]">
                    {sol.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
                Target Timeline *
              </label>
              <select
                value={formData.targetTimeline}
                onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200"
              >
                {timelineOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[var(--section-bg)] text-[var(--text-primary)]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-[var(--text-secondary)] mb-1">
              Project Details &amp; Goals *
            </label>
            <textarea
              required
              rows={4}
              value={formData.projectDetails}
              onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
              placeholder="Detail your requirements, target timeline, and goals..."
              className="w-full px-3.5 py-2.5 bg-[var(--section-bg)] border border-[var(--border)] text-[var(--text-primary)] text-xs placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-200 resize-none"
            />
          </div>

          {/* Consent Checkbox (Unchecked by default) */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="privacyConsent"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              required
              className="mt-0.5 h-3.5 w-3.5 rounded-none border border-[var(--border-hover)] bg-[var(--section-bg)] text-[#7C3AED] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="privacyConsent" className="text-[11px] text-[var(--text-secondary)] leading-relaxed cursor-pointer select-none">
              {consentText || (
                <>
                  By submitting this form, you agree to our{" "}
                  <Link href="/privacy" className="text-[var(--text-secondary)] underline hover:text-[var(--text-primary)]">
                    Privacy Policy
                  </Link>{" "}
                  and consent to Grow Invicta storing and processing your details to respond to your project inquiry.
                </>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full btn-primary cursor-pointer"
          >
            <span>{status === "submitting" ? "Submitting..." : "Submit Project Inquiry →"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] border-t border-[var(--border)]">
            <span>Response: &lt;24h on business days</span>
            <span>100% Confidential</span>
          </div>
        </form>
      )}
    </div>
  );
}
