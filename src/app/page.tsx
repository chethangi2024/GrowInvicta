import React from "react";
import type { Metadata } from "next";
import ScrollytellingHero from "@/components/hero/ScrollytellingHero";
import OperationalGuarantees from "@/components/home/OperationalGuarantees";
import HomeAboutSection from "@/components/home/HomeAboutSection";
import SolutionsEditorialIndex from "@/components/home/SolutionsEditorialIndex";
import OwnershipComparison from "@/components/home/OwnershipComparison";
import DocumentationSection from "@/components/home/DocumentationSection";
import MilestoneTimeline from "@/components/home/MilestoneTimeline";
import PortfolioShowcase from "@/components/home/PortfolioShowcase";
import GrowthTechnicalCapabilities from "@/components/home/GrowthTechnicalCapabilities";
import StackedLogos from "@/components/ui/stacked-logos";
import { HOME_FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Grow Invicta | Web Development & Digital Growth Agency",
  description:
    "Fast Next.js web development, Elementor WordPress & Shopify stores. Express 3-7 day live staging, $0 markup hosting & 100% full source ownership in 10 days.",
  alternates: {
    canonical: "https://growinvicta.com",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  keywords: [
    "Web Development Agency",
    "Digital Growth Agency",
    "Next.js Web Development",
    "Elementor WordPress Development",
    "Shopify Store Setup",
    "Generative Engine Optimization GEO",
    "Short Form Video Editing",
    "Canva Branding Services",
  ],
  openGraph: {
    title: "Grow Invicta | Web Development & Digital Growth Agency",
    description:
      "High-performance Next.js websites, Elementor WordPress, Shopify stores & growth funnels with express 3–7 day live staging and 100% full asset ownership.",
    url: "https://growinvicta.com",
    siteName: "Grow Invicta",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://growinvicta.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grow Invicta — High Performance Digital Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow Invicta | Web Development & Digital Growth Agency",
    description:
      "High-performance Next.js websites, Elementor WordPress, Shopify stores & growth funnels with express 3–7 day live staging and 100% full asset ownership.",
    images: ["https://growinvicta.com/og-image.jpg"],
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Grow Invicta",
  url: "https://growinvicta.com",
  logo: "https://growinvicta.com/brand/grow-invicta-logo-color.png",
  description:
    "Engineering high-performance Next.js websites, custom Elementor WordPress, Shopify e-commerce, web applications, AI Search & SEO / GEO, and growth funnels without vendor lock-in.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "12.9716",
    longitude: "77.5946",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Engineering & Growth Capabilities",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Coded Next.js Websites",
          description: "High-performance React/Next.js platforms with 100% code ownership.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Elementor WordPress Development",
          description: "Bespoke visual drag-and-drop WordPress platforms with full Super Admin access.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Shopify E-Commerce Stores",
          description: "High-converting Shopify stores with express 1-page checkout and multi-currency setup.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Web Applications",
          description: "Authenticated customer portals and full-stack cloud web applications.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Search & SEO / GEO",
          description: "Generative Engine Optimization and structured schema graphs for AI search visibility.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Short-Form Video Editing",
          description: "High-retention 9:16 vertical video editing with kinetic typography.",
        },
      },
    ],
  },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function HomePage() {
  return (
    <div className="w-full bg-[var(--page-bg)] text-[var(--text-primary)]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema),
        }}
      />

      {/* 01: HERO: GSAP ScrollTrigger 240-Frame Canvas Scrollytelling Hero (LOCKED) */}
      <ScrollytellingHero />

      {/* 02: CORE VALUE / POSITIONING: Operational Guarantees & Principal About */}
      <OperationalGuarantees />
      <HomeAboutSection />

      {/* 03: SOLUTIONS / SERVICES: Eight Core Solutions */}
      <SolutionsEditorialIndex />

      {/* 04: GROWTH / TECHNICAL CAPABILITIES: Broader Digital Engineering & GEO */}
      <GrowthTechnicalCapabilities />

      {/* 05: WHY GROW INVICTA / DIFFERENTIATORS */}
      <section className="spatial-section py-20 sm:py-24 lg:py-28 bg-[var(--page-bg)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] block mb-2 font-mono">
              CLIENT TRUST ROSTER
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Trusted by 25+ fast-moving brands &amp; healthcare leaders.
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            100% full asset, IP &amp; code handover across every engagement.
          </p>
        </div>
          <StackedLogos />
        </div>
      </section>
      <OwnershipComparison />
      <DocumentationSection />

      {/* 06: METHODOLOGY: How We Work (Static Milestone Journey) */}
      <MilestoneTimeline />

      {/* 07: PORTFOLIO: Selected Portfolio Showcase */}
      <PortfolioShowcase />
    </div>
  );
}
