import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function EarthquakesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Data Gempa Bumi</h1>
      <Card className="text-center py-20">
        <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                <Activity className="h-12 w-12 text-primary"/>
            </div>
          <CardTitle className="mt-4">Segera Hadir</CardTitle>
          <CardDescription>Halaman ini sedang dalam pengembangan.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Daftar lengkap gempa bumi terbaru, arsip data, peta gempa interaktif dengan filter, serta informasi mitigasi bencana akan segera dapat Anda akses di sini.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
