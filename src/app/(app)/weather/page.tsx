import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CloudDrizzle } from "lucide-react";

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Prakiraan Cuaca Rinci</h1>
      <Card className="text-center py-20">
        <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <CloudDrizzle className="h-12 w-12 text-primary"/>
            </div>
          <CardTitle className="mt-4">Segera Hadir</CardTitle>
          <CardDescription>Halaman ini sedang dalam pengembangan.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Fitur prakiraan cuaca yang lebih rinci, termasuk data mingguan, peta cuaca interaktif (satelit, radar hujan), dan indeks kualitas udara akan segera tersedia di sini.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
