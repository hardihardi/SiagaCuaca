import { getNewsData } from "@/lib/data";
import NewsSummary from "@/components/dashboard/news-summary";
import { NewsSkeleton } from "./skeletons";

export default async function NewsSection() {
  const newsResponse = await getNewsData();
  
  if (!newsResponse || newsResponse.results.length === 0) {
    return <NewsSkeleton />;
  }

  return <NewsSummary initialData={newsResponse.results} />;
}
