
'use client';

import { Suspense, useState } from 'react';
import { getWeatherData, getEarthquakeData, getAlertsData, getNewsData } from '@/lib/data';
import WeatherSummary from '@/components/dashboard/weather-summary';
import EarthquakeSummary from '@/components/dashboard/earthquake-summary';
import AlertsSummary from '@/components/dashboard/alerts-summary';
import NewsSummary from '@/components/dashboard/news-summary';
import LocationHandler from '@/components/dashboard/location-handler';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { WeatherData } from '@/lib/types';

function WeatherSection({ weatherData }: { weatherData: WeatherData }) {
  return <WeatherSummary initialData={weatherData} />;
}

function EarthquakeSection({ initialData }: { initialData: Awaited<ReturnType<typeof getEarthquakeData>> }) {
    return <EarthquakeSummary initialData={initialData} />;
}

function AlertsSection({ initialData }: { initialData: Awaited<ReturnType<typeof getAlertsData>> }) {
    return <AlertsSummary initialData={initialData} />;
}

function NewsSection({ initialData }: { initialData: Awaited<ReturnType<typeof getNewsData>> }) {
    return <NewsSummary initialData={initialData} />;
}


// Skeletons for Suspense fallbacks
const SummarySkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

const AlertsSkeleton = () => (
    <Card>
    <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent className="space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <div className="pt-12">
            <Skeleton className="h-10 w-full" />
        </div>
    </CardContent>
    </Card>
);

const NewsSkeleton = () => (
    <Card>
        <CardHeader>
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
             <Skeleton className="h-10 w-full md:w-40" />
        </CardContent>
    </Card>
)

export default function DashboardPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [earthquakeData, setEarthquakeData] = useState<Awaited<ReturnType<typeof getEarthquakeData>> | null>(null);
  const [alertsData, setAlertsData] = useState<Awaited<ReturnType<typeof getAlertsData>> | null>(null);
  const [newsData, setNewsData] = useState<Awaited<ReturnType<typeof getNewsData>> | null>(null);
  const [loading, setLoading] = useState(true);

  const handleLocationChange = async (location: string) => {
    setLoading(true);
    try {
      const [weather, earthquakes, alerts, news] = await Promise.all([
        getWeatherData(location),
        getEarthquakeData(),
        getAlertsData(),
        getNewsData()
      ]);
      setWeatherData(weather);
      setEarthquakeData(earthquakes);
      setAlertsData(alerts);
      setNewsData(news);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <LocationHandler onLocationChange={handleLocationChange} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading || !weatherData ? <SummarySkeleton /> : <WeatherSection weatherData={weatherData} />}
        {loading || !earthquakeData ? <SummarySkeleton /> : <EarthquakeSection initialData={earthquakeData} />}
        {loading || !alertsData ? <AlertsSkeleton /> : <AlertsSection initialData={alertsData} />}
      </div>
      <div className="grid gap-6">
        {loading || !newsData ? <NewsSkeleton /> : <NewsSection initialData={newsData} />}
      </div>
    </div>
  );
}
