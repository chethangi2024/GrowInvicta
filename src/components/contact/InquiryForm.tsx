"use client";

import React, { useState } from "react";
import { Send, ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    websiteUrl: "",
    serviceNeeded: "custom-coded",
    budgetScope: "standard",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="border border-white/[0.12] bg-[#0a0a0a] p-6 sm:p-8">
      <div className="mb-6 pb-4 border-b border-white/[0.08]">
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
          Direct Intake
        </span>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Send a Project Inquiry
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Prefer written scope analysis? Submit your brief below. Response within 24 hours on business days.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-8 border border-white/[0.2] bg-[#050505] text-center flex flex-col items-center gap-3">
          <div className="text-2xl font-mono font-bold text-white mb-2">&check;</div>
          <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
          <p className="text-xs text-zinc-400 max-w-sm font-mono">
            Thank you, {formData.name}. We will review your project scope and respond within 24 hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-4 py-2 border border-white/[0.2] text-xs font-mono text-zinc-300 hover:text-white uppercase"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Chethan D M"
                className="w-full px-3.5 py-2.5 bg-[#050505] border border-white/[0.12] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Business Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="chethan@company.com"
                className="w-full px-3.5 py-2.5 bg-[#050505] border border-white/[0.12] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
              Current Website / URL (Optional)
            </label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="https://yourcompany.com"
              className="w-full px-3.5 py-2.5 bg-[#050505] border border-white/[0.12] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Service Needed *
              </label>
              <select
                value={formData.serviceNeeded}
                onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#050505] border border-white/[0.12] text-white text-xs focus:outline-none focus:border-white transition-colors"
              >
                {SOLUTIONS.map((sol) => (
                  <option key={sol.id} value={sol.id}>
                    {sol.number} &mdash; {sol.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                Sprint Scope
              </label>
              <select
                value={formData.budgetScope}
                onChange={(e) => setFormData({ ...formData, budgetScope: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#050505] border border-white/[0.12] text-white text-xs focus:outline-none focus:border-white transition-colors"
              >
                <option value="express">Express Sprint (3–7 Days)</option>
                <option value="standard">Standard Launch (10 Days)</option>
                <option value="enterprise">Custom Web Application</option>
                <option value="monthly">Monthly Retainer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
              Project Brief &amp; Scope *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Detail your requirements, target timeline, and goals..."
              className="w-full px-3.5 py-2.5 bg-[#050505] border border-white/[0.12] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full btn-primary"
          >
            <span>{status === "submitting" ? "Submitting..." : "Submit Project Inquiry"}</span>
            <Send className="w-3.5 h-3.5" />
          </button>

          <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-white/[0.08]">
            <span>Response: &lt;24h on business days</span>
            <span>100% Confidential</span>
          </div>
        </form>
      )}
    </div>
  );
}
