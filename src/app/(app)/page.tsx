import { Suspense } from 'react';
import { getWeatherData, getEarthquakeData, getAlertsData, getNewsData } from '@/lib/data';
import WeatherSummary from '@/components/dashboard/weather-summary';
import EarthquakeSummary from '@/components/dashboard/earthquake-summary';
import AlertsSummary from '@/components/dashboard/alerts-summary';
import NewsSummary from '@/components/dashboard/news-summary';
import LocationHandler from '@/components/dashboard/location-handler';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <LocationHandler />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Suspense fallback={<SummarySkeleton />}>
          <WeatherSection />
        </Suspense>
        <Suspense fallback={<SummarySkeleton />}>
          <EarthquakeSection />
        </Suspense>
        <Suspense fallback={<AlertsSkeleton />}>
          <AlertsSection />
        </Suspense>
      </div>
      <div className="grid gap-6">
        <Suspense fallback={<NewsSkeleton />}>
            <NewsSection />
        </Suspense>
      </div>
    </div>
  );
}

async function WeatherSection() {
  const weatherData = await getWeatherData("Jakarta");
  return <WeatherSummary initialData={weatherData} />;
}

async function EarthquakeSection() {
  const earthquakeData = await getEarthquakeData();
  return <EarthquakeSummary initialData={earthquakeData} />;
}

async function AlertsSection() {
  const alertsData = await getAlertsData();
  return <AlertsSummary initialData={alertsData} />;
}

async function NewsSection() {
    const newsData = await getNewsData();
    return <NewsSummary initialData={newsData} />;
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
