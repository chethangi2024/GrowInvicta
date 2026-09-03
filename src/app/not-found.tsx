import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass, FolderKanban, Sparkles, HelpCircle } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";
import AnimatedButton from "@/components/ui/animated-button";

export const metadata = {
  title: "404 - Page Not Found | Grow Invicta",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    { title: "Home", href: "/", desc: "Return to homepage overview", icon: Home },
    { title: "Portfolio", href: "/portfolio", desc: "Explore live client websites & creative works", icon: FolderKanban },
    { title: "Solutions", href: "/solutions", desc: "Discover our engineering & growth capabilities", icon: Compass },
    { title: "Pricing", href: "/pricing", desc: "Transparent sprint packages with zero markup", icon: Sparkles },
    { title: "FAQ", href: "/faq", desc: "Find instant answers to common questions", icon: HelpCircle },
  ];

  return (
    <div className="min-h-[85vh] pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)] flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main 404 Hero Card */}
        <BorderGlow
          className="p-8 sm:p-12 text-center"
          borderRadius={2}
          glowRadius={32}
          glowIntensity={1.2}
          colors={["#7C3AED", "#FF6A00", "#3B82F6"]}
          backgroundColor="#0D0F12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            HTTP 404 • Resource Not Found
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold font-mono tracking-tight text-[var(--text-primary)] mb-4">
            404
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-3">
            System Route Unresolved
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-lg mx-auto mb-8 leading-relaxed">
            The destination URL or asset you requested does not exist or has been relocated within our deployment architecture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <AnimatedButton href="/" variant="primary">
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Return to Homepage
              </span>
            </AnimatedButton>
            <AnimatedButton href="/portfolio" variant="secondary">
              <span className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4" />
                View Portfolio
              </span>
            </AnimatedButton>
          </div>

          {/* Quick Route Directory */}
          <div className="pt-8 border-t border-[var(--border)] text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-4">
              Direct Route Directory
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="p-3.5 rounded-[2px] bg-[var(--border-subtle)] border border-[var(--border-subtle)] hover:border-[#7C3AED]/40 hover:bg-[var(--card-bg-hover)] transition-all group block"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--text-primary)] group-hover:text-[#7C3AED] transition-colors">
                        <Icon className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[#7C3AED] transition-colors" />
                        {link.title}
                      </div>
                      <span className="text-zinc-600 group-hover:text-[var(--text-primary)] transition-colors text-xs font-mono">
                        →
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                      {link.desc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </BorderGlow>
      </div>
    </div>
  );
}
