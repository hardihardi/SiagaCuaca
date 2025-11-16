
"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { provinces } from "@/lib/provinces";
import { citiesByProvince } from "@/lib/cities";

type CityData = {
  [key: string]: string[];
}

export default function LocationHandler({ onLocationChange }: { onLocationChange: (location: string) => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("Jakarta");
  const [selectedCity, setSelectedCity] = useState<string | null>("Jakarta");
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Initial fetch for default location
    if(selectedProvince) {
        const cities = (citiesByProvince as CityData)[selectedProvince] || [];
        setAvailableCities(cities);
        const cityToFetch = selectedCity || cities[0] || selectedProvince;
        onLocationChange(cityToFetch);
    }
  }, []);

  useEffect(() => {
    const cities = (citiesByProvince as CityData)[selectedProvince] || [];
    setAvailableCities(cities);
    // When province changes, reset city and fetch data for the first city or the province itself
    const newCity = cities[0] || null;
    setSelectedCity(newCity);
    const locationToFetch = newCity || selectedProvince;
    onLocationChange(locationToFetch);
    router.push(`/?location=${locationToFetch}`);
  }, [selectedProvince]);


  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    // The useEffect above will handle the rest
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    onLocationChange(value);
    router.push(`/?location=${value}`);
  }

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
        // For this demo, we'll use a placeholder and fetch mock data for "Jakarta".
        toast({
          title: "Lokasi ditemukan",
          description: `Menampilkan cuaca untuk lokasi Anda (demo: Jakarta).`,
        });
        setSelectedProvince("Jakarta");
        setSelectedCity("Jakarta");
        onLocationChange("Jakarta");
        router.push(`/?location=Jakarta`);
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
        <div className="w-full sm:w-1/3">
          <Select value={selectedProvince} onValueChange={handleProvinceChange}>
            <SelectTrigger>
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

        <div className="w-full sm:w-1/3">
           <Select value={selectedCity || ""} onValueChange={handleCityChange} disabled={availableCities.length === 0}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Kota/Kab." />
            </SelectTrigger>
            <SelectContent>
              {availableCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="hidden sm:flex items-center text-xs uppercase text-muted-foreground">atau</div>

        <Button variant="secondary" onClick={handleGeolocation} disabled={loading} className="w-full sm:w-auto">
          <MapPin className="mr-2 h-4 w-4" />
          {loading ? "Mencari..." : "Lokasi Saya"}
        </Button>
      </div>
    </Card>
  );
}
