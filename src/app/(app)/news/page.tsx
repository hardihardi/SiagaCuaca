
import { getNewsData } from "@/lib/data";
import type { NewsArticle } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";

export default async function NewsPage() {
  const newsData = await getNewsData();

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
                            <span>{article.date}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 pt-4">
        <Button variant="outline" disabled>Sebelumnya</Button>
        <span className="text-sm text-muted-foreground">Halaman 1 dari 1</span>
        <Button variant="outline" disabled>Berikutnya</Button>
      </div>
    </div>
  );
}
