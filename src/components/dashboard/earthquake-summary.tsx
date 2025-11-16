
import Image from 'next/image';
import { getEarthquakeData } from "@/lib/data";
import type { EarthquakeData } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default async function EarthquakeSummary() {
    const initialData = await getEarthquakeData();
    const latestEarthquake = initialData[0];
    const mapImage = PlaceHolderImages.find(p => p.id === 'earthquake-map');

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Gempa Terbaru</CardTitle>
                <CardDescription>Magnitudo {latestEarthquake.magnitude} - {latestEarthquake.time}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                <div className="relative h-40 w-full rounded-md overflow-hidden group">
                   <Image
                        src={mapImage?.imageUrl || "https://picsum.photos/seed/map1/600/400"}
                        alt={mapImage?.description || "Peta lokasi gempa"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={mapImage?.imageHint || "indonesia map"}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                        <div className="text-center text-white">
                            <p className="font-semibold">{latestEarthquake.location}</p>
                            <p className="text-sm">Kedalaman: {latestEarthquake.depth}</p>
                        </div>
                    </div>
                </div>
                <Separator />
                <ul className="space-y-2 text-sm">
                    {initialData.slice(1, 3).map(eq => (
                        <li key={eq.id} className="flex justify-between items-center text-muted-foreground hover:text-foreground transition-colors">
                            <span>{eq.location.split(',')[0]}...</span>
                            <span className="font-semibold text-foreground">M {eq.magnitude}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button asChild variant="secondary" className="w-full">
                    <Link href="/earthquakes">Lihat Semua Gempa <ChevronRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
