"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, HelpCircle, Share2, Check, ChevronRight } from "lucide-react";
import { BlogArticle } from "@/lib/constants";
import TableOfContents, { generateSlug } from "@/components/blog/TableOfContents";
import ArticleAudioPlayer from "@/components/blog/ArticleAudioPlayer";
import RelatedArticles from "@/components/blog/RelatedArticles";

interface BlogArticleViewProps {
  article: BlogArticle;
}

// Formats inline markdown: **bold** and [link](url)
function renderFormattedText(text: string) {
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-[var(--text-primary)] font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkHref = linkMatch[2];
      const isInternal = linkHref.startsWith("/") || linkHref.startsWith("#");

      if (isInternal) {
        return (
          <Link
            key={i}
            href={linkHref}
            className="text-[#A78BFA] hover:text-white underline underline-offset-4 font-medium transition-colors"
          >
            {linkText}
          </Link>
        );
      }
      return (
        <a
          key={i}
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#A78BFA] hover:text-white underline underline-offset-4 font-medium transition-colors inline-flex items-baseline gap-0.5"
        >
          <span>{linkText}</span>
          <span className="text-[10px] opacity-70">↗</span>
        </a>
      );
    }
    return part;
  });
}

export default function BlogArticleView({ article }: BlogArticleViewProps) {
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]); // Open first FAQ by default
  const [copied, setCopied] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Structured Data (JSON-LD)
  const canonicalUrl =
    article.canonicalUrl || `https://growinvicta.com/${article.slug}/`;

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
    author: {
      "@type": "Person",
      name: article.author || "Chethan N",
      url: "https://growinvicta.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Grow Invicta",
      url: "https://growinvicta.com",
      logo: {
        "@type": "ImageObject",
        url: "https://growinvicta.com/brand/grow-invicta-logo-color.png",
      },
    },
    datePublished: article.publishedAt || article.date,
    ...(article.updatedDate ? { dateModified: article.updatedDate } : {}),
    ...(article.featuredImage
      ? {
          image: {
            "@type": "ImageObject",
            url: article.featuredImage.startsWith("http")
              ? article.featuredImage
              : `https://growinvicta.com${article.featuredImage}`,
          },
        }
      : {}),
    keywords: [
      article.primaryKeyword,
      ...(article.secondaryKeywords || []),
      ...(article.tags || []),
    ]
      .filter(Boolean)
      .join(", "),
    articleSection: article.category,
  };

  const faqSchema =
    article.faqs && article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq: any) => ({
            "@type": "Question",
            name: faq.q || faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a || faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://growinvicta.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://growinvicta.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.category,
        item: `https://growinvicta.com/blog?category=${encodeURIComponent(article.category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  // Split content blocks for TOC placement right after opening answer
  const rawBlocks = article.content.split("\n\n").map((b) => b.trim()).filter(Boolean);
  const firstHeadingIdx = rawBlocks.findIndex((b) => b.startsWith("## "));
  const introBlocks = firstHeadingIdx !== -1 ? rawBlocks.slice(0, firstHeadingIdx) : rawBlocks.slice(0, 2);
  const bodyBlocks = firstHeadingIdx !== -1 ? rawBlocks.slice(firstHeadingIdx) : rawBlocks.slice(2);

  const renderBlock = (trimmed: string, idx: number) => {
    // In-content Markdown Image ![alt](url)
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      const altText = imgMatch[1];
      const imgSrc = imgMatch[2];
      return (
        <figure key={idx} className="my-8 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card-bg)] shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={altText}
            loading="lazy"
            className="w-full h-auto max-h-[480px] object-cover object-center"
          />
          {altText && (
            <figcaption className="px-4 py-2.5 text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border)]/60 bg-[var(--section-bg)]/80 text-center sm:text-left">
              {altText}
            </figcaption>
          )}
        </figure>
      );
    }

    // H2 heading with stable anchor ID
    if (trimmed.startsWith("## ")) {
      const text = trimmed.replace("## ", "");
      const id = generateSlug(text);
      return (
        <h2
          key={idx}
          id={id}
          className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight mt-12 mb-4 pt-6 border-t border-[var(--border)] scroll-mt-28"
        >
          {text}
        </h2>
      );
    }

    // H3 heading with stable anchor ID
    if (trimmed.startsWith("### ")) {
      const text = trimmed.replace("### ", "");
      const id = generateSlug(text);
      return (
        <h3
          key={idx}
          id={id}
          className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight mt-8 mb-3 scroll-mt-28"
        >
          {text}
        </h3>
      );
    }

    // H4 heading
    if (trimmed.startsWith("#### ")) {
      return (
        <h4
          key={idx}
          className="text-base sm:text-lg font-bold text-[var(--text-primary)] mt-6 mb-2 font-mono"
        >
          {trimmed.replace("#### ", "")}
        </h4>
      );
    }

    // Divider
    if (trimmed.startsWith("---")) {
      return <hr key={idx} className="border-[var(--border)] my-8" />;
    }

    // Bullet or numbered list
    if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
      const lines = trimmed.split("\n");
      return (
        <ul
          key={idx}
          className="space-y-2.5 my-5 pl-5 list-disc marker:text-[#7C3AED]"
        >
          {lines.map((l, lIdx) => (
            <li key={lIdx} className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
              {renderFormattedText(l.replace(/^[-\d.]\s*/, ""))}
            </li>
          ))}
        </ul>
      );
    }

    // Table block detection (block starts with | and contains lines)
    if (trimmed.startsWith("|")) {
      const lines = trimmed.split("\n");
      const headers = lines[0].split("|").map(s => s.trim()).filter(Boolean);
      // Skip alignment line if present
      const hasAlignRow = lines[1] && lines[1].includes("---");
      const dataRows = lines.slice(hasAlignRow ? 2 : 1)
        .map(row => row.split("|").map(s => s.trim()).filter(Boolean))
        .filter(row => row.length > 0);

      return (
        <div key={idx} className="overflow-x-auto my-8 border border-[var(--border)] rounded-xl bg-[var(--card-bg)] shadow-md">
          <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--section-bg)]/80 text-[var(--text-primary)] font-mono uppercase tracking-wider text-[10px] sm:text-xs">
                {headers.map((h, hIdx) => (
                  <th key={hIdx} className="p-4 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]/60 text-[var(--text-secondary)]">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-[var(--card-bg-hover)] transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-4 align-top min-w-[140px] sm:min-w-[180px]">
                      {renderFormattedText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Standard paragraph
    return (
      <p key={idx} className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
        {renderFormattedText(trimmed)}
      </p>
    );
  };

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 bg-[var(--page-bg)] text-[var(--text-primary)]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumbs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Back to Blogs</span>
            </Link>
            <span className="text-[var(--border)]">|</span>
            <nav aria-label="Breadcrumbs" className="hidden sm:flex items-center gap-1.5 text-[var(--text-muted)]">
              <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-[var(--text-primary)] transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--text-secondary)]">{article.category}</span>
            </nav>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border)] rounded-md hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] bg-[var(--card-bg)] transition-all cursor-pointer"
            title="Copy article link"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-5 font-mono text-xs text-[var(--text-muted)]">
            <span className="text-[var(--text-primary)] border border-[var(--border)] px-2.5 py-0.5 uppercase tracking-wider font-semibold">
              {article.category}
            </span>
            <span>/</span>
            <span>{article.readTime}</span>
            <span>/</span>
            <span>{article.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-y border-[var(--border)] font-mono text-xs text-[var(--text-muted)]">
            <div>
              Published by <strong className="text-[var(--text-primary)]">{article.author || "Chethan N"}</strong>
            </div>
            <div>Grow Invicta Editorial &bull; Verified Publication</div>
          </div>
        </header>

        {/* Dedicated Featured Image (Rendered if assigned) */}
        {article.featuredImage && (
          <figure className="mb-10 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card-bg)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.featuredImage}
              alt={article.featuredImageAlt || article.title}
              className="w-full h-auto max-h-[520px] object-cover object-center"
            />
            {article.featuredImageAlt && (
              <figcaption className="px-4 py-2.5 text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border)] bg-[var(--section-bg)]">
                {article.featuredImageAlt}
              </figcaption>
            )}
          </figure>
        )}

        {/* Listen to This Article Web Speech Audio Controller */}
        <div className="mb-10">
          <ArticleAudioPlayer
            title={article.title}
            content={article.content}
            readTime={article.readTime}
          />
        </div>

        {/* Article Body with Opening Quick Answer & Dynamic TOC */}
        <article className="space-y-6 text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed font-sans">
          {/* Section 1: Opening Quick-Answer Hook */}
          {introBlocks.map((block, idx) => renderBlock(block, idx))}

          {/* Dynamic Table of Contents placed right after opening answer */}
          <TableOfContents content={article.content} />

          {/* Section 2: Rest of Article Body */}
          {bodyBlocks.map((block, idx) => renderBlock(block, idx + introBlocks.length))}
        </article>

        {/* Visible FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[var(--border)]" aria-labelledby="faq-heading">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>

            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-8"
            >
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {article.faqs.map((faq: any, fIdx) => {
                const isOpen = openFaqIndices.includes(fIdx);
                const questionText = faq.q || faq.question;
                const answerText = faq.a || faq.answer;
                return (
                  <div
                    key={fIdx}
                    className="border border-[var(--border)] bg-[var(--card-bg)] rounded-lg overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(fIdx)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[var(--text-primary)] hover:text-white transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{questionText}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#7C3AED] shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)]/60 pt-4">
                        <p>{answerText}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Publications (Auto-populated by Category) */}
        <RelatedArticles currentSlug={article.slug} category={article.category} />
      </div>
    </div>
  );
}
