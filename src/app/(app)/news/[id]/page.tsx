
import { getNewsArticleById } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, ArrowLeft, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const article = await getNewsArticleById(params.id);

  if (!article) {
    notFound();
  }

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
                        <span>{article.date}</span>
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
                <CardContent className="pt-6">
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Konten Artikel</AlertTitle>
                        <AlertDescription>
                            Konten artikel lengkap tidak tersedia di aplikasi ini. Silakan kunjungi sumber asli untuk membaca lebih lanjut.
                        </AlertDescription>
                    </Alert>
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
