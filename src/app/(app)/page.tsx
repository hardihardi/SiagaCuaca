'use client';

import { Suspense, useState, useEffect } from 'react';
import { getWeatherData, getEarthquakeData, getAlertsData } from '@/lib/data';
import WeatherSummary from '@/components/dashboard/weather-summary';
import EarthquakeSummary from '@/components/dashboard/earthquake-summary';
import AlertsSummary from '@/components/dashboard/alerts-summary';
import NewsSection from '@/components/dashboard/news-section';
import LocationHandler from '@/components/dashboard/location-handler';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { WeatherData, EarthquakeData, AlertData, NewsArticle } from '@/lib/types';

function WeatherSection({ weatherData }: { weatherData: WeatherData }) {
  return <WeatherSummary initialData={weatherData} />;
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
  const [isWeatherLoading, setWeatherLoading] = useState(true);
  const [earthquakeData, setEarthquakeData] = useState<EarthquakeData[] | null>(null);
  const [isEarthquakeLoading, setEarthquakeLoading] = useState(true);
  const [alertsData, setAlertsData] = useState<AlertData[] | null>(null);
  const [isAlertsLoading, setAlertsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchStaticData() {
        try {
            const [eqData, alData] = await Promise.all([
                getEarthquakeData(),
                getAlertsData(),
            ]);
            setEarthquakeData(eqData);
            setAlertsData(alData);
        } catch (error) {
            console.error("Failed to fetch static data:", error);
            setEarthquakeData([]);
            setAlertsData([]);
        } finally {
            setEarthquakeLoading(false);
            setAlertsLoading(false);
        }
    }
    fetchStaticData();
  }, []);

  const handleLocationChange = async (location: string) => {
    try {
      setWeatherLoading(true);
      const weather = await getWeatherData(location);
      setWeatherData(weather);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setWeatherLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <LocationHandler onLocationChange={handleLocationChange} />
      <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-6 md:gap-8">
          {isWeatherLoading || !weatherData ? <SummarySkeleton /> : <WeatherSection weatherData={weatherData} />}
        </div>
        <div className="space-y-6 md:space-y-8">
          {isEarthquakeLoading || !earthquakeData ? (
              <SummarySkeleton />
          ) : (
              <EarthquakeSummary initialData={earthquakeData} />
          )}
          {isAlertsLoading || !alertsData ? (
            <AlertsSkeleton />
          ) : (
            <AlertsSummary initialData={alertsData} />
          )}
        </div>
      </div>
      <div className="grid gap-6 md:gap-8">
        <Suspense fallback={<NewsSkeleton />}>
            <NewsSection />
        </Suspense>
      </div>
    </div>
  );
}
