import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedArticles, getArticleBySlug } from "@/lib/constants";
import BlogArticleView from "@/components/blog/BlogArticleView";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getPublishedArticles().map((a) => ({
    slug: a.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: "Article Not Found | Grow Invicta" };
  }

  const canonicalUrl =
    article.canonicalUrl || `https://growinvicta.com/${article.slug}/`;

  const ogImages = article.featuredImage
    ? [
        {
          url: article.featuredImage.startsWith("http")
            ? article.featuredImage
            : `https://growinvicta.com${article.featuredImage}`,
          alt: article.featuredImageAlt || article.title,
        },
      ]
    : [];

  return {
    title: `${article.seoTitle || article.title} | Grow Invicta`,
    description: article.metaDescription || article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.metaDescription || article.excerpt,
      url: canonicalUrl,
      siteName: "Grow Invicta",
      type: "article",
      publishedTime: article.publishedAt || article.date,
      ...(ogImages.length > 0 ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle || article.title,
      description: article.metaDescription || article.excerpt,
      ...(ogImages.length > 0 ? { images: [ogImages[0].url] } : {}),
    },
  };
}

export default function DirectSlugPage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return <BlogArticleView article={article} />;
}
