export interface Solution {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  deliverables: string[];
  features: { title: string; desc: string }[];
  ownershipPledge: string;
  pricingTeaser: string;
  idealFor: string;
  faq: { q: string; a: string }[];
}

export const SOLUTIONS: Solution[] = [
  {
    id: "custom-coded",
    slug: "custom-coded",
    number: "01",
    title: "Custom Coded Websites",
    subtitle: "High-Performance Next.js Web Experiences",
    shortDesc: "Bespoke Next.js applications engineered for extreme speed, Core Web Vitals excellence, and complete Git repository ownership.",
    fullDesc: "Engineered from the ground up on Next.js App Router architecture. We build zero-bloat, ultra-fast web experiences with bespoke animations, scalable component structures, and pristine semantic markup that converts visitors and dominates search algorithms.",
    iconName: "Code2",
    badge: "Next.js & React",
    deliverables: [
      "App Router architecture & modern React components",
      "Clean, modular component hierarchy",
      "Core Web Vitals & 95+ PageSpeed performance optimization",
      "Custom interactive forms & API integrations",
      "Comprehensive SEO architecture & schema markup",
      "4 pre-loaded SEO-optimized editorial articles",
      "100% Git repository handover & deployment setup",
      "Written codebase management & deployment documentation"
    ],
    features: [
      { title: "Sub-Second Load Times", desc: "Built with zero heavy CMS bloat, static optimization, and server-side rendering for instant page transitions." },
      { title: "Bespoke Design & Motion", desc: "Pixel-perfect implementations using modern CSS tokens, smooth Framer Motion-grade transitions, and responsive fluid typography." },
      { title: "Complete Source Freedom", desc: "You receive full ownership of the GitHub repository, clean commit history, and Vercel/AWS setup instructions." }
    ],
    ownershipPledge: "You own 100% of the source code, repository, assets, and hosting accounts with zero vendor lock-in.",
    pricingTeaser: "Express Staging in 3–7 Days • 10-Day Handover Target",
    idealFor: "Tech companies, high-growth startups, premium service agencies, and brands requiring uncompromising performance.",
    faq: [
      { q: "What tech stack do you use for custom coded builds?", a: "We leverage Next.js (App Router), React, TypeScript, Tailwind CSS / Vanilla CSS design tokens, and deploy on modern platforms like Vercel or AWS." },
      { q: "How do we make content updates without a traditional CMS?", a: "We provide structured MDX or headless CMS integration along with detailed step-by-step written documentation so your team can easily update text, images, and blog posts." }
    ]
  },
  {
    id: "wordpress",
    slug: "wordpress",
    number: "02",
    title: "WordPress CMS Websites",
    subtitle: "Elementor-Powered Visual Editing",
    shortDesc: "Custom-designed WordPress websites built strictly on Elementor visual builder for total drag-and-drop editorial freedom.",
    fullDesc: "Eliminate the technical friction of managing a website. We design custom, high-converting WordPress sites powered strictly by Elementor, granting your non-technical team the power to update copy, swap imagery, and launch landing pages in minutes.",
    iconName: "LayoutTemplate",
    badge: "WordPress & Elementor",
    deliverables: [
      "Custom Elementor Pro visual page builder configuration",
      "Bespoke visual theme design (no pre-made bloated templates)",
      "Enterprise security hardening & firewall configuration",
      "Database optimization & Redis object caching",
      "Flawless multi-device mobile optimization",
      "4 pre-loaded SEO-optimized articles in WordPress blog",
      "Full Super Admin credentials & master ownership transfer",
      "Written WordPress & Elementor administration manual"
    ],
    features: [
      { title: "Intuitive Visual Editing", desc: "Empower your marketing and sales team to edit content live on the front-end without touching a single line of code." },
      { title: "Performance-Hardened Core", desc: "Stripped of unneeded plugin overhead to guarantee rapid page loads, clean asset delivery, and rock-solid uptime." },
      { title: "Independent Hosting", desc: "Hosted directly on your own Hostinger, Cloudways, or WP Engine account. $0 agency markup on hosting." }
    ],
    ownershipPledge: "Complete Super Administrator transfer with unrestricted database, file system, and hosting access.",
    pricingTeaser: "3–7 Day Staging • Super Admin Handover on Day 10",
    idealFor: "Marketing teams, service businesses, clinics, consultancies, and brands requiring autonomous daily content updates.",
    faq: [
      { q: "Do you use pre-made ThemeForest templates?", a: "Never. We build bespoke custom layouts directly in Elementor tailored to your brand identity, guaranteeing a unique, high-end presentation." },
      { q: "Will I need to pay Grow Invicta for routine text edits?", a: "No! We provide comprehensive written administration guides so your team can manage 100% of day-to-day edits autonomously." }
    ]
  },
  {
    id: "shopify",
    slug: "shopify",
    number: "03",
    title: "Shopify E-Commerce Stores",
    subtitle: "High-Converting Commerce Architecture",
    shortDesc: "Conversion-engineered Shopify storefronts with express checkouts, global payment routing, and full store ownership.",
    fullDesc: "We design and engineer bespoke Shopify storefronts focused on friction-free purchasing, high average order value (AOV), seamless payment gateway integrations, and flawless multi-device checkout flows.",
    iconName: "ShoppingBag",
    badge: "Shopify Partner",
    deliverables: [
      "Custom high-conversion Shopify storefront architecture",
      "Optimized 1-page express checkout configuration",
      "Domestic & international payment gateway integration (Stripe, Razorpay, etc.)",
      "Multi-currency & localized market setup",
      "Tax, shipping zones & automated email notification configuration",
      "Catalog upload, collections & inventory tracking setup",
      "4 pre-loaded SEO authority articles in Shopify blog",
      "Complete Primary Store Owner account handover"
    ],
    features: [
      { title: "Frictionless Checkout", desc: "Engineered to maximize conversions with optimized cart drawers, upsell modules, and lightning-fast checkout." },
      { title: "Global Commerce Ready", desc: "Integrated multi-currency conversion, automated tax calculation, and international shipping routing." },
      { title: "Direct Shopify Account", desc: "You pay Shopify directly. Grow Invicta transfers primary store ownership on milestone completion." }
    ],
    ownershipPledge: "Primary Store Ownership transferred directly to your email with full staff permissions and billing control.",
    pricingTeaser: "Express 3–7 Day Staging • Complete Store Handover Day 10",
    idealFor: "DTC brands, consumer retail, product founders, and expanding retail businesses scaling online sales.",
    faq: [
      { q: "Can I manage products and discounts myself?", a: "Yes. Shopify provides an intuitive dashboard, and we provide step-by-step written documentation covering product management, order processing, and discount creation." }
    ]
  },
  {
    id: "web-applications",
    slug: "web-applications",
    number: "04",
    title: "Custom Web Applications",
    subtitle: "Scalable Cloud Platforms & Portals",
    shortDesc: "Robust business tools, customer portals, and internal dashboards built with secure auth and real-time database architecture.",
    fullDesc: "From custom SaaS portals to client-facing dashboards and internal operational tools, we build scalable web applications with secure role-based access, real-time database synchronization, and clean API integrations.",
    iconName: "Cpu",
    badge: "Full-Stack SaaS",
    deliverables: [
      "Custom authenticated user portals & interactive dashboards",
      "Internal business workflow & management automation tools",
      "Enterprise-grade authentication & Role-Based Access Control (RBAC)",
      "Real-time database integration (Supabase, PostgreSQL, Firebase)",
      "RESTful & GraphQL API endpoint architecture",
      "Automated testing pipelines & CI/CD deployment",
      "100% source code repository & database ownership handover",
      "Complete technical system architecture documentation"
    ],
    features: [
      { title: "Scalable Architecture", desc: "Engineered to scale effortlessly with serverless backends and modern database partitioning." },
      { title: "Granular Security & RBAC", desc: "Industry-standard JWT authentication, OAuth integrations, and strict role-based permission sets." },
      { title: "Complete IP Transfer", desc: "All intellectual property, database schemas, and codebase repositories belong 100% to you." }
    ],
    ownershipPledge: "100% IP and source code transfer. No proprietary runtime locks or recurring agency developer fees.",
    pricingTeaser: "Modular Sprint Architecture • Transparent Milestones",
    idealFor: "SaaS startups, enterprise departments, B2B service firms, and organizations replacing manual spreadsheets with software.",
    faq: [
      { q: "Who owns the database and backend infrastructure?", a: "You do. Everything is deployed directly to your cloud infrastructure (AWS, Supabase, Vercel), ensuring zero third-party lock-in." }
    ]
  },
  {
    id: "ai-search-seo",
    slug: "ai-search-seo",
    number: "05",
    title: "AI Search & SEO / GEO",
    subtitle: "Generative Engine & Traditional Search Optimization",
    shortDesc: "Future-proof your organic visibility across Google Search, ChatGPT, Perplexity, and Claude with semantic entity mapping.",
    fullDesc: "Search has evolved beyond simple keywords. We optimize your digital presence for both traditional Google SERPs and modern AI search engines (ChatGPT Search, Perplexity AI, Google Gemini) using Generative Engine Optimization (GEO), semantic entity mapping, and structured JSON-LD data.",
    iconName: "SearchCheck",
    badge: "GEO & Organic Search",
    deliverables: [
      "Comprehensive traditional Technical & On-Page SEO audit",
      "Generative Engine Optimization (GEO) for AI search citations",
      "Semantic entity mapping & knowledge graph alignment",
      "Deep JSON-LD Schema markup (Organization, Product, Article, FAQ, LocalBusiness)",
      "Google Search Console & Bing Webmaster verification & sitemaps",
      "Keyword & conversational query topic cluster blueprint",
      "4 high-authority pre-loaded SEO articles with internal linking",
      "Realistic 60–90 day organic growth roadmap & KPI tracking guide"
    ],
    features: [
      { title: "Dual-Engine Visibility", desc: "Rank on traditional Google Search while simultaneously earning citations in AI answers on ChatGPT and Perplexity." },
      { title: "Semantic Knowledge Graph", desc: "Structure your business data so search engines understand your exact entities, services, and authority." },
      { title: "Honest Growth Timelines", desc: "We provide realistic 60–90 day indexing and authority roadmaps rather than fabricated overnight ranking claims." }
    ],
    ownershipPledge: "All Search Console accounts, analytics properties, and schema code remain directly owned by your business.",
    pricingTeaser: "Included in Core Web Packages • Standalone Audits Available",
    idealFor: "Businesses seeking sustainable, compounding organic inbound demand from both search engines and generative AI tools.",
    faq: [
      { q: "What is GEO (Generative Engine Optimization)?", a: "GEO optimizes your website's content structure, semantic entity definitions, and citations so that generative AI engines like ChatGPT, Claude, and Perplexity reference your brand when users ask conversational questions." }
    ]
  },
  {
    id: "business-growth",
    slug: "business-growth",
    number: "06",
    title: "Business Growth & Social Management",
    subtitle: "Inbound Demand & High-Converting Organic Reach",
    shortDesc: "Strategic organic social media management, editorial content calendars, and lead generation funnels.",
    fullDesc: "Build an authoritative, highly recognizable brand presence on LinkedIn, Instagram, and X. We craft high-converting content calendars, sharp copywriting, and strategic lead capture funnels that turn passive followers into active clients.",
    iconName: "TrendingUp",
    badge: "Organic Growth",
    deliverables: [
      "Comprehensive multi-platform organic social growth strategy",
      "Monthly editorial content calendars with structured posting schedules",
      "High-converting copy for LinkedIn posts, carousels & tweets",
      "Lead generation funnel & lead magnet landing page copy",
      "Targeted audience engagement & community growth frameworks",
      "Monthly transparent performance & analytics reporting",
      "100% master asset & copy document handover"
    ],
    features: [
      { title: "Authority-Driven Copy", desc: "Position your leadership team as category authorities with insightful, value-packed industry content." },
      { title: "Consistent Brand Voice", desc: "Maintain a polished, cohesive visual and textual tone across all active social channels." },
      { title: "Transparent Metrics", desc: "No vanity metric inflation. We measure genuine inbound inquiries, qualified leads, and brand mentions." }
    ],
    ownershipPledge: "You retain 100% ownership of all published copy, creative graphics, and analytics data.",
    pricingTeaser: "Monthly Growth Retainers • Transparent Deliverables",
    idealFor: "Founders, B2B agencies, healthcare practices, and executive brands wanting consistent organic inbound pipeline.",
    faq: [
      { q: "Do you run paid ad campaigns or focus on organic?", a: "We specialize in organic authority, high-converting copy, and sustainable inbound funnels that compound over time without requiring continuous ad spend." }
    ]
  },
  {
    id: "video-editing",
    slug: "video-editing",
    number: "07",
    title: "Video Editing",
    subtitle: "Short-Form & Branded Educational Video",
    shortDesc: "Premium short-form video production, healthcare educational reels, kinetic typography, and master project file handover.",
    fullDesc: "Engage your audience with cinematic short-form content designed for Instagram Reels, YouTube Shorts, and TikTok. We specialize in polished healthcare & clinic education, brand commercials, kinetic typography, and dynamic sound design.",
    iconName: "Video",
    badge: "Short-Form & Motion",
    deliverables: [
      "High-impact Instagram Reels, YouTube Shorts & TikTok edits",
      "Specialized healthcare clinic & doctor educational video series",
      "Brand promotional commercials & product showcases",
      "Custom kinetic typography & animated text overlays",
      "Dynamic sound design, audio leveling & background score mixing",
      "Multi-format exports: 9:16 vertical, 16:9 widescreen, 1:1 square",
      "High-resolution 4K/1080p master file delivery",
      "Complete project archive & master file link handover"
    ],
    features: [
      { title: "High-Retention Hook Pacing", desc: "Engineered with punchy visual cuts, subtitles, and motion graphics to maintain high viewer retention." },
      { title: "Healthcare & Clinic Focus", desc: "Turn complex medical topics into clear, trust-building educational videos that patients understand." },
      { title: "Master File Handover", desc: "We deliver full master project archives and source assets so your team is never locked into an editor." }
    ],
    ownershipPledge: "Full master project file handover, clean exports, and royalty-free audio licensing transfer.",
    pricingTeaser: "Batch Video Packages • Fast Turnaround Cycles",
    idealFor: "Clinics, doctors, creators, founders, and DTC brands needing regular high-quality video content.",
    faq: [
      { q: "What footage do we need to provide?", a: "You provide raw video recorded on a smartphone or camera, and our team handles all cutting, color grading, audio enhancement, kinetic captions, and sound design." }
    ]
  },
  {
    id: "creative-branding",
    slug: "creative-branding",
    number: "08",
    title: "Creative & Branding",
    subtitle: "Brand Identity & Print-Ready Marketing Collateral",
    shortDesc: "Cohesive visual identity systems, bi-fold/tri-fold brochures, flyers, and 100% editable Canva master link handover.",
    fullDesc: "Build an unmistakable brand presence with comprehensive visual identity systems and print-ready collateral. We design logos, color systems, corporate stationery, and marketing brochures delivered with 100% editable Canva master links.",
    iconName: "Sparkles",
    badge: "Visual Identity & Canva",
    deliverables: [
      "Comprehensive visual identity & typography guidelines",
      "Logo suite exports (SVG, PNG, EPS, favicon in dark/light variants)",
      "Bi-fold & tri-fold corporate marketing brochures",
      "Promotional flyers, one-pagers & executive pitch decks",
      "Print-ready CMYK 300 DPI exports with crop marks & bleed",
      "100% fully editable Canva master template links",
      "Social media brand kit & template suite",
      "Brand asset style guide & typography documentation"
    ],
    features: [
      { title: "Editable Canva Master Links", desc: "Never pay an agency for a simple text or date change. All collateral is delivered with live editable Canva links." },
      { title: "Print-Perfect Standards", desc: "Configured to exact 300 DPI CMYK print standards so your printed brochures look as stunning as digital proofs." },
      { title: "Complete IP Transfer", desc: "All logos, vector graphics, and collateral files become 100% your legal intellectual property." }
    ],
    ownershipPledge: "Full vector source assets and editable Canva master template links delivered upon final sign-off.",
    pricingTeaser: "Branding Kits & Collateral Sprints • Rapid Delivery",
    idealFor: "Growing enterprises, medical practices, local businesses, and corporate brands needing cohesive print and digital assets.",
    faq: [
      { q: "Why do you deliver Canva links instead of only Illustrator files?", a: "Canva links empower your internal team to make quick text, price, or date adjustments in seconds without requiring specialized graphic software or agency fees." }
    ]
  }
];

export const OPERATIONAL_GUARANTEES = [
  {
    number: "01",
    title: "3–7 Day Express Staging",
    tagline: "Rapid Working Prototype",
    desc: "Get your first working website staging environment in approximately 3–7 days instead of waiting weeks for a preliminary look.",
    iconName: "Zap"
  },
  {
    number: "02",
    title: "100% Full Ownership",
    tagline: "Target Handover: Day 10",
    desc: "Complete transfer of source code, Git repositories, Super Admin access, infrastructure billing, and Canva master links upon milestone completion.",
    iconName: "ShieldCheck"
  },
  {
    number: "03",
    title: "4 Pre-Loaded SEO Articles",
    tagline: "Authority Foundation",
    desc: "Every applicable web package includes four well-researched, SEO-focused editorial articles written and pre-loaded into your CMS.",
    iconName: "FileText"
  },
  {
    number: "04",
    title: "30 Days Post-Launch QA",
    tagline: "Peace-of-Mind Support",
    desc: "Dedicated 30-day post-launch quality assurance and issue resolution to ensure flawless performance and zero launch hiccups.",
    iconName: "HeartPulse"
  }
];

export const HOW_WE_WORK_STEPS = [
  {
    step: "01",
    title: "Discovery & Alignment",
    duration: "Day 1–2",
    desc: "We dissect your business goals, target audience, technical scope, and design preferences. Clear deliverables, zero ambiguity.",
    deliverable: "Scope agreement & architecture plan"
  },
  {
    step: "02",
    title: "Express Staging",
    duration: "Day 3–7",
    desc: "Our engineering and design sprint delivers a fully functioning, interactive staging environment for live review.",
    deliverable: "Working staging environment"
  },
  {
    step: "03",
    title: "Review & Refinement QA",
    duration: "Day 7–9",
    desc: "Iterative feedback, performance audits, mobile responsiveness checks, form verification, and cross-browser testing.",
    deliverable: "Polished production candidate"
  },
  {
    step: "04",
    title: "Complete Handover",
    duration: "Target: Day 10",
    desc: "100% transfer of source code, Super Admin credentials, direct hosting billing, written administration guides, and final launch.",
    deliverable: "Full ownership & launch"
  }
];

export const COMPANY_PILLARS = [
  {
    number: "01",
    title: "100% Client Ownership",
    subtitle: "Zero Vendor Lock-In",
    desc: "We believe you should own what you pay for. From source code and Git repositories to Canva templates and hosting accounts, everything is transferred to you."
  },
  {
    number: "02",
    title: "$0 Infrastructure Markup",
    subtitle: "Direct Provider Billing",
    desc: "We never mark up hosting, domain, or third-party SaaS fees. You pay providers like Vercel, AWS, or Cloudways directly, retaining full billing control."
  },
  {
    number: "03",
    title: "Realistic Growth Timelines",
    subtitle: "No Fabricated Promises",
    desc: "We don't sell 'rank #1 overnight' myths. We provide realistic 60–90 day indexing, GEO entity optimization, and sustainable organic roadmaps."
  },
  {
    number: "04",
    title: "Comprehensive Documentation",
    subtitle: "Written Step-by-Step Guides",
    desc: "Every project includes clear, written administration manuals so your non-technical team can operate and update your platform with total confidence."
  }
];

export const PRICING_PACKAGES = [
  {
    category: "Custom Web Sprints",
    title: "Next.js Custom Website",
    badge: "Peak Performance",
    priceRange: "Custom Scope Sprint",
    summary: "For tech brands, startups, and enterprises demanding sub-second load times and custom UI interactions.",
    deliverables: [
      "Next.js App Router & TypeScript codebase",
      "Express staging in 3–7 business days",
      "4 pre-loaded SEO-optimized editorial articles",
      "Core Web Vitals 95+ PageSpeed optimization",
      "Full Git repository ownership handover",
      "30 days dedicated post-launch QA support",
      "Written codebase & deployment manual"
    ],
    infrastructure: "Hosted on your own Vercel / AWS account ($0 agency markup)"
  },
  {
    category: "WordPress CMS",
    title: "Elementor Visual Website",
    badge: "Most Popular for Marketing Teams",
    priceRange: "Transparent Package",
    summary: "For businesses wanting a premium custom design with 100% drag-and-drop front-end editing freedom.",
    deliverables: [
      "Custom Elementor Pro visual builder theme",
      "Express staging in 3–7 business days",
      "4 pre-loaded SEO articles in WordPress blog",
      "Enterprise security hardening & database caching",
      "Super Admin credentials & full access transfer",
      "30 days post-launch QA support",
      "Written WordPress & Elementor admin guide"
    ],
    infrastructure: "Hosted on your own Hostinger / Cloudways account ($0 agency markup)"
  },
  {
    category: "Shopify E-Commerce",
    title: "Shopify Storefront Launch",
    badge: "Conversion Engine",
    priceRange: "Full Storefront Build",
    summary: "For DTC brands and retailers needing a high-converting storefront with friction-free checkout.",
    deliverables: [
      "Custom Shopify storefront architecture",
      "1-page express checkout & payment gateway setup",
      "4 pre-loaded SEO authority articles in blog",
      "Multi-currency, tax & automated email configuration",
      "Complete Primary Store Owner account handover",
      "30 days post-launch QA support",
      "Written Shopify store administration manual"
    ],
    infrastructure: "Direct Shopify subscription ($0 agency markup)"
  },
  {
    category: "Video Editing",
    title: "Short-Form & Clinic Batches",
    badge: "High Engagement",
    priceRange: "Monthly / Batch Sprints",
    summary: "For clinics, healthcare experts, and brands producing high-impact Reels, Shorts, and educational video.",
    deliverables: [
      "Instagram Reels, YouTube Shorts & TikTok edits",
      "Healthcare clinic patient education series",
      "Kinetic typography, captions & sound design",
      "Multi-ratio exports (9:16, 16:9, 1:1)",
      "High-resolution 4K/1080p master files",
      "Full master project archive links delivered"
    ],
    infrastructure: "Direct cloud storage / frame link handover"
  },
  {
    category: "Canva & Collateral",
    title: "Branding & Collateral Kit",
    badge: "100% Editable",
    priceRange: "Sprint Package",
    summary: "For brands needing cohesive print brochures, flyers, and visual identity with live editable links.",
    deliverables: [
      "Visual identity guidelines & vector logo suite",
      "Bi-fold & tri-fold corporate marketing brochures",
      "Promotional flyers & executive pitch one-pagers",
      "Print-ready CMYK 300 DPI exports with bleed",
      "100% live editable Canva master template links",
      "Written typography & brand asset guide"
    ],
    infrastructure: "Direct Canva links — zero software lock-in"
  }
];

export const PRICING_FAQS = [
  {
    q: "How does the payment milestone structure work?",
    a: "We operate on a transparent 50% upfront deposit to initiate the sprint and 50% upon final milestone completion and ownership handover. No hidden fees or recurring traps."
  },
  {
    q: "What is your revision policy?",
    a: "During the Review & QA stage (Days 7–9), we conduct dedicated rounds of refinements to ensure every layout, interaction, and mobile view meets strict quality standards before final sign-off."
  },
  {
    q: "How are third-party infrastructure and hosting fees handled?",
    a: "You pay your hosting and domain providers directly (Vercel, Hostinger, AWS, Shopify). Grow Invicta charges $0 agency markup, ensuring you maintain 100% billing control."
  },
  {
    q: "What happens if our internal team takes longer to provide content?",
    a: "We adhere strictly to our 3–7 day staging milestone. If client content dependencies cause delays, the timeline pauses cleanly and resumes immediately once materials are supplied."
  },
  {
    q: "What is the cancellation and refund policy?",
    a: "If a project is cancelled prior to staging delivery, unutilized deposit portions are handled according to our transparent Refund Policy. Third-party infrastructure costs paid directly to providers are non-refundable."
  }
];

export const PORTFOLIO_PROJECTS = [
  {
    id: "apex-health",
    title: "Apex Spine & Joint Institute",
    category: "Web Development",
    categoryKey: "web",
    speed: "Express 6-Day Delivery",
    challenge: "Outdated legacy website with 8-second load times and zero mobile conversions for patient bookings.",
    solution: "Custom Next.js App Router architecture with instant patient intake forms, interactive procedure guides, and 98 PageSpeed.",
    deliverables: "Next.js Codebase, 4 SEO Clinical Articles, Direct Vercel Deployment, Git Handover",
    outcome: "+185% increase in monthly appointment bookings, sub-second page loads across mobile.",
    image: "/brand/grow-invicta-logo.png",
    demoUrl: "https://cal.com/iamchethandm/30mincallwithchethan"
  },
  {
    id: "lumina-skin",
    title: "Lumina Aesthetics & Dermatology",
    category: "WordPress / Elementor",
    categoryKey: "wordpress",
    speed: "5-Day Staging Handover",
    challenge: "Clinic staff struggled with code-heavy updates and could not publish weekly skincare promotions.",
    solution: "Bespoke Elementor Pro architecture with visual drag-and-drop promotional modules and security hardening.",
    deliverables: "Custom Elementor Design, Super Admin Transfer, Written Admin Manual, 4 SEO Guides",
    outcome: "Marketing team launched 12 campaigns independently within first 60 days without agency fees.",
    image: "/brand/grow-invicta-logo.png",
    demoUrl: "https://cal.com/iamchethandm/30mincallwithchethan"
  },
  {
    id: "nordic-brew",
    title: "Nordic Artisan Coffee Roasters",
    category: "Shopify",
    categoryKey: "shopify",
    speed: "7-Day Storefront Launch",
    challenge: "High cart abandonment due to multi-step checkout and lack of regional payment options.",
    solution: "Engineered high-converting 1-page express checkout on Shopify with subscription recurring orders and Razorpay integration.",
    deliverables: "Shopify Storefront, Primary Store Handover, Tax & Shipping Setup, 4 Authority Articles",
    outcome: "+42% lift in checkout completion rate and 31% recurring subscription adoption.",
    image: "/brand/grow-invicta-logo.png",
    demoUrl: "https://cal.com/iamchethandm/30mincallwithchethan"
  },
  {
    id: "cardio-reels",
    title: "CardioCare Specialist Clinic",
    category: "Video Editing",
    categoryKey: "video",
    speed: "48-Hour Batch Turnaround",
    challenge: "Complex cardiovascular health advice was failing to connect with everyday patients on social media.",
    solution: "15-part kinetic caption short-form video series explaining heart symptoms, diet, and recovery in 9:16 format.",
    deliverables: "15 4K Reels, Sound Design, Kinetic Subtitles, Master Project Archive Links",
    outcome: "Over 450,000 organic views and a 3x increase in specialist consultation inquiries.",
    image: "/brand/grow-invicta-logo.png",
    demoUrl: "https://cal.com/iamchethandm/30mincallwithchethan"
  },
  {
    id: "strata-ventures",
    title: "Strata Global Ventures",
    category: "Canva Design & Collateral",
    categoryKey: "canva",
    speed: "4-Day Sprint",
    challenge: "Investment firm needed print-ready investor brochures and editable pitch one-pagers for international roadshows.",
    solution: "Complete visual identity kit, 12-page CMYK 300 DPI brochure, and 100% editable Canva master links.",
    deliverables: "Canva Master Links, CMYK 300 DPI Print Files, Vector Logo Suite, Brand Guidelines",
    outcome: "Firm seamlessly adapted slides for 8 pitch presentations in-house within 24 hours.",
    image: "/brand/grow-invicta-logo.png",
    demoUrl: "https://cal.com/iamchethandm/30mincallwithchethan"
  }
];

export const SEED_ARTICLES = [
  {
    slug: "honest-truth-about-ranking-google-ai-engines",
    title: "The Honest Truth About Ranking on Google and AI Engines (60–90 Day Breakdown)",
    category: "Search & GEO",
    readTime: "7 min read",
    date: "2026-08-10",
    author: "Grow Invicta Strategy Team",
    excerpt: "Why overnight ranking promises are fabricated myths, how generative engines like ChatGPT and Perplexity discover entities, and what a realistic 60–90 day search roadmap actually looks like.",
    content: `
### The Era of Search Has Bifurcated

For the past two decades, digital marketing agencies sold a predictable playbook: pack keywords into title tags, build backlink volumes, and promise top-tier rankings on Google.

In today's landscape, that playbook is incomplete. Search has bifurcated into two parallel discovery mechanisms:
1. **Traditional Algorithmic Search Engines** (Google, Bing)
2. **Generative Answer Engines** (ChatGPT Search, Perplexity AI, Claude, Google Gemini)

Understanding how these engines index, understand, and cite your brand is the difference between compounding organic authority and wasting budget on antiquated tactics.

---

### Why Overnight Ranking Promises Are Agency Deception

Any agency guaranteeing #1 Google rankings in 7 to 14 days is relying on short-lived black-hat techniques or low-competition vanity keywords that generate zero real business inquiries.

Search engines operate on crawl budgets, historical index validation, and user satisfaction signals (Core Web Vitals, bounce rates, dwell time). A sustainable organic campaign requires systematic milestone progression:

#### Phase 1: Days 1–30 — Technical Architecture & Entity Seeding
- Clean semantic HTML5 hierarchy and zero crawl errors.
- Schema.org structured data (Organization, LocalBusiness, FAQPage, MedicalEntity).
- Google Search Console and Bing Webmaster Tools sitemap validation.
- Publishing foundational topic-cluster seed articles (minimum 4 high-authority pieces).

#### Phase 2: Days 30–60 — Indexation & Semantic Entity Mapping
- Search engines index entity relationships and map domain topical authority.
- Generative engines ingest structured data and begin associating your brand with core problem queries.
- Initial impressions rise across secondary long-tail keywords.

#### Phase 3: Days 60–90 — Authority Compounding & Citation Growth
- Primary commercial queries climb into competitive SERP brackets.
- Generative AI engines cite your articles as reference sources for user conversational queries.
- Inbound organic conversions begin accelerating predictably.

---

### The Power of Generative Engine Optimization (GEO)

Generative Engine Optimization (GEO) is the discipline of structuring your digital content so that large language models (LLMs) parse, understand, and cite your business as an authoritative answer.

To dominate GEO:
- Use explicit JSON-LD structured data.
- Frame content with direct, unambiguous answers following H2/H3 question headers.
- Publish verified, factual data points that LLMs can extract with high confidence.

At Grow Invicta, every web build includes technical GEO configuration and four pre-loaded authority articles to kickstart this 60–90 day compounding curve from Day 1.
    `
  },
  {
    slug: "why-100-percent-source-file-canva-ownership-matters",
    title: "Why 100% Source File & Canva Link Ownership Matters for Growing Businesses",
    category: "Canva Design",
    readTime: "6 min read",
    date: "2026-08-05",
    author: "Grow Invicta Engineering",
    excerpt: "How traditional agency lock-in models hold client code and design assets hostage, and why direct ownership of Git repositories and editable Canva links protects your business valuation.",
    content: `
### The Hidden Trap of Agency Vendor Lock-In

One of the most pervasive anti-patterns in the agency industry is **asset lock-in**.

A business pays tens of thousands of dollars for a website and brand collateral, only to discover later:
- The agency owns the private GitHub repository and refuses to release the code without exit fees.
- Hosting is held inside a shared agency server where the client has no cPanel or billing control.
- Marketing brochures were exported only as flat PDFs, forcing the client to pay the agency $150/hour every time a phone number or date needs editing.

This model is built to create artificial dependency.

---

### The Grow Invicta Ownership Standard

We built Grow Invicta on a radically transparent principle: **You pay for it, you own it. Period.**

Here is what full ownership looks like in practice:

1. **100% Git Repository Handover**: For custom Next.js builds, the repository is created in or transferred directly to your organization's GitHub or GitLab account with full commit history.
2. **Super Admin WordPress & Shopify Access**: Full administrative credentials with unrestricted database and plugin permissions.
3. **$0 Infrastructure Markup**: Hosting accounts (Vercel, AWS, Cloudways, Hostinger) are set up under your billing details. You pay the exact wholesale price.
4. **Editable Canva Master Links**: All marketing collateral (brochures, flyers, pitch decks) is delivered with live editable Canva template links so your marketing team can adjust text, dates, and images in seconds.

---

### Protecting Your Enterprise Value

When investors, buyers, or partners conduct due diligence on your company, intellectual property clarity is paramount. Having unencumbered ownership of your digital assets, codebases, and brand files ensures your business value remains fully intact.
    `
  },
  {
    slug: "elementor-vs-traditional-cms-non-technical-teams",
    title: "Elementor vs. Traditional CMS: How Non-Technical Teams Edit Fast Without Code",
    category: "Elementor Guides",
    readTime: "5 min read",
    date: "2026-07-28",
    author: "Grow Invicta Web Team",
    excerpt: "Why custom Elementor implementations give marketing teams the agility to launch campaigns in hours without sacrificing page speed or brand consistency.",
    content: `
### The Marketing Agility Bottleneck

For marketing teams, waiting two weeks for a developer to change a hero banner, update pricing, or launch a seasonal landing page is fatal to momentum.

Traditional WordPress themes bloated with 40 plugins often crash on updates, while rigid custom-coded CMS solutions require developer tickets for minor adjustments.

The solution lies in **bespoke, performance-hardened Elementor Pro architecture**.

---

### Custom Design Meets Visual Simplicity

When built properly by experienced creative developers, Elementor provides the ideal balance:
- **True Drag-and-Drop Visual Editing**: What you see on screen is exactly what publishes live.
- **Global Design Tokens**: Typography, color palettes, and button styles are locked at the theme level, preventing accidental brand inconsistencies.
- **Zero Bloat Core**: We strip away unnecessary third-party addons, ensuring your site maintains fast load times and clean HTML output.

---

### How We Ensure Long-Term Independence

Every WordPress project delivered by Grow Invicta includes a comprehensive written step-by-step administration manual. We walk your team through:
1. Editing copy and swapping images directly on the page.
2. Publishing new blog articles and managing categories.
3. Creating new landing pages using pre-styled global design blocks.
4. Managing form submissions and lead notifications.
    `
  },
  {
    slug: "how-healthcare-clinics-doctors-use-short-form-video",
    title: "How Healthcare Clinics & Doctors Use Short-Form Video to Educate and Build Trust",
    category: "Video Marketing",
    readTime: "6 min read",
    date: "2026-07-20",
    author: "Grow Invicta Creative Studio",
    excerpt: "How medical practices and specialists turn complex clinical concepts into empathetic, high-retention 9:16 short-form video that drives patient consultations.",
    content: `
### Healthcare Is Built on Trust

When patients experience symptoms or evaluate medical procedures, their first instinct is no longer opening a physical directory—it is searching online and watching explanatory videos.

Clinics and doctors that communicate with empathy, clarity, and authority through short-form video (Instagram Reels, YouTube Shorts) build immediate patient rapport before the first consultation.

---

### The 3 Pillars of High-Converting Medical Short-Form Content

#### 1. The 3-Second Empathetic Hook
Address a specific patient question or common misconception immediately:
- *"Experiencing sharp knee pain when walking down stairs? Here is what your meniscus might be telling you."*
- Avoid generic greetings; dive straight into the patient's concern.

#### 2. Clear Visual Kinetic Typography
Over 70% of social video is consumed with sound muted. Clean, dynamic kinetic captions ensure that medical terminology is easily readable and fully accessible.

#### 3. Ethical Clinical Call to Action
Never make exaggerated medical guarantees. Direct viewers toward proper diagnostic consultations:
- *"Schedule a clinical evaluation with our specialist team at our Bengaluru center."*

---

### The Grow Invicta Healthcare Video Workflow

We streamline production for busy healthcare practitioners:
1. **Script Blueprinting**: We prepare 15–30 second medical educational scripts.
2. **Simple Smartphone Recording**: Doctors record using a phone and lapel mic.
3. **Studio Post-Production**: We handle color grading, kinetic typography, b-roll integration, and audio enhancement.
4. **Master Archive Delivery**: High-resolution 4K 9:16 exports and full source file handover.
    `
  }
];

export const TESTIMONIALS = [
  {
    quote: "Grow Invicta delivered our complete Next.js clinic portal in just 6 days. Best of all, they transferred the entire GitHub repository and Vercel hosting directly to us. Zero agency lock-in.",
    author: "Dr. Vikram Sethi",
    role: "Medical Director, Apex Health Institute",
    location: "Bengaluru, India"
  },
  {
    quote: "The editable Canva master links and written Elementor guides changed how our marketing team operates. We make daily updates in minutes without paying hourly developer fees.",
    author: "Ananya Rao",
    role: "Head of Marketing, Lumina Aesthetics",
    location: "Bengaluru, India"
  },
  {
    quote: "Our Shopify store launch was seamless. 1-page checkout was configured perfectly, and our 4 SEO articles were already ranking within 60 days.",
    author: "Karan Mehta",
    role: "Founder, Nordic Brews",
    location: "Mumbai, India"
  }
];
