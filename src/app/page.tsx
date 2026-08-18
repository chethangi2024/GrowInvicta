import React from "react";
import ScrollytellingHero from "@/components/hero/ScrollytellingHero";
import OperationalGuarantees from "@/components/home/OperationalGuarantees";
import SolutionsEditorialIndex from "@/components/home/SolutionsEditorialIndex";
import OwnershipComparison from "@/components/home/OwnershipComparison";
import DocumentationSection from "@/components/home/DocumentationSection";
import MilestoneTimeline from "@/components/home/MilestoneTimeline";
import PortfolioShowcase from "@/components/home/PortfolioShowcase";
import TestimonialsTrust from "@/components/home/TestimonialsTrust";
import CalEmbed from "@/components/contact/CalEmbed";
import InquiryForm from "@/components/contact/InquiryForm";

export default function HomePage() {
  return (
    <div className="w-full bg-[#050505] text-white">
      {/* 01: GSAP ScrollTrigger 240-Frame Canvas Scrollytelling Hero */}
      <ScrollytellingHero />

      {/* 02: Four Operational Guarantees (Typographic Editorial Layout) */}
      <OperationalGuarantees />

      {/* 03: Eight Solutions (Editorial Numbered Service Index) */}
      <SolutionsEditorialIndex />

      {/* 04: Ownership & Infrastructure Architecture */}
      <OwnershipComparison />

      {/* 05: Written Documentation Standard */}
      <DocumentationSection />

      {/* 06: How We Work (Static Milestone Journey) */}
      <MilestoneTimeline />

      {/* 07: Selected Portfolio Case Studies */}
      <PortfolioShowcase />

      {/* 08: Client Endorsements */}
      <TestimonialsTrust />

      {/* 09: Conversion Hub: Cal.com & Inquiry Form */}
      <section className="py-24 sm:py-32 bg-[#050505] border-t border-white/[0.1]" id="book-call">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-16 gsap-reveal-header">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
              08 / Conversion Hub
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Let&apos;s build something <br />
              <span className="text-brand-gradient">worth remembering.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-zinc-400">
              Schedule a 30-minute discovery call or submit your project scope for a direct response within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start gsap-reveal-card">
            <div className="lg:col-span-7 border-flow-box">
              <CalEmbed />
            </div>
            <div className="lg:col-span-5 border-flow-subtle">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
