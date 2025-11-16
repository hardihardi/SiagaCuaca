
'use client';

import { Suspense, useState, useEffect } from 'react';
import { getWeatherData, getEarthquakeData, getAlertsData, getNewsData } from '@/lib/data';
import WeatherSummary from '@/components/dashboard/weather-summary';
import EarthquakeSummary from '@/components/dashboard/earthquake-summary';
import AlertsSummary from '@/components/dashboard/alerts-summary';
import NewsSummary from '@/components/dashboard/news-summary';
import LocationHandler from '@/components/dashboard/location-handler';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { WeatherData, EarthquakeData, AlertData, NewsArticle } from '@/lib/types';

function WeatherSection({ weatherData }: { weatherData: WeatherData }) {
  return <WeatherSummary initialData={weatherData} />;
}

function EarthquakeSection({ initialData }: { initialData: EarthquakeData[] }) {
    return <EarthquakeSummary initialData={initialData} />;
}

function AlertsSection({ initialData }: { initialData: AlertData[] }) {
    return <AlertsSummary initialData={initialData} />;
}

function NewsSection({ initialData }: { initialData: NewsArticle[] }) {
    return <NewsSummary initialData={initialData} />;
}

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
  const [earthquakeData, setEarthquakeData] = useState<EarthquakeData[] | null>(null);
  const [alertsData, setAlertsData] = useState<AlertData[] | null>(null);
  const [newsData, setNewsData] = useState<NewsArticle[] | null>(null);
  const [loading, setLoading] = useState({
      weather: true,
      static: true,
  });

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        setLoading(prev => ({...prev, static: true}));
        const [earthquakes, alerts, news] = await Promise.all([
          getEarthquakeData(),
          getAlertsData(),
          getNewsData()
        ]);
        setEarthquakeData(earthquakes);
        setAlertsData(alerts);
        setNewsData(news);
      } catch (error) {
        console.error("Failed to fetch static data:", error);
      } finally {
        setLoading(prev => ({...prev, static: false}));
      }
    };
    fetchStaticData();
  }, []);

  const handleLocationChange = async (location: string) => {
    try {
      setLoading(prev => ({...prev, weather: true}));
      const weather = await getWeatherData(location);
      setWeatherData(weather);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setLoading(prev => ({...prev, weather: false}));
    }
  };

  return (
    <div className="space-y-6">
      <LocationHandler onLocationChange={handleLocationChange} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading.weather || !weatherData ? <SummarySkeleton /> : <WeatherSection weatherData={weatherData} />}
        {loading.static || !earthquakeData ? <SummarySkeleton /> : <EarthquakeSection initialData={earthquakeData} />}
        {loading.static || !alertsData ? <AlertsSkeleton /> : <AlertsSection initialData={alertsData} />}
      </div>
      <div className="grid gap-6">
        {loading.static || !newsData ? <NewsSkeleton /> : <NewsSection initialData={newsData} />}
      </div>
    </div>
  );
}
