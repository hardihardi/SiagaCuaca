"use client";

import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "../ui/card";

export default function LocationHandler() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGeolocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation tidak didukung",
        description: "Browser Anda tidak mendukung deteksi lokasi otomatis.",
      });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you'd use position.coords.latitude and position.coords.longitude
        // to get the city name via a reverse geocoding API.
        // For this mock, we'll just show a success toast.
        toast({
          title: "Lokasi ditemukan",
          description: "Menampilkan cuaca untuk lokasi Anda saat ini.",
        });
        setLoading(false);
      },
      () => {
        toast({
          variant: "destructive",
          title: "Gagal mendapatkan lokasi",
          description: "Mohon izinkan akses lokasi di browser Anda.",
        });
        setLoading(false);
      }
    );
  };

  return (
    <Card>
      <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Cari provinsi/kota..." className="pl-10" />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          Cari
        </Button>
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-0 flex items-center sm:relative sm:w-auto">
            <span className="w-full border-t sm:hidden" />
          </div>
          <div className="relative flex justify-center text-xs uppercase sm:bg-transparent sm:px-0">
            <span className="bg-card px-2 text-muted-foreground">atau</span>
          </div>
        </div>
        <Button variant="secondary" onClick={handleGeolocation} disabled={loading} className="w-full sm:w-auto">
          <MapPin className="mr-2 h-4 w-4" />
          {loading ? "Mencari..." : "Gunakan Lokasi Saya"}
        </Button>
      </div>
    </Card>
  );
}
