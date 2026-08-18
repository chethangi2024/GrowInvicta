import React from "react";
import { Mail, MapPin, Clock } from "lucide-react";
import CalEmbed from "@/components/contact/CalEmbed";
import InquiryForm from "@/components/contact/InquiryForm";

export const metadata = {
  title: "Book a Free 30-Min Call | Contact Grow Invicta",
  description:
    "Schedule a direct 30-minute discovery call with Grow Invicta leadership or submit a project brief. Headquartered in Bengaluru, Karnataka, India. Response within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mb-16 gsap-reveal-header">
          <div className="badge-brand mb-4">
            <span>Direct Intake • Global Delivery</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Let&apos;s build something <br />
            <span className="text-brand-gradient">worth remembering.</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl">
            Pick a direct 30-minute discovery slot on our calendar or submit a written project scope below. We outline deliverables, express staging targets, and transparent pricing with zero sales pressure.
          </p>
        </div>

        {/* Contact Meta Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-l border-white/[0.1] mb-16 font-mono text-xs gsap-stagger-container">
          <div className="border-r border-b border-white/[0.1] p-6 bg-[#080808] gsap-stagger-item">
            <div className="text-zinc-500 uppercase mb-1">Official Email</div>
            <a
              href="mailto:contact@growinvicta.com"
              className="text-white hover:text-zinc-300 font-bold block"
            >
              contact@growinvicta.com
            </a>
            <div className="text-[11px] text-zinc-600 mt-1">Direct inbox access</div>
          </div>

          <div className="border-r border-b border-white/[0.1] p-6 bg-[#080808] gsap-stagger-item">
            <div className="text-zinc-500 uppercase mb-1">Global HQ</div>
            <div className="text-white font-bold">Bengaluru, Karnataka, India</div>
            <div className="text-[11px] text-zinc-600 mt-1">Serving clients worldwide</div>
          </div>

          <div className="border-r border-b border-white/[0.1] p-6 bg-[#080808] gsap-stagger-item">
            <div className="text-zinc-500 uppercase mb-1">Response Guarantee</div>
            <div className="text-white font-bold">&lt; 24 Hours</div>
            <div className="text-[11px] text-zinc-600 mt-1">On all business days</div>
          </div>
        </div>

        {/* Calendar & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 gsap-reveal-card">
          <div className="lg:col-span-7 border-flow-box">
            <CalEmbed />
          </div>
          <div className="lg:col-span-5 border-flow-subtle">
            <InquiryForm />
          </div>
        </div>

        {/* What Happens on the Call */}
        <div className="p-8 border border-white/[0.1] bg-[#080808] gsap-reveal-card">
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            Procedure
          </span>
          <h3 className="text-xl font-bold text-white mb-6 tracking-tight">
            What Happens on the 30-Minute Discovery Call?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-zinc-300 gsap-stagger-container">
            <div className="border-t border-white/[0.1] pt-4 gsap-stagger-item">
              <span className="text-white font-bold block mb-1">01 / Scope Analysis</span>
              <span className="text-zinc-400">We analyze your current presence, audience, and bottlenecks.</span>
            </div>
            <div className="border-t border-white/[0.1] pt-4 gsap-stagger-item">
              <span className="text-white font-bold block mb-1">02 / Stack Recommendation</span>
              <span className="text-zinc-400">We recommend the optimal stack (Next.js vs. Elementor vs. Shopify).</span>
            </div>
            <div className="border-t border-white/[0.1] pt-4 gsap-stagger-item">
              <span className="text-white font-bold block mb-1">03 / Milestone Commitment</span>
              <span className="text-zinc-400">We provide estimated 3–7 day staging targets and pricing upfront.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
