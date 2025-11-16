'use client';

import type { AlertData } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function AlertsSummary({ initialData }: { initialData: AlertData[] }) {
    if (!initialData) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Peringatan Dini</CardTitle>
                    <CardDescription>Peringatan cuaca terbaru</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Memuat peringatan...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Peringatan Dini</CardTitle>
                <CardDescription>Peringatan cuaca terbaru</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                {initialData.length > 0 ? (
                    initialData.slice(0, 2).map(alert => (
                        <div key={alert.id} className="flex items-start gap-4 p-3 bg-accent/10 rounded-lg border border-accent/20 hover:bg-accent/20 transition-colors">
                            <div className="p-2 bg-accent/20 rounded-full mt-1">
                                <AlertTriangle className="h-5 w-5 text-accent-foreground" />
                            </div>
                            <div>
                                <h4 className="font-semibold">{alert.title}</h4>
                                <p className="text-sm text-muted-foreground">{alert.area}</p>
                                <p className="text-xs text-muted-foreground">{alert.time}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                        <p>Tidak ada peringatan dini saat ini.</p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                 <Button asChild variant="secondary" className="w-full">
                    <Link href="/alerts">Semua Peringatan <ChevronRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
