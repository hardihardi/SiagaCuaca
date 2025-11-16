
'use client';

import Image from 'next/image';
import type { NewsArticle } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight, Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

export default function NewsSummary({ initialData }: { initialData: NewsArticle[] }) {
    if (!initialData || !Array.isArray(initialData) || initialData.length === 0) {
        return (
             <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Berita & Artikel Terbaru</CardTitle>
                    <CardDescription>Informasi dan edukasi seputar cuaca, iklim, dan kebencanaan.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Gagal memuat berita atau tidak ada berita tersedia.</p>
                </CardContent>
                <CardFooter>
                    <Button asChild variant="secondary">
                        <Link href="/news">Lihat Semua Berita <ChevronRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </CardFooter>
            </Card>
        );
    }
    const featuredArticles = initialData.slice(0, 2);

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Berita & Artikel Terbaru</CardTitle>
                <CardDescription>Informasi dan edukasi seputar cuaca, iklim, dan kebencanaan.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    {featuredArticles.map(article => (
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
                                <div className="p-4">
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
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                 <Button asChild variant="secondary">
                    <Link href="/news">Lihat Semua Berita <ChevronRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
