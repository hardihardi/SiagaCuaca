
import { getNewsData } from "@/lib/data";
import type { NewsArticle } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatDate(dateString: string) {
    if (!dateString) return "Tanggal tidak diketahui";
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
}

export default async function NewsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page;
  const newsResponse = await getNewsData(page);
  const newsData = newsResponse.results;
  const nextPage = newsResponse.nextPage;

  // newsdata.io doesn't provide previous page tokens, so we can't go back easily.
  // We'll only enable the 'Next' button.

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Berita & Artikel</h1>
        <p className="text-muted-foreground">
            Kumpulan berita, artikel, dan rilis pers terbaru seputar cuaca, iklim, dan kebencanaan.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsData.map((article: NewsArticle) => (
          <Link key={article.id} href={`/news/${article.id}`} className="group block">
            <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg">
                <div className="relative h-48 w-full">
                    <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={article.imageHint}
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                        <Badge variant="secondary">{article.source}</Badge>
                    </div>
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{article.category}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(article.date)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button variant="outline" disabled={true}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Sebelumnya
        </Button>
        <Button asChild variant="outline" disabled={!nextPage}>
          <Link href={`/news?page=${nextPage}`}>
            Berikutnya
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

    </div>
  );
}
