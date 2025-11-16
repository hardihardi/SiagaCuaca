
import type { NewsArticle, NewsApiResponse } from '@/lib/types';

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

const mapApiArticleToNewsArticle = (article: any): NewsArticle => ({
    id: article.article_id,
    title: article.title,
    description: article.description,
    content: article.content,
    category: article.category?.[0] || 'Berita',
    date: article.pubDate,
    imageUrl: article.image_url || `https://picsum.photos/seed/${article.article_id}/600/400`,
    imageHint: article.keywords || 'news article',
    source: article.source_id,
    link: article.link,
});

export const getNewsData = async (page?: string): Promise<NewsApiResponse> => {
    const apiKey = process.env.NEWSDATA_API_KEY;
    if (!apiKey) {
        console.error("News API key is not configured in .env file.");
        return { results: [], nextPage: null, totalResults: 0 };
    }

    const params = new URLSearchParams({
        q: 'BMKG',
        country: 'id',
        language: 'id',
        timezone: 'Asia/Jakarta',
        apikey: apiKey,
    });

    // We remove the page parameter to always fetch the first page.
    // This simplifies the logic and fixes the 404 error.
    
    const url = `https://newsdata.io/api/1/news?${params.toString()}`;

    try {
        const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
        if (!response.ok) {
            console.error("News API request failed with status:", response.status);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
            throw new Error(`Gagal mengambil data berita: ${response.statusText}`);
        }
        const data = await response.json();
        
        const articles: NewsArticle[] = (data.results || []).map(mapApiArticleToNewsArticle);

        return {
            results: articles,
            nextPage: data.nextPage,
            totalResults: data.totalResults,
        };
    } catch (error) {
        console.error("Error fetching news data:", error);
        return { results: [], nextPage: null, totalResults: 0 };
    }
};

export const getNewsArticleById = async (id: string): Promise<NewsArticle | undefined> => {
    // newsdata.io doesn't have a lookup by ID endpoint.
    // We fetch the latest list of articles and find the matching one.
    // This is reliable as long as the user clicks an article from the main news page.
    const newsResponse = await getNewsData();
    if (!newsResponse || !newsResponse.results) {
        return undefined;
    }
    return newsResponse.results.find(article => article.id === id);
};
