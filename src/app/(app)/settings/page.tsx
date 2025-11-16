import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola preferensi notifikasi dan akun Anda.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Notifikasi Push</CardTitle>
          <CardDescription>Dapatkan notifikasi real-time untuk gempa bumi dan peringatan cuaca penting.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-start gap-4">
                    <BellRing className="h-6 w-6 text-primary mt-1"/>
                    <div className="space-y-0.5">
                        <Label htmlFor="earthquake-notif" className="text-base font-medium">Notifikasi Gempa Bumi</Label>
                        <p className="text-sm text-muted-foreground">
                            Terima notifikasi untuk gempa dengan magnitudo di atas 5.0.
                        </p>
                    </div>
                </div>
                <Switch id="earthquake-notif" aria-label="Notifikasi Gempa Bumi" />
            </div>
             <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-start gap-4">
                    <BellRing className="h-6 w-6 text-accent mt-1"/>
                    <div className="space-y-0.5">
                        <Label htmlFor="weather-alert-notif" className="text-base font-medium">Notifikasi Peringatan Cuaca</Label>
                        <p className="text-sm text-muted-foreground">
                            Terima notifikasi untuk peringatan dini cuaca di lokasi Anda.
                        </p>
                    </div>
                </div>
                <Switch id="weather-alert-notif" aria-label="Notifikasi Peringatan Cuaca"/>
            </div>
        </CardContent>
      </Card>
      <div className="flex justify-start">
        <Button>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
