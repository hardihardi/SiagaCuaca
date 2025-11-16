
'use client';

import type { NewsArticle } from "@/lib/types";
import NewsSummary from "@/components/dashboard/news-summary";

export default function NewsSection({ newsData }: { newsData: NewsArticle[] }) {
  return <NewsSummary initialData={newsData} />;
}
