
import { getNewsArticleById } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, ArrowLeft, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { summarizeArticle } from "@/ai/flows/summarize-article-flow";

function formatDate(dateString: string) {
    if (!dateString) return "Tanggal tidak diketahui";
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }) + " WIB";
    } catch (e) {
        return dateString;
    }
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const article = await getNewsArticleById(params.id);

  if (!article) {
    notFound();
  }

  // Generate summary using AI
  const summary = await summarizeArticle({ articleContent: article.content || article.description || "" });

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-6">
            <Button asChild variant="outline" size="sm">
                <Link href="/news">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Berita
                </Link>
            </Button>
        </div>

        <article className="space-y-6">
            <header className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Tag className="h-4 w-4" />
                        <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(article.date)}</span>
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {article.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                    Sumber: <span className="font-semibold text-primary">{article.source}</span>
                </p>
            </header>
            
            <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden border">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    data-ai-hint={article.imageHint}
                    unoptimized
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Ringkasan</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">
                        {summary.summary}
                    </p>
                </CardContent>
            </Card>

            {article.link && (
                <div className="flex justify-end">
                    <Button asChild variant="secondary">
                        <Link href={article.link} target="_blank">
                            Baca Selengkapnya di {article.source}
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            )}
        </article>
    </div>
  );
}
