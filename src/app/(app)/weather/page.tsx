
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getWeatherData } from '@/lib/data';
import type { WeatherData } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Droplets, Wind, Umbrella, Sun, Cloud, CloudRain, Zap, Calendar, Clock, Thermometer, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts";

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
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || 'Jakarta';
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getWeatherData(location);
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location]);

  const hourlyChartData = useMemo(() => {
    return weatherData?.hourly.map(hour => ({
      time: hour.time,
      Suhu: hour.temp
    })) || [];
  }, [weatherData]);

  const dailyChartData = useMemo(() => {
    return weatherData?.daily.map(day => ({
        name: day.day.slice(0, 3),
        Suhu: day.temp,
        "Curah Hujan": day.rainFall,
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
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Prakiraan Cuaca Rinci</h1>
        <p className="text-muted-foreground">Data cuaca lengkap untuk {weatherData.location}</p>
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 flex flex-col items-center justify-center text-center p-6">
          <CardHeader className="p-0">
            <WeatherIcon name={weatherData.conditionIcon} className="h-24 w-24 text-primary mx-auto" />
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <p className="text-7xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-xl text-muted-foreground mt-1">{weatherData.condition}</p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col items-center gap-1.5">
                    <Droplets className="h-5 w-5 text-muted-foreground" />
                    <span>{weatherData.humidity}%</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                    <Wind className="h-5 w-5 text-muted-foreground" />
                    <span>{weatherData.windSpeed} km/j</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
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
                    <BarChart accessibilityLayer data={hourlyChartData} margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
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
                            />}
                        />
                        <Bar dataKey="Suhu" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5"/> Grafik Prakiraan 7 Hari</CardTitle>
          <CardDescription>Grafik tren suhu dan curah hujan untuk seminggu ke depan.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80 w-full">
            <LineChart data={dailyChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" unit="°C" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" unit="mm" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line yAxisId="left" type="monotone" dataKey="Suhu" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="Curah Hujan" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5"/> Prakiraan 7 Hari</CardTitle>
          <CardDescription>Prakiraan cuaca untuk seminggu ke depan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border -mx-6 text-sm sm:text-base">
            {weatherData.daily.map(day => (
              <div key={day.day} className="grid grid-cols-3 sm:grid-cols-4 items-center gap-2 py-3 px-6 hover:bg-muted/50 transition-colors">
                <p className="font-medium col-span-1">{day.day}</p>
                <div className="flex items-center gap-2 text-muted-foreground justify-start sm:justify-center col-span-1">
                    <WeatherIcon name={day.icon} className="h-6 w-6" />
                    <span className="hidden sm:inline">{day.condition}</span>
                </div>
                <div className="col-span-1 grid grid-cols-2 text-right gap-2">
                    <p className="font-semibold text-foreground">{day.temp}°C</p>
                    <p className="font-semibold text-accent">{day.rainFall} mm</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
