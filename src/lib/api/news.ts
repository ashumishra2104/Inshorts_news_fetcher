import { createServerFn } from "@tanstack/react-start";
import { stories as mockStories } from "../../data/stories";
import type { Story } from "../../data/stories";
import { getServerConfig } from "../config.server";

interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// In-memory cache variables
let cachedStories: Story[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

function getCategoryAndStyle(title: string, description: string): { category: string; categoryStyle: "primary" | "critical" | "tertiary" } {
  const text = `${title} ${description || ""}`.toLowerCase();
  
  // Heuristics for TECHNOLOGY
  const techKeywords = [
    "tech", "quantum", "silicon", "ai", "artificial intelligence", "software", 
    "robot", "space", "crypto", "bitcoin", "apple", "google", "microsoft", 
    "meta", "nvidia", "cyber", "internet", "phone", "gadget", "semiconductor", 
    "chip", "comput", "app", "mobile", "developer", "science"
  ];
  
  // Heuristics for ECONOMY / BUSINESS
  const economyKeywords = [
    "economy", "market", "stock", "inflation", "central bank", "interest rate", 
    "fed", "fiscal", "dollar", "finance", "wall street", "acquisition", 
    "billionaire", "startup", "funding", "pricing", "cost", "tariff", "trade", 
    "revenue", "earnings", "profit", "bank", "wealth", "tax", "inflation"
  ];

  if (techKeywords.some(keyword => text.includes(keyword))) {
    return { category: "TECHNOLOGY", categoryStyle: "primary" };
  }
  
  if (economyKeywords.some(keyword => text.includes(keyword))) {
    return { category: "ECONOMY", categoryStyle: "tertiary" };
  }
  
  return { category: "BREAKING", categoryStyle: "critical" };
}

function mapArticlesToStories(articles: NewsApiArticle[]): Story[] {
  const mappedStories: Story[] = [];
  
  for (const art of articles) {
    if (art.title === "[Removed]" || !art.title) continue;

    const { category, categoryStyle } = getCategoryAndStyle(art.title, art.description || "");
    
    // Clean description of trailing NewsAPI truncated characters [+xxxx chars]
    let summary = art.description || art.content || "Click the source link to read the full article.";
    summary = summary.replace(/\s*\[\+\d+\s+chars\]$/, "").trim();

    // Use high-quality Unsplash fallbacks if image is missing or invalid
    let image = art.urlToImage;
    if (!image || !image.startsWith("http")) {
      if (category === "TECHNOLOGY") {
        image = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
      } else if (category === "ECONOMY") {
        image = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80";
      } else {
        image = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";
      }
    }

    mappedStories.push({
      id: art.url,
      category,
      categoryStyle,
      image,
      headline: art.title,
      summary,
      source: art.source?.name || "NEWSWIRE",
    });
  }

  return mappedStories;
}

export const getNews = createServerFn({ method: "GET" })
  .handler(async () => {
    const config = getServerConfig();
    const apiKey = config.newsApiKey;

    const now = Date.now();
    if (cachedStories && (now - cacheTime < CACHE_TTL)) {
      console.log("[News API Server] Serving articles from cache...");
      return { 
        stories: cachedStories, 
        source: "cache" as const,
        warning: null
      };
    }

    if (!apiKey) {
      console.warn("[News API Server] NEWS_API_KEY is missing. Using mock stories.");
      return { 
        stories: mockStories, 
        source: "mock" as const,
        warning: "NEWS_API_KEY is not configured. Showing demo articles."
      };
    }

    try {
      console.log("[News API Server] Fetching headlines from newsapi.org...");
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=30&apiKey=${apiKey}`
      );
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.status !== "ok") {
        throw new Error(data.message || "API returned status error");
      }

      const articles = (data.articles as NewsApiArticle[]) || [];
      const mapped = mapArticlesToStories(articles);

      if (mapped.length > 0) {
        cachedStories = mapped;
        cacheTime = now;
        return { 
          stories: mapped, 
          source: "api" as const,
          warning: null
        };
      } else {
        throw new Error("No valid articles after filtering");
      }
    } catch (err: any) {
      console.error("[News API Server] Error fetching from NewsAPI:", err.message);
      return { 
        stories: mockStories, 
        source: "mock" as const,
        warning: `API connection failed: ${err.message}. Showing demo articles.`
      };
    }
  });
