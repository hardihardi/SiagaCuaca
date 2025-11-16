import type { NewsArticle, NewsApiResponse } from '@/lib/types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// Mock data for weather, earthquake, and alerts
export const getWeatherData = async (location: string) => {
  const isRaining = Math.random() > 0.5;
  return {
    location: `${location}, ID`,
    temperature: 28 + Math.floor(Math.random() * 5),
    condition: isRaining ? "Hujan Ringan" : "Cerah Berawan",
    conditionIcon: isRaining ? "CloudRain" : "Cloud" as const,
    humidity: 70 + Math.floor(Math.random() * 15),
    windSpeed: 8 + Math.floor(Math.random() * 5),
    rainFall: parseFloat((Math.random() * 5).toFixed(1)),
    hourly: [
      { time: "13:00", temp: 32, icon: "Cloud" as const },
      { time: "14:00", temp: 33, icon: "Sun" as const },
      { time: "15:00", temp: 32, icon: "Sun" as const },
      { time: "16:00", temp: 31, icon: "Cloud" as const },
      { time: "17:00", temp: 30, icon: "CloudRain" as const },
      { time: "18:00", temp: 29, icon: "CloudRain" as const },
    ],
    daily: [
        { day: "Senin", temp: 31, icon: "Cloud" as const, condition: "Berawan", rainFall: 0.5 },
        { day: "Selasa", temp: 32, icon: "Sun" as const, condition: "Cerah", rainFall: 0.1 },
        { day: "Rabu", temp: 29, icon: "CloudRain" as const, condition: "Hujan Ringan", rainFall: 3.2 },
        { day: "Kamis", temp: 30, icon: "Zap" as const, condition: "Hujan Petir", rainFall: 5.5 },
        { day: "Jumat", temp: 32, icon: "Sun" as const, condition: "Cerah", rainFall: 0.0 },
        { day: "Sabtu", temp: 31, icon: "Cloud" as const, condition: "Berawan", rainFall: 1.0 },
        { day: "Minggu", temp: 30, icon: "CloudRain" as const, condition: "Hujan Ringan", rainFall: 2.5 },
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

// Fetches real news data from newsdata.io API with pagination
export const getNewsData = async (page?: string): Promise<NewsApiResponse> => {
  const apiKey = 'pub_49869150034a70653d9e8027e1a3b3e6e872e';
  let url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=BMKG&language=id`;
  if (page) {
    url += `&page=${page}`;
  }

  try {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      console.error("Failed to fetch news:", response.statusText);
      return { results: [], nextPage: null, totalResults: 0 };
    }
    const data = await response.json();
    
    const results: NewsArticle[] = data.results.map((article: any, index: number) => ({
      id: article.article_id || `${page || '0'}_${index}`,
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

    return {
        results,
        nextPage: data.nextPage || null,
        totalResults: data.totalResults || 0,
    };

  } catch (error) {
    console.error("Error fetching or parsing news data:", error);
    return { results: [], nextPage: null, totalResults: 0 };
  }
};

export const getNewsArticleById = async (id: string): Promise<NewsArticle | undefined> => {
    // This function will now find the article from the fetched data.
    // For simplicity in this context, we will fetch all and find,
    // in a real-world scenario with a proper backend, you would fetch a single article by ID.
    // This function might not work correctly with pagination as it only fetches the first page.
    let allNews: NewsArticle[] = [];
    let nextPage: string | null = null;
    let pageFetched = false;

    // A simple loop to fetch a few pages to find the article. This is not ideal for production.
    for (let i = 0; i < 5; i++) {
        const { results, nextPage: newNextPage } = await getNewsData(nextPage || undefined);
        allNews = allNews.concat(results);
        const found = allNews.find(article => article.id === id);
        if (found) {
            return found;
        }
        if (!newNextPage) {
            break;
        }
        nextPage = newNextPage;
    }
    
    // Fallback if not found in first few pages
    return allNews.find(article => article.id === id);
}
