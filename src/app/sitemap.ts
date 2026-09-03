import { MetadataRoute } from "next";
import { getPublishedArticles, SOLUTIONS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://growinvicta.com";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Solutions capability subpages
  const solutionRoutes: MetadataRoute.Sitemap = SOLUTIONS.map((sol) => ({
    url: `${baseUrl}/solutions/${sol.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic published blog articles (Excludes drafts automatically)
  const publishedArticles = getPublishedArticles();
  const blogRoutes: MetadataRoute.Sitemap = publishedArticles.map((article) => {
    const canonical =
      article.canonicalUrl || `${baseUrl}/${article.slug}/`;

    return {
      url: canonical,
      lastModified: new Date(article.updatedDate || article.publishedAt || article.date),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...solutionRoutes, ...blogRoutes];
}
