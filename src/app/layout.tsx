import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ScrollSectionAnimator from "@/components/animations/ScrollSectionAnimator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grow Invicta | Premium Digital Experiences Without Agency Lock-In",
  description:
    "Fast-track digital agency based in Bengaluru. Custom Next.js websites, WordPress/Elementor, Shopify stores, custom web applications, AI Search & SEO / GEO, video editing, and creative branding with 100% full client asset, source code, and infrastructure ownership.",
  keywords: [
    "Grow Invicta",
    "Digital Agency Bengaluru",
    "Custom Web Development",
    "Next.js Agency",
    "WordPress Elementor Websites",
    "Shopify Storefronts",
    "AI Search SEO GEO",
    "Healthcare Video Editing",
    "Canva Brand Design",
    "Zero Agency Lock In"
  ],
  authors: [{ name: "Grow Invicta" }],
  creator: "Grow Invicta",
  publisher: "Grow Invicta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Grow Invicta | Fast-Track Digital Experiences Without Agency Lock-In",
    description:
      "Custom websites, WordPress/Elementor, Shopify, web applications, SEO/GEO, video editing, and branding delivered with speed, transparency, and complete client ownership.",
    url: "https://growinvicta.com",
    siteName: "Grow Invicta",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow Invicta | Fast-Track Digital Experiences",
    description: "Launch digital experiences with speed, transparency, and 100% full ownership.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/GI-Favicon.webp", type: "image/webp" },
      { url: "/GI-Favicon.png", type: "image/png" },
      { url: "/brand/GI-Favicon.webp", type: "image/webp" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/GI-Favicon.webp",
    apple: "/GI-Favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <link rel="icon" type="image/webp" href="/GI-Favicon.webp" />
        <link rel="icon" type="image/png" href="/GI-Favicon.png" />
        <link rel="apple-touch-icon" href="/GI-Favicon.png" />
      </head>
      <body className="bg-[#050505] text-zinc-200 antialiased selection:bg-white selection:text-black min-h-screen flex flex-col">
        <ScrollSectionAnimator />
        <Navbar />
        <main className="flex-grow pt-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
