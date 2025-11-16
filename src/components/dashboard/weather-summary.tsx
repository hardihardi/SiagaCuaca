
"use client";
import type { WeatherData } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wind, Umbrella, Sun, Cloud, CloudRain, Zap } from "lucide-react";
import { localizeWeatherDescriptions } from '@/ai/flows/localize-weather-descriptions';
import { useState, useEffect } from 'react';
import React from "react";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const iconComponents = {
    Sun,
    Cloud,
    CloudRain,
    Zap,
};

type IconName = keyof typeof iconComponents;

const WeatherIcon = ({ name, className }: { name: IconName; className?: string }) => {
    const IconComponent = iconComponents[name] || Cloud;
    return <IconComponent className={className} />;
};


export default function WeatherSummary({ initialData }: { initialData: WeatherData }) {
    const [localizedDescription, setLocalizedDescription] = useState(initialData.condition);

    useEffect(() => {
        const fetchLocalizedDescription = async () => {
            if (!initialData.location || !initialData.condition) {
                setLocalizedDescription(initialData.condition);
                return;
            }
            try {
                const result = await localizeWeatherDescriptions({
                    location: initialData.location,
                    weatherDescription: initialData.condition,
                });
                setLocalizedDescription(result.localizedDescription);
            } catch (error) {
                console.error("Failed to localize weather description, falling back to original:", error);
                setLocalizedDescription(initialData.condition);
            }
        };

        fetchLocalizedDescription();
    }, [initialData]);

  return (
    <Card className="col-span-1 lg:col-span-2 row-span-2">
        <Link href={`/weather?location=${initialData.location.split(',')[0]}`} className="hover:bg-card/80 block rounded-lg transition-colors h-full">
            <div className="p-6 h-full flex flex-col">
                <CardHeader className="p-0">
                    <CardTitle className="flex items-center justify-between">
                    <span>Cuaca Saat Ini</span>
                    <WeatherIcon name={initialData.conditionIcon} className="h-8 w-8 text-primary" />
                    </CardTitle>
                    <CardDescription>{initialData.location}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex-1 flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row items-center justify-around text-center my-6 gap-6">
                        <div className="order-2 md:order-1">
                             <div className="grid grid-cols-3 gap-4 text-sm text-center">
                                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50">
                                    <Droplets className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-xs">Kelembapan</span>
                                    <span className="font-semibold">{initialData.humidity}%</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50">
                                    <Wind className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-xs">Angin</span>
                                    <span className="font-semibold">{initialData.windSpeed} km/j</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50">
                                    <Umbrella className="h-5 w-5 text-muted-foreground" />
                                    <span className="text-xs">Hujan</span>
                                    <span className="font-semibold">{initialData.rainFall} mm</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="text-7xl font-bold">{initialData.temperature}°C</div>
                            <div className="text-muted-foreground text-lg">{localizedDescription}</div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium mb-2 text-center text-muted-foreground">Prakiraan Per Jam</h4>
                         <ScrollArea className="w-full whitespace-nowrap rounded-md">
                            <div className="flex w-max space-x-2 bg-muted/50 p-2 rounded-md">
                                {initialData.hourly.slice(0, 6).map((hour, index) => (
                                    <div key={index} className="flex flex-col items-center gap-1 p-1 w-[50px]">
                                        <span className="text-xs text-muted-foreground">{hour.time}</span>
                                        <WeatherIcon name={hour.icon} className="h-6 w-6 text-primary" />
                                        <span className="font-semibold text-sm">{hour.temp}°</span>
                                    </div>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </CardContent>
            </div>
      </Link>
    </Card>
  );
}
