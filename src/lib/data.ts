import type { NewsArticle } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Mock data for weather, earthquake, and alerts
export const getWeatherData = async (location: string) => {
  return {
    location: "Jakarta, ID",
    temperature: 32,
    condition: "Cerah Berawan",
    conditionIcon: "Cloud" as const,
    humidity: 75,
    windSpeed: 10,
    rainFall: 0.2,
    hourly: [
      { time: "13:00", temp: 32, icon: "Cloud" as const },
      { time: "14:00", temp: 33, icon: "Sun" as const },
      { time: "15:00", temp: 32, icon: "Sun" as const },
      { time: "16:00", temp: 31, icon: "Cloud" as const },
      { time: "17:00", temp: 30, icon: "CloudRain" as const },
      { time: "18:00", temp: 29, icon: "CloudRain" as const },
    ],
    daily: [
        { day: "Senin", temp: 31, icon: "Cloud" as const, condition: "Berawan" },
        { day: "Selasa", temp: 32, icon: "Sun" as const, condition: "Cerah" },
        { day: "Rabu", temp: 29, icon: "CloudRain" as const, condition: "Hujan Ringan" },
        { day: "Kamis", temp: 30, icon: "Zap" as const, condition: "Hujan Petir" },
        { day: "Jumat", temp: 32, icon: "Sun" as const, condition: "Cerah" },
        { day: "Sabtu", temp: 31, icon: "Cloud" as const, condition: "Berawan" },
        { day: "Minggu", temp: 30, icon: "CloudRain" as const, condition: "Hujan Ringan" },
    ]
  };
};

export const getEarthquakeData = async () => {
    return [
        { id: "1", time: "2024-08-05 14:35:10 WIB", magnitude: 5.2, depth: "10 km", location: "125 km BaratDaya KAB-SUKABUMI-JABAR", coordinates: [-7.99, 106.51] },
        { id: "2", time: "2024-08-05 11:20:45 WIB", magnitude: 3.1, depth: "22 km", location: "30 km Tenggara KOTA-BOGOR-JABAR", coordinates: [-6.84, 106.94] },
        { id: "3", time: "2024-08-04 22:15:00 WIB", magnitude: 4.5, depth: "112 km", location: "101 km BaratLaut SUMUR-BANTEN", coordinates: [-6.44, 104.75] },
        { id: "4", time: "2024-08-04 18:05:30 WIB", magnitude: 2.8, depth: "5 km", location: "15 km TimurLaut AMBARAWA-JATENG", coordinates: [-7.21, 110.53] },
    ];
}

export const getAlertsData = async () => {
    return [
        { id: "1", title: "Peringatan Hujan Lebat", area: "Jabodetabek", time: "15:00 - 18:00 WIB", details: "Potensi hujan lebat disertai kilat/petir dan angin kencang di wilayah Jakarta Selatan, Jakarta Timur, Depok, dan Bogor." },
        { id: "2", title: "Peringatan Gelombang Tinggi", area: "Selat Sunda", time: "Hingga 2024-08-06 07:00 WIB", details: "Tinggi gelombang mencapai 2.5 - 4.0 meter di Selat Sunda bagian selatan. Harap waspada." },
    ]
}

// Fetches real news data from newsdata.io API
export const getNewsData = async (): Promise<NewsArticle[]> => {
  const apiKey = 'pub_066ffdf224864fe188a72234ee07c9bf';
  const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=BMKG&language=id`;
  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
        console.error("Failed to fetch news:", response.statusText);
        return [];
    }
    const data = await response.json();
    
    return data.results.map((article: any, index: number) => ({
      id: article.article_id || `${index}`,
      title: article.title,
      description: article.description,
      content: article.content,
      category: article.category?.[0] || "Berita",
      date: article.pubDate ? format(new Date(article.pubDate), "d MMM yyyy", { locale: id }) : "Tanggal tidak tersedia",
      imageUrl: article.image_url || `https://picsum.photos/seed/news${index}/600/400`,
      imageHint: article.keywords?.join(' ') || "berita cuaca",
      source: article.source_id || "Sumber tidak diketahui",
      link: article.link,
    }));
  } catch (error) {
    console.error("Error fetching or parsing news data:", error);
    return [];
  }
};

export const getNewsArticleById = async (id: string): Promise<NewsArticle | undefined> => {
    // This function will now find the article from the fetched data.
    // For simplicity in this context, we will fetch all and find,
    // in a real-world scenario with a proper backend, you would fetch a single article by ID.
    const articles = await getNewsData();
    return articles.find(article => article.id === id);
}
