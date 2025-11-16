import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Peringatan Dini Cuaca</h1>
      <Card className="text-center py-20">
        <CardHeader>
            <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit">
                <AlertTriangle className="h-12 w-12 text-accent"/>
            </div>
          <CardTitle className="mt-4">Segera Hadir</CardTitle>
          <CardDescription>Halaman ini sedang dalam pengembangan.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Daftar lengkap semua peringatan dini cuaca yang aktif dari BMKG dan pusat informasi kesiapsiagaan bencana akan segera tersedia untuk Anda.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
