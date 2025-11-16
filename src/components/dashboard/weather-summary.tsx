
"use client";
import type { WeatherData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Wind, Umbrella, Sun, Cloud, CloudRain, Zap } from "lucide-react";
import React from "react";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const iconComponents = {
    Sun,
    Cloud,
    CloudRain,
    Zap,
};

type IconName = keyof typeof iconComponents;

const WeatherIcon = ({ name, className }: { name: IconName; className?: string }) => {
    const IconComponent = iconComponents[name] || Cloud;
    return <IconComponent className={cn("text-white/90", className)} />;
};

const getWeatherGradient = (condition: IconName) => {
    switch (condition) {
        case "Sun":
            return "from-blue-400 to-blue-600";
        case "Cloud":
            return "from-slate-500 to-slate-700";
        case "CloudRain":
            return "from-gray-600 to-gray-800";
        case "Zap":
            return "from-indigo-700 to-indigo-900";
        default:
            return "from-slate-500 to-slate-700";
    }
};

export default function WeatherSummary({ initialData }: { initialData: WeatherData }) {
    const localizedDescription = initialData.condition;
    const gradient = getWeatherGradient(initialData.conditionIcon);

  return (
    <Card className={cn("col-span-1 lg:col-span-2 row-span-2 text-white overflow-hidden relative shadow-lg", gradient)}>
        <Link href={`/weather?location=${initialData.location.split(',')[0]}`} className="block rounded-lg transition-all h-full group">
            <div className="p-6 h-full flex flex-col justify-between z-10 relative">
                
                {/* Main Weather Info */}
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <WeatherIcon name={initialData.conditionIcon} className="h-20 w-20 drop-shadow-lg" />
                    <p className="text-7xl font-bold tracking-tight drop-shadow-md mt-4">{initialData.temperature}°</p>
                    <p className="text-xl font-medium drop-shadow">{localizedDescription}</p>
                    <p className="text-sm text-white/80 drop-shadow">{initialData.location}</p>
                </div>
                
                {/* Additional Details */}
                <div className="flex items-center justify-center gap-6 text-sm mt-6 backdrop-blur-sm bg-white/10 p-3 rounded-xl">
                    <div className="flex flex-col items-center gap-1">
                        <Droplets className="h-5 w-5" />
                        <span className="font-semibold">{initialData.humidity}%</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Wind className="h-5 w-5" />
                        <span className="font-semibold">{initialData.windSpeed} km/j</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Umbrella className="h-5 w-5" />
                        <span className="font-semibold">{initialData.rainFall} mm</span>
                    </div>
                </div>

                {/* Hourly Forecast */}
                <div className="mt-6">
                    <ScrollArea className="w-full whitespace-nowrap rounded-md">
                        <div className="flex w-max space-x-3">
                            {initialData.hourly.slice(0, 6).map((hour, index) => (
                                <div key={index} className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white/10 backdrop-blur-sm w-16 transition-colors group-hover:bg-white/20">
                                    <span className="text-xs text-white/80">{hour.time}</span>
                                    <WeatherIcon name={hour.icon} className="h-6 w-6" />
                                    <span className="font-bold text-base">{hour.temp}°</span>
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="h-2 [&_div]:bg-white/30" />
                    </ScrollArea>
                </div>
            </div>
      </Link>
    </Card>
  );
}
