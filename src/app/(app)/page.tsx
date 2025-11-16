
import { Suspense } from 'react';
import { getWeatherData, getEarthquakeData, getAlertsData, getNewsData } from '@/lib/data';
import NewsSummary from '@/components/dashboard/news-summary';
import { NewsSkeleton } from '@/components/dashboard/skeletons';
import DashboardClient from '@/components/dashboard/dashboard-client';

async function NewsSection() {
  const newsResponse = await getNewsData();
  
  if (!newsResponse || newsResponse.results.length === 0) {
    return <NewsSkeleton />;
  }

  return <NewsSummary initialData={newsResponse.results} />;
}

export default async function DashboardPage() {
    const [weatherData, earthquakeData, alertsData] = await Promise.all([
        getWeatherData('Jakarta'), // Fetch initial data for a default location
        getEarthquakeData(),
        getAlertsData(),
    ]);

    return (
        <div className="space-y-6 md:space-y-8">
            <DashboardClient
                initialWeatherData={weatherData}
                initialEarthquakeData={earthquakeData}
                initialAlertsData={alertsData}
            />
            <div className="grid gap-6 md:gap-8">
                <Suspense fallback={<NewsSkeleton />}>
                    <NewsSection />
                </Suspense>
            </div>
        </div>
    );
}
