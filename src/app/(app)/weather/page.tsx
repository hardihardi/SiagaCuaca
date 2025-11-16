
'use client';

import { useEffect, useState, useMemo } from 'react';
import { getWeatherData } from '@/lib/data';
import type { WeatherData } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Droplets, Wind, Umbrella, Sun, Cloud, CloudRain, Zap, Calendar, Clock } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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


export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getWeatherData("Jakarta");
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartData = useMemo(() => {
    return weatherData?.hourly.map(hour => ({
      time: hour.time,
      temp: hour.temp
    })) || [];
  }, [weatherData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-1/2" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-64 lg:col-span-1" />
          <Skeleton className="h-96 lg:col-span-2" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!weatherData) {
    return <div>Gagal memuat data cuaca.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Prakiraan Cuaca Rinci</h1>
        <p className="text-muted-foreground">Data cuaca lengkap untuk {weatherData.location}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 flex flex-col items-center justify-center text-center">
          <CardHeader>
            <WeatherIcon name={weatherData.conditionIcon} className="h-20 w-20 text-primary mx-auto" />
          </CardHeader>
          <CardContent>
            <p className="text-6xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-lg text-muted-foreground">{weatherData.condition}</p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col items-center gap-1">
                    <Droplets className="h-5 w-5 text-muted-foreground" />
                    <span>{weatherData.humidity}%</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Wind className="h-5 w-5 text-muted-foreground" />
                    <span>{weatherData.windSpeed} km/j</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Umbrella className="h-5 w-5 text-muted-foreground" />
                    <span>{weatherData.rainFall} mm</span>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5"/> Prakiraan Per Jam</CardTitle>
                <CardDescription>Prakiraan suhu untuk 6 jam ke depan.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                 <ChartContainer config={{}} className="h-80 w-full">
                    <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            fontSize={12}
                        />
                        <YAxis 
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            unit="°"
                            fontSize={12}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent 
                                formatter={(value) => `${value}°C`}
                                nameKey="time"
                                labelKey="temp"
                            />}
                        />
                        <Bar dataKey="temp" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5"/> Prakiraan 7 Hari</CardTitle>
          <CardDescription>Prakiraan cuaca untuk seminggu ke depan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {weatherData.daily.map(day => (
              <div key={day.day} className="flex items-center justify-between py-3 px-2 -mx-2 hover:bg-muted/50 rounded-md transition-colors">
                <p className="font-medium w-20 sm:w-24 flex-shrink-0">{day.day}</p>
                <div className="flex-1 flex items-center gap-2 text-muted-foreground justify-center">
                    <WeatherIcon name={day.icon} className="h-6 w-6" />
                    <span className="w-28 hidden sm:inline">{day.condition}</span>
                </div>
                <p className="font-semibold w-16 text-right">{day.temp}°C</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
