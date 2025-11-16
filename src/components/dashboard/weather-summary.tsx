
"use client";
import type { WeatherData } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wind, Umbrella, Sun, Cloud, CloudRain, Zap } from "lucide-react";
import { localizeWeatherDescriptions } from '@/ai/flows/localize-weather-descriptions';
import { useState, useEffect } from 'react';
import React from "react";
import Link from "next/link";

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
            try {
                const result = await localizeWeatherDescriptions({
                    location: initialData.location,
                    weatherDescription: initialData.condition,
                });
                setLocalizedDescription(result.localizedDescription);
            } catch (error) {
                console.error("Failed to localize weather description:", error);
                setLocalizedDescription(initialData.condition);
            }
        };

        if (initialData.location && initialData.condition) {
            fetchLocalizedDescription();
        } else {
            setLocalizedDescription(initialData.condition);
        }
    }, [initialData]);

  return (
    <Card>
        <Link href={`/weather?location=${initialData.location.split(',')[0]}`} className="hover:bg-muted/50 block rounded-lg">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                <span>Cuaca Saat Ini</span>
                <WeatherIcon name={initialData.conditionIcon} className="h-8 w-8 text-primary" />
                </CardTitle>
                <CardDescription>{initialData.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-around text-center">
                    <div>
                        <div className="text-5xl font-bold">{initialData.temperature}°C</div>
                        <div className="text-muted-foreground">{localizedDescription}</div>
                    </div>
                </div>
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
                <div>
                    <h4 className="text-sm font-medium mb-2 text-center">Prakiraan Per Jam</h4>
                    <div className="flex justify-between">
                        {initialData.hourly.slice(0, 6).map((hour, index) => (
                            <div key={index} className="flex flex-col items-center gap-1 p-1">
                                <span className="text-xs text-muted-foreground">{hour.time}</span>
                                <WeatherIcon name={hour.icon} className="h-6 w-6 text-primary" />
                                <span className="font-semibold text-sm">{hour.temp}°</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
      </Link>
    </Card>
  );
}

