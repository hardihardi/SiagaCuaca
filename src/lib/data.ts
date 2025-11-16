import type { WeatherData, EarthquakeData, AlertData, NewsArticle } from '@/lib/types';

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  // Mock data, in a real app this would fetch from BMKG API
  return {
    location: "Jakarta, ID",
    temperature: 32,
    condition: "Cerah Berawan",
    conditionIcon: "Cloud",
    humidity: 75,
    windSpeed: 10,
    rainFall: 0.2,
    hourly: [
      { time: "13:00", temp: 32, icon: "Cloud" },
      { time: "14:00", temp: 33, icon: "Sun" },
      { time: "15:00", temp: 32, icon: "Sun" },
      { time: "16:00", temp: 31, icon: "Cloud" },
      { time: "17:00", temp: 30, icon: "CloudRain" },
      { time: "18:00", temp: 29, icon: "CloudRain" },
    ],
    daily: [
        { day: "Senin", temp: 31, icon: "Cloud", condition: "Berawan" },
        { day: "Selasa", temp: 32, icon: "Sun", condition: "Cerah" },
        { day: "Rabu", temp: 29, icon: "CloudRain", condition: "Hujan Ringan" },
        { day: "Kamis", temp: 30, icon: "Zap", condition: "Hujan Petir" },
        { day: "Jumat", temp: 32, icon: "Sun", condition: "Cerah" },
        { day: "Sabtu", temp: 31, icon: "Cloud", condition: "Berawan" },
        { day: "Minggu", temp: 30, icon: "CloudRain", condition: "Hujan Ringan" },
    ]
  };
};

export const getEarthquakeData = async (): Promise<EarthquakeData[]> => {
    // Mock data, in a real app this would fetch and parse from BMKG
    return [
        { id: "1", time: "2024-08-05 14:35:10 WIB", magnitude: 5.2, depth: "10 km", location: "125 km BaratDaya KAB-SUKABUMI-JABAR", coordinates: [-7.99, 106.51] },
        { id: "2", time: "2024-08-05 11:20:45 WIB", magnitude: 3.1, depth: "22 km", location: "30 km Tenggara KOTA-BOGOR-JABAR", coordinates: [-6.84, 106.94] },
        { id: "3", time: "2024-08-04 22:15:00 WIB", magnitude: 4.5, depth: "112 km", location: "101 km BaratLaut SUMUR-BANTEN", coordinates: [-6.44, 104.75] },
        { id: "4", time: "2024-08-04 18:05:30 WIB", magnitude: 2.8, depth: "5 km", location: "15 km TimurLaut AMBARAWA-JATENG", coordinates: [-7.21, 110.53] },
    ];
}

export const getAlertsData = async (): Promise<AlertData[]> => {
    // Mock data, in a real app this would fetch from BMKG
    return [
        { id: "1", title: "Peringatan Hujan Lebat", area: "Jabodetabek", time: "15:00 - 18:00 WIB", details: "Potensi hujan lebat disertai kilat/petir dan angin kencang di wilayah Jakarta Selatan, Jakarta Timur, Depok, dan Bogor." },
        { id: "2", title: "Peringatan Gelombang Tinggi", area: "Selat Sunda", time: "Hingga 2024-08-06 07:00 WIB", details: "Tinggi gelombang mencapai 2.5 - 4.0 meter di Selat Sunda bagian selatan. Harap waspada." },
    ]
}

export const getNewsData = async (): Promise<NewsArticle[]> => {
    // Mock data
    return [
        { id: "1", title: "Memahami Skala Magnitudo Gempa Bumi dan Dampaknya", category: "Edukasi", date: "5 Agu 2024", imageUrl: "https://picsum.photos/seed/news1/600/400", imageHint: "earthquake infographic", source: "BMKG" },
        { id: "2", title: "Musim Kemarau 2024: BMKG Prediksi Puncak Terjadi di Agustus", category: "Iklim", date: "4 Agu 2024", imageUrl: "https://picsum.photos/seed/news2/600/400", imageHint: "dry season", source: "Info Iklim" },
        { id: "3", title: "Teknologi Modifikasi Cuaca untuk Atasi Kekeringan", category: "Teknologi", date: "3 Agu 2024", imageUrl: "https://picsum.photos/seed/news3/600/400", imageHint: "cloud seeding", source: "Info Cuaca" },
        { id: "4", title: "Kenali Jenis-jenis Awan dan Potensi Cuaca yang Dibawa", category: "Cuaca", date: "2 Agu 2024", imageUrl: "https://picsum.photos/seed/news4/600/400", imageHint: "cumulonimbus cloud", source: "BMKG" },
    ]
}

export const getNewsArticleById = async (id: string): Promise<NewsArticle | undefined> => {
    const articles = await getNewsData();
    return articles.find(article => article.id === id);
}