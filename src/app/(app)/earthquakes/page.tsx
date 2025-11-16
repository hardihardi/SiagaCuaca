
import { getEarthquakeData } from "@/lib/data";
import type { EarthquakeData } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowDownUp, Waves } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getMagnitudeBadgeColor(magnitude: number): "default" | "secondary" | "destructive" {
    if (magnitude < 4) return "default";
    if (magnitude < 6) return "secondary";
    return "destructive";
}

export default async function EarthquakesPage() {
    const earthquakeData = await getEarthquakeData();
    const latestEarthquake = earthquakeData[0];
    const mapImage = PlaceHolderImages.find(p => p.id === 'earthquake-map');

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">Data Gempa Bumi</h1>
                <p className="text-muted-foreground">Informasi gempa bumi terkini yang terjadi di wilayah Indonesia.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Gempa Terbaru Dirasakan</CardTitle>
                    <CardDescription>{latestEarthquake.time}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="relative h-64 w-full rounded-lg overflow-hidden group">
                        <Image
                            src={mapImage?.imageUrl || "https://picsum.photos/seed/mapMain/600/400"}
                            alt={mapImage?.description || "Peta lokasi gempa utama"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={mapImage?.imageHint || "indonesia map"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <div className="text-white">
                                <h3 className="text-lg font-bold">{latestEarthquake.location}</h3>
                                <p className="text-sm">Koordinat: {latestEarthquake.coordinates.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <span className="text-muted-foreground">Magnitudo</span>
                            <span className="text-2xl font-bold">{latestEarthquake.magnitude}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <span className="text-muted-foreground">Kedalaman</span>
                            <span className="text-2xl font-bold">{latestEarthquake.depth}</span>
                        </div>
                         <div className="flex items-center justify-between rounded-lg border p-4">
                            <span className="text-muted-foreground">Waktu</span>
                            <span className="font-semibold text-right">{latestEarthquake.time.split(' ')[1]} WIB</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Gempa Bumi</CardTitle>
                    <CardDescription>Menampilkan {earthquakeData.length} gempa bumi terbaru.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Waktu</TableHead>
                                    <TableHead>Magnitudo</TableHead>
                                    <TableHead>Kedalaman</TableHead>
                                    <TableHead className="hidden md:table-cell">Lokasi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {earthquakeData.map((eq: EarthquakeData) => (
                                    <TableRow key={eq.id}>
                                        <TableCell className="font-medium text-xs sm:text-sm">{eq.time}</TableCell>
                                        <TableCell>
                                            <Badge variant={getMagnitudeBadgeColor(eq.magnitude)}>
                                                {eq.magnitude}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{eq.depth}</TableCell>
                                        <TableCell className="hidden md:table-cell">{eq.location}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
