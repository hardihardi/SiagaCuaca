"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { provinces } from "@/lib/provinces";

export default function LocationHandler({ onLocationChange }: { onLocationChange: (location: string) => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("Jakarta");
  const { toast } = useToast();

  useEffect(() => {
    // Initial fetch for default location
    if(selectedProvince) {
      onLocationChange(selectedProvince);
    }
  }, []);

  const handleSelectionChange = (value: string) => {
    setSelectedProvince(value);
    onLocationChange(value);
    router.push(`/?location=${value}`);
  };

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
        // For this demo, we'll use a placeholder and fetch mock data for "Jakarta".
        const locationString = "Lokasi Saat Ini";
        setSelectedProvince("Jakarta"); // Fallback to Jakarta for mock data
        onLocationChange("Jakarta");
        router.push(`/?location=Jakarta`);
        toast({
          title: "Lokasi ditemukan",
          description: `Menampilkan cuaca untuk lokasi Anda (demo: Jakarta).`,
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
          <Select value={selectedProvince} onValueChange={handleSelectionChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Provinsi..." />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
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
          {loading ? "Mencari..." : "Gunakan Lokasi Saya Secara Akurat"}
        </Button>
      </div>
    </Card>
  );
}
