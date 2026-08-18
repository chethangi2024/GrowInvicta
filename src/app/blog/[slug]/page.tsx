import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SEED_ARTICLES } from "@/lib/constants";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SEED_ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const article = SEED_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    return { title: "Article Not Found | Grow Invicta" };
  }

  return {
    title: `${article.title} | Grow Invicta Editorial`,
    description: article.excerpt,
  };
}

// Helper to format bold markdown tags **text** into JSX
function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function BlogArticleDetailPage({ params }: PageProps) {
  const article = SEED_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Publications</span>
        </Link>

        {/* Article Header */}
        <div className="mb-14 gsap-reveal-header">
          <div className="flex items-center gap-3 mb-6 font-mono text-xs text-zinc-500">
            <span className="text-white border border-white/[0.15] px-2 py-0.5 uppercase">
              {article.category}
            </span>
            <span>/</span>
            <span>{article.readTime}</span>
            <span>/</span>
            <span>{article.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed border-l-2 border-white pl-4 italic">
            {article.excerpt}
          </p>

          <div className="mt-8 flex items-center justify-between py-4 border-y border-white/[0.08] font-mono text-xs text-zinc-500">
            <div>
              Published by <strong className="text-white">{article.author}</strong>
            </div>
            <div>Grow Invicta Strategy</div>
          </div>
        </div>

        {/* Article Body */}
        <article className="space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
          {article.content.split("\n\n").map((block, idx) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("### ")) {
              return (
                <h2 key={idx} className="text-2xl font-bold text-white tracking-tight mt-12 mb-4 pt-4 border-t border-white/[0.08] gsap-reveal-header">
                  {trimmed.replace("### ", "")}
                </h2>
              );
            }

            if (trimmed.startsWith("#### ")) {
              return (
                <h3 key={idx} className="text-base font-bold text-zinc-200 mt-6 mb-2 font-mono">
                  {trimmed.replace("#### ", "")}
                </h3>
              );
            }

            if (trimmed.startsWith("---")) {
              return <hr key={idx} className="border-white/[0.08] my-8" />;
            }

            if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
              const lines = trimmed.split("\n");
              return (
                <ul key={idx} className="space-y-2 my-4 pl-4 list-disc marker:text-zinc-500">
                  {lines.map((l, lIdx) => (
                    <li key={lIdx} className="text-zinc-300 text-xs sm:text-sm">
                      {renderFormattedText(l.replace(/^[-\d.]\s*/, ""))}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={idx} className="text-zinc-300 leading-relaxed">
                {renderFormattedText(trimmed)}
              </p>
            );
          })}
        </article>

        {/* Post-Article Conversion Box */}
        <div className="mt-16 p-8 sm:p-12 border border-white/[0.1] bg-[#080808] flex flex-col sm:flex-row items-center justify-between gap-6 gsap-reveal-card">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Ready to implement these principles for your brand?
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Book a 30-minute discovery call to discuss your web build, SEO architecture, or video sprint.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary shrink-0"
          >
            <span>Book Strategy Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
