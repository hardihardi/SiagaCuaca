import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Berita & Artikel</h1>
      <Card className="text-center py-20">
        <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Newspaper className="h-12 w-12 text-primary"/>
            </div>
          <CardTitle className="mt-4">Segera Hadir</CardTitle>
          <CardDescription>Halaman ini sedang dalam pengembangan.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Kumpulan berita, artikel, dan rilis pers terbaru dari BMKG dan sumber terpercaya lainnya akan segera tersedia di sini untuk menambah wawasan Anda.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
