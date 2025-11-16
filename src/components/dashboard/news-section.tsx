
import { getNewsData } from "@/lib/data";
import NewsSummary from "@/components/dashboard/news-summary";

export default async function NewsSection() {
  const newsResponse = await getNewsData();
  
  return <NewsSummary initialData={newsResponse.results} />;
}
