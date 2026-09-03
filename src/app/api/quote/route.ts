import { NextRequest, NextResponse } from "next/server";

export interface QuotePayload {
  fullName: string;
  businessName?: string;
  email: string;
  phone: string;
  country?: string;
  service: string;
  existingWebsiteUrl?: string;
  requirement: string;
  timeline?: string;
  budget?: string;
  dynamicDetails?: Record<string, any>;
  honeypot?: string;
}

// 1. In-memory Rate Limiting (IP -> timestamps[])
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// 2. Duplicate submission prevention within 60 seconds (Signature -> timestamp)
const recentSubmissions = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 60 * 1000; // 60 seconds

// Periodic garbage collection for memory safety
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    rateLimitMap.forEach((timestamps, ip) => {
      const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (valid.length === 0) rateLimitMap.delete(ip);
      else rateLimitMap.set(ip, valid);
    });

    recentSubmissions.forEach((timestamp, hash) => {
      if (now - timestamp > DUPLICATE_WINDOW_MS) {
        recentSubmissions.delete(hash);
      }
    });
  }, 5 * 60 * 1000);
}

function sanitizeText(str: unknown, maxLen = 2000): string {
  if (typeof str !== "string") return "";
  return str.slice(0, maxLen).replace(/[<>]/g, "").trim();
}

function formatServiceName(serviceId: string): string {
  const serviceMap: Record<string, string> = {
    "custom-coded": "Custom Coded Website (Next.js & Motion)",
    "wordpress": "WordPress CMS (Elementor)",
    "shopify": "Shopify E-Commerce Store",
    "web-applications": "Custom Web Application & SaaS",
    "ai-search-seo": "AI Search & SEO / GEO",
    "business-growth": "Business Growth & Social Management",
    "video-editing": "Video Editing Services",
    "creative-branding": "Creative & Branding",
    "other": "Other / Custom Digital Scope",
  };
  return serviceMap[serviceId] || serviceId || "General Inquiry";
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown-client";
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }
    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);

    // 2. Request body parsing & size validation
    let body: QuotePayload;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed request payload." },
        { status: 400 }
      );
    }

    // 3. Honeypot check (Silent discard for spam bots)
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Request received." }, { status: 200 });
    }

    // 4. Server-side required field validation
    if (
      !body.fullName ||
      typeof body.fullName !== "string" ||
      !body.fullName.trim() ||
      !body.email ||
      typeof body.email !== "string" ||
      !body.email.trim() ||
      !body.phone ||
      typeof body.phone !== "string" ||
      !body.phone.trim() ||
      !body.requirement ||
      typeof body.requirement !== "string" ||
      !body.requirement.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (Name, Email, Phone, and Requirement)." },
        { status: 400 }
      );
    }

    // 5. Input length constraints
    if (
      body.fullName.length > 100 ||
      body.email.length > 150 ||
      body.phone.length > 35 ||
      body.requirement.length > 5000
    ) {
      return NextResponse.json(
        { success: false, error: "Submitted input exceeds maximum allowed length." },
        { status: 400 }
      );
    }

    // 6. Strict Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = sanitizeText(body.email, 150).toLowerCase();
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 7. Sanitize all payload fields
    const cleanName = sanitizeText(body.fullName, 100);
    const cleanBusiness = sanitizeText(body.businessName || "", 150);
    const cleanPhone = sanitizeText(body.phone, 35);
    const cleanCountry = sanitizeText(body.country || "", 100);
    const rawService = sanitizeText(body.service || "custom-coded", 100);
    const cleanService = formatServiceName(rawService);
    const cleanWebsite = sanitizeText(body.existingWebsiteUrl || "", 200);
    const cleanRequirement = sanitizeText(body.requirement, 4000);
    const cleanTimeline = sanitizeText(body.timeline || "Flexible / Planning Phase", 100);
    const cleanBudget = sanitizeText(body.budget || "Not specified", 100);

    // 8. Duplicate submission check (Signature based on email + requirement within 60s)
    const submissionSignature = `${cleanEmail}:${cleanRequirement.slice(0, 100)}`;
    const previousSubmissionTime = recentSubmissions.get(submissionSignature);
    if (previousSubmissionTime && now - previousSubmissionTime < DUPLICATE_WINDOW_MS) {
      return NextResponse.json(
        { success: false, error: "A duplicate request was recently submitted. Please wait before resubmitting." },
        { status: 429 }
      );
    }
    recentSubmissions.set(submissionSignature, now);

    const leadId = `GI-LEAD-${Date.now()}`;
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    }) + " (IST)";

    // Format service-specific configurations cleanly
    let dynamicDetailsFormatted = "None provided";
    if (body.dynamicDetails && Object.keys(body.dynamicDetails).length > 0) {
      dynamicDetailsFormatted = Object.entries(body.dynamicDetails)
        .map(([key, val]) => {
          const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
          const formattedVal = typeof val === "object" && val !== null ? JSON.stringify(val) : String(val);
          return `${formattedKey}: ${formattedVal}`;
        })
        .join("\n");
    }

    // 9. Web3Forms Access Key check
    const web3FormsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!web3FormsAccessKey) {
      console.error("[Quote API Critical Error]: WEB3FORMS_ACCESS_KEY is missing from environment variables.");
      return NextResponse.json(
        {
          success: false,
          error: "Notification service is currently unconfigured. Please try again or reach out to us directly.",
        },
        { status: 503 }
      );
    }

    const emailSubject = `New Quote Request — ${cleanService} — ${cleanName}`;

    // 10. Web3Forms Payload
    const web3FormsPayload: Record<string, any> = {
      access_key: web3FormsAccessKey,
      subject: emailSubject,
      from_name: `Grow Invicta — ${cleanName}`,
      to_email: "iamchethandm@gmail.com",
      replyto: cleanEmail,
      "Lead ID": leadId,
      "Submission Date/Time": timestamp,
      "Full Name": cleanName,
      "Email Address": cleanEmail,
      "Phone / WhatsApp": cleanPhone,
      "Business / Company": cleanBusiness || "Not provided",
      "Country": cleanCountry || "Not provided",
      "Selected Service": cleanService,
      "Existing Website": cleanWebsite || "None provided",
      "Preferred Timeline": cleanTimeline,
      "Budget Range": cleanBudget,
      "Service Configuration": dynamicDetailsFormatted,
      "Project Details / Requirement": cleanRequirement,
      botcheck: "",
    };

    // 11. Send to Web3Forms API
    const web3Response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(web3FormsPayload),
    });

    const web3Result = await web3Response.json().catch(() => null);

    if (!web3Response.ok || !web3Result?.success) {
      console.error("[Web3Forms Delivery Error]:", web3Result || web3Response.statusText);
      // Revert recent submission signature so the client can retry
      recentSubmissions.delete(submissionSignature);

      return NextResponse.json(
        {
          success: false,
          error: "Unable to deliver your quote request at this moment. Please try again shortly.",
        },
        { status: 502 }
      );
    }

    console.log(`[Quote Intake Success]: Lead ${leadId} delivered via Web3Forms successfully.`);

    // 12. Return confirmed success only after Web3Forms confirms successful delivery
    return NextResponse.json(
      {
        success: true,
        leadId,
        message: "Your quote request has been received. We will get back to you shortly.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Quote API Unexpected Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
