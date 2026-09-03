/**
 * Centralized Pricing Configuration for Grow Invicta
 * Contains all base rates, add-on pricing, and currency conversions
 */

export interface WebPlanOption {
  type: "subscription" | "onetime";
  priceInr: string;
  priceUsd: string;
  periodLabelInr: string;
  periodLabelUsd: string;
  subDetailInr?: string;
  subDetailUsd?: string;
  inclusions: string[];
}

export interface WebsitePricingCardData {
  id: string;
  category: string;
  title: string;
  badge: string;
  highlight?: boolean;
  summary: string;
  subscription: WebPlanOption;
  onetime: WebPlanOption;
  note: string;
}

export interface FixedScopePricingData {
  id: string;
  category: string;
  title: string;
  badge: string;
  priceInr: string;
  priceUsd: string;
  priceLabelInr: string;
  priceLabelUsd: string;
  summary: string;
  inclusions: string[];
  ctaText: string;
  ctaUrl: string;
  highlight?: boolean;
}

export interface GeoSeoPricingData {
  id: string;
  category: string;
  title: string;
  badge: string;
  summary: string;
  oneTime: {
    title: string;
    priceInr: string;
    priceUsd: string;
    labelInr: string;
    labelUsd: string;
    inclusions: string[];
  };
  monthly: {
    title: string;
    priceInr: string;
    priceUsd: string;
    labelInr: string;
    labelUsd: string;
    inclusions: string[];
  };
  ctaText: string;
  ctaUrl: string;
}

export interface GrowthAddOnConfig {
  id: "images" | "reels" | "blogs";
  name: string;
  unitLabel: string;
  min: number;
  max: number;
  step: number;
  defaultQty: number;
  priceInrPerUnit: number;
  priceUsdPerUnit: number;
  desc: string;
}

export const PRICING_CONFIG = {
  websites: {
    customCoded: {
      id: "custom-coded",
      category: "Bespoke Engineering & Speed",
      title: "Custom Coded Website",
      badge: "MOST POPULAR",
      highlight: true,
      summary: "Bespoke Next.js & TypeScript architecture engineered for sub-second speeds, modern UI interactions, and compounding SEO authority.",
      subscription: {
        type: "subscription",
        priceInr: "₹12,000",
        priceUsd: "$399",
        periodLabelInr: "First Year (₹8,000/yr renewal)",
        periodLabelUsd: "First Year ($249/yr renewal)",
        subDetailInr: "First year: ₹12,000 • Yearly renewal: ₹8,000",
        subDetailUsd: "First year: $399 • Yearly renewal: $249/year",
        inclusions: [
          "We handle everything (Design, build, deployment & continuous care)",
          "Except hosting (Hosting is separate / set up on your own account)",
          "Everything will be shared with you (Full codebase & environment access)",
          "Daily automated web backup & uptime monitoring",
          "Up to 8 high-performance pages included",
          "3–7 Days express staging delivery",
          "Yearly plan includes website maintenance and updates",
          "Generative Engine Optimization (GEO) & llms.txt manifest",
          "4 Pre-loaded topical authority SEO articles",
        ],
      },
      onetime: {
        type: "onetime",
        priceInr: "₹15,000",
        priceUsd: "$499",
        periodLabelInr: "One-Time Milestone",
        periodLabelUsd: "One-Time Milestone",
        subDetailInr: "One time full build • Full asset handover",
        subDetailUsd: "One time full build • Full asset handover",
        inclusions: [
          "One time build: $499 / ₹15,000 (100% full source code ownership)",
          "You handle everything after launch (Maintenance & updates)",
          "All delivered with comprehensive written documentation & manuals",
          "Up to 8 high-performance custom pages included",
          "3–7 Days express staging delivery",
          "Core Web Vitals sub-second speed optimization",
          "100% Git repository transfer & DNS mapping",
          "30 Days post-launch QA support & warranty",
        ],
      },
      animationUpgrade: {
        title: "Animation Website",
        desc: "Add premium motion, transitions and interactive animations",
        priceInr: 10000,
        priceUsd: 299,
        priceInrFormatted: "+₹10,000",
        priceUsdFormatted: "+$299",
      },
      note: "Additional pages, advanced functionality, integrations, and custom requirements are quoted separately.",
    },

    wordpress: {
      id: "wordpress",
      category: "Elementor Visual Engine",
      title: "WordPress CMS",
      badge: "DRAG & DROP FREEDOM",
      highlight: false,
      summary: "Tailor-made for businesses and marketing teams needing complete visual editing control with Elementor Pro.",
      subscription: {
        type: "subscription",
        priceInr: "₹18,000",
        priceUsd: "$499",
        periodLabelInr: "First Year (₹8,000/yr renewal)",
        periodLabelUsd: "First Year ($249/yr renewal)",
        subDetailInr: "First year: ₹18,000 • Yearly renewal: ₹8,000",
        subDetailUsd: "First year: $499 • Yearly renewal: $249/year",
        inclusions: [
          "We handle everything (Theme setup, design, security & updates)",
          "Except hosting (Hosting is separate / set up on your own account)",
          "Everything will be shared with you, including web backup",
          "Up to 8 custom visual pages included",
          "7–10 Days delivery turnaround",
          "Yearly plan includes website maintenance and updates",
          "Enterprise security hardening & database caching",
          "4 Pre-loaded, keyword-optimized SEO articles",
        ],
      },
      onetime: {
        type: "onetime",
        priceInr: "₹22,000",
        priceUsd: "$699",
        periodLabelInr: "One-Time Milestone",
        periodLabelUsd: "One-Time Milestone",
        subDetailInr: "One time full build • 100% super admin handover",
        subDetailUsd: "One time full build • 100% super admin handover",
        inclusions: [
          "One time build: $699 / ₹22,000 (Complete site & database handover)",
          "You handle everything after launch (Maintenance & updates)",
          "All delivered with step-by-step written documentation & manuals",
          "Up to 8 custom visual pages included",
          "7–10 Days delivery turnaround",
          "100% Super Admin credentials & database ownership",
          "30 Days post-launch QA support & warranty",
        ],
      },
      note: "Additional pages, advanced functionality, integrations, and custom requirements are quoted separately.",
    } as WebsitePricingCardData,
  },

  shopify: {
    id: "shopify",
    category: "High-Conversion Storefront",
    title: "Shopify Commerce",
    badge: "CONVERSION ENGINE",
    priceInr: "₹30,000",
    priceUsd: "$999",
    priceLabelInr: "Starting Price",
    priceLabelUsd: "Starting Price",
    summary: "Conversion-engineered online stores built to maximize checkout completion, mobile speed, and product discovery.",
    inclusions: [
      "Custom Shopify storefront architecture",
      "1-Click express checkout & mobile drawer cart",
      "Multi-currency payment gateway & tax/shipping zone setup",
      "Structured Product & Offer JSON-LD schema",
      "4 Pre-loaded e-commerce authority blog posts",
      "100% Primary Account Holder ownership handover",
      "Written SOPs for inventory, order processing & discounts",
      "30 Days post-launch QA support & warranty",
    ],
    ctaText: "GET A QUOTE ↗",
    ctaUrl: "/contact?action=quote&service=shopify",
    highlight: false,
  } as FixedScopePricingData,

  webApplications: {
    id: "web-applications",
    category: "Full-Stack Architecture",
    title: "Custom Web Applications",
    badge: "ENTERPRISE & SAAS",
    priceInr: "₹50,000",
    priceUsd: "$1,499",
    priceLabelInr: "Starting Price / Milestone Sprints",
    priceLabelUsd: "Starting Price / Milestone Sprints",
    summary: "Custom portals, internal business dashboards, client portals, and multi-tenant SaaS MVP platforms.",
    inclusions: [
      "Full-stack modular UI & scalable backend API architecture",
      "Role-Based Access Control (RBAC) & secure authentication",
      "Real-time database schemas & REST/GraphQL endpoints",
      "Structured JSON-LD metadata for public application pages",
      "4 Pre-loaded knowledge base & onboarding articles",
      "100% Git repository, DB schema, and API key handover",
      "Step-by-step written deployment and infrastructure SOPs",
      "30 Days post-launch QA support & warranty",
    ],
    ctaText: "GET A QUOTE ↗",
    ctaUrl: "/contact?action=quote&service=web-applications",
    highlight: false,
  } as FixedScopePricingData,

  aiSearchSeo: {
    id: "ai-search-seo",
    category: "GEO & Knowledge Graph",
    title: "AI Search & SEO / GEO",
    badge: "DUAL-ENGINE AUTHORITY",
    summary: "Optimize for citation in ChatGPT, Perplexity, Google AI Overviews, and traditional organic Google search rankings.",
    oneTime: {
      title: "Foundational GEO Sprint — One Time",
      priceInr: "₹15,000",
      priceUsd: "$499",
      labelInr: "One-Time Sprint Setup",
      labelUsd: "One-Time Sprint Setup",
      inclusions: [
        "Generative Engine Optimization (GEO) & semantic entity mapping",
        "Machine-readable llms.txt AI manifest file deployment",
        "Deep JSON-LD schema network (Organization, Service, FAQPage)",
        "Dynamic sitemap.xml, robots.txt & Core Web Vitals audit",
        "4 Keyword-targeted topical cluster authority articles",
        "Google Search Console & Bing Webmaster ownership handover",
        "Written manual for organic ranking and indexation tracking",
      ],
    },
    monthly: {
      title: "Monthly Ongoing Growth — Retainer",
      priceInr: "₹10,000",
      priceUsd: "$299",
      labelInr: "/ month",
      labelUsd: "/ month",
      inclusions: [
        "Continuous weekly GEO & traditional SEO optimization sprints",
        "Topical entity expansions & new authority blog additions",
        "Continuous schema updates for new services & FAQ clusters",
        "AI Search citation tracking (ChatGPT, Perplexity, Gemini)",
        "Search Console indexation monitoring & Core Web Vitals maintenance",
        "Monthly transparent organic performance & ranking reports",
        "Zero long-term lock-in & monthly cancellation freedom",
      ],
    },
    ctaText: "GET A QUOTE ↗",
    ctaUrl: "/contact?action=quote&service=ai-search-seo",
  } as GeoSeoPricingData,

  businessGrowth: {
    id: "business-growth",
    category: "Inbound Lead Funnels",
    title: "Business Growth & Social Management",
    badge: "INTERACTIVE BUILDER",
    basePriceInr: 15000,
    basePriceUsd: 499,
    summary: "Strategic organic social media management and lead funnels to build brand authority and inbound deal flow.",
    coreInclusions: [
      "Base monthly package includes: 8 Image Posts, 4 Reels & 4 Authority Blogs",
      "High-retention copywriting, storytelling, and brand tone design",
      "Multi-channel profile optimization (LinkedIn, Instagram, X)",
      "Bi-weekly performance telemetry & inquiry tracking",
      "100% account and creative asset ownership with zero agency lock-in",
    ],
    addOns: [
      {
        id: "images",
        name: "Additional Image Posts",
        unitLabel: "post",
        min: 0,
        max: 16,
        step: 2,
        defaultQty: 0,
        priceInrPerUnit: 500, // ₹500 per extra image post
        priceUsdPerUnit: 20,
        desc: "Custom branded graphic carousel or static post",
      },
      {
        id: "reels",
        name: "Additional Reels / Shorts",
        unitLabel: "reel",
        min: 0,
        max: 12,
        step: 1,
        defaultQty: 0,
        priceInrPerUnit: 1500, // ₹1,500 per extra dynamic reel edit
        priceUsdPerUnit: 50,
        desc: "High-hook 9:16 vertical edit with kinetic captions",
      },
      {
        id: "blogs",
        name: "Additional Blog Posts",
        unitLabel: "article",
        min: 0,
        max: 8,
        step: 1,
        defaultQty: 0,
        priceInrPerUnit: 1200, // ₹1,200 per extra 1,200+ word SEO blog
        priceUsdPerUnit: 40,
        desc: "SEO & GEO-optimized authority article for website",
      },
    ] as GrowthAddOnConfig[],
  },

  videoEditing: {
    id: "video-editing",
    category: "Short-Form & Reels",
    title: "Video Editing Services",
    badge: "BATCH PRODUCTION",
    priceDisplay: "Get Quote",
    priceLabel: "Custom Batch Sprints",
    summary: "High-hook vertical video editing for Instagram Reels, YouTube Shorts, and healthcare/clinic patient education.",
    inclusions: [
      "48–72h rapid batch delivery turnaround",
      "Dynamic kinetic typography, sound design, and pattern interrupts",
      "Healthcare procedure and clinic patient education pacing",
      "Multi-format exports (9:16 Vertical, 16:9 HD, 1:1 Feed)",
      "100% Master project files (.prproj / CapCut / .xml) transferred",
      "Zero licensing restrictions or usage royalties",
    ],
    ctaText: "GET A QUOTE ↗",
    ctaUrl: "/contact?action=quote&service=video-editing",
    highlight: false,
  },

  creativeBranding: {
    id: "creative-branding",
    category: "Canva Master Links",
    title: "Creative & Branding",
    badge: "PRINT-READY",
    priceDisplay: "Get Quote",
    priceLabel: "Collateral & Brand Sprints",
    summary: "Cohesive visual identities, corporate brochures, event flyers, and 100% editable Canva team master links.",
    inclusions: [
      "Corporate bi-fold/tri-fold brochure & business flyer design",
      "Print-ready CMYK 300 DPI exports with crop marks and bleed",
      "100% Editable Canva team master links handed over",
      "Vector logo files, color palettes, and typography rules",
      "Unrestricted commercial copyright & IP ownership",
      "Step-by-step written guide for print vendor specifications",
    ],
    ctaText: "GET A QUOTE ↗",
    ctaUrl: "/contact?action=quote&service=creative-branding",
    highlight: false,
  },
};
