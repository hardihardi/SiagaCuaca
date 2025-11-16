
'use client';

import { useState, useEffect } from 'react';
import { getWeatherData } from '@/lib/data';
import WeatherSummary from '@/components/dashboard/weather-summary';
import EarthquakeSummary from '@/components/dashboard/earthquake-summary';
import AlertsSummary from '@/components/dashboard/alerts-summary';
import LocationHandler from '@/components/dashboard/location-handler';
import { WeatherData, EarthquakeData, AlertData } from '@/lib/types';
import { SummarySkeleton, AlertsSkeleton } from '@/components/dashboard/skeletons';

function WeatherSection({ weatherData }: { weatherData: WeatherData }) {
  return <WeatherSummary initialData={weatherData} />;
}

interface DashboardClientProps {
    initialWeatherData: WeatherData;
    initialEarthquakeData: EarthquakeData[];
    initialAlertsData: AlertData[];
}

export default function DashboardClient({ initialWeatherData, initialEarthquakeData, initialAlertsData }: DashboardClientProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(initialWeatherData);
  const [isWeatherLoading, setWeatherLoading] = useState(false);

  const handleLocationChange = async (location: string) => {
    try {
      setWeatherLoading(true);
      const weather = await getWeatherData(location);
      setWeatherData(weather);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setWeatherData(initialWeatherData); // Fallback to initial data on error
    } finally {
      setWeatherLoading(false);
    }
  };

  return (
    <>
      <LocationHandler onLocationChange={handleLocationChange} />
      <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-6 md:gap-8">
          {isWeatherLoading || !weatherData ? <SummarySkeleton /> : <WeatherSection weatherData={weatherData} />}
        </div>
        <div className="space-y-6 md:space-y-8">
          <EarthquakeSummary initialData={initialEarthquakeData} />
          <AlertsSummary initialData={initialAlertsData} />
        </div>
      </div>
    </>
  );
}
