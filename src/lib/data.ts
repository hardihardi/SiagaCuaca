
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

const mockNewsData: NewsArticle[] = [
    { id: '1', title: 'BMKG Prediksi Musim Kemarau Lebih Kering Tahun Ini', description: 'Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) memprediksi musim kemarau tahun ini akan lebih kering dibandingkan tahun sebelumnya.', content: 'Kepala BMKG, Dwikorita Karnawati, menyatakan bahwa fenomena El Nino yang lemah menjadi penyebab utama musim kemarau yang lebih kering. Masyarakat diimbau untuk waspada terhadap potensi kekeringan dan kebakaran hutan.', category: 'Iklim', date: '2024-08-05T10:00:00Z', imageUrl: 'https://asset.kompas.com/crops/example1.jpg', imageHint: 'dry land', source: 'Kompas.com', link: 'https://kompas.com' },
    { id: '2', title: 'Gempa M 5.2 Guncang Sukabumi, Tidak Berpotensi Tsunami', description: 'Gempa bumi dengan magnitudo 5.2 mengguncang wilayah Sukabumi, Jawa Barat. BMKG memastikan gempa ini tidak berpotensi tsunami.', content: 'Pusat gempa berada di laut pada kedalaman 10 km. Guncangan dirasakan oleh warga di beberapa wilayah sekitar, namun belum ada laporan kerusakan signifikan. Warga diimbau untuk tetap tenang.', category: 'Gempa', date: '2024-08-05T14:40:00Z', imageUrl: 'https://media.suara.com/pictures/970x545/2024/01/01/example2.jpg', imageHint: 'earthquake map', source: 'Suara.com', link: 'https://suara.com' },
    { id: '3', title: 'Waspada Gelombang Tinggi di Perairan Selatan Jawa', description: 'BMKG mengeluarkan peringatan dini terkait potensi gelombang tinggi di perairan selatan Jawa, Bali, dan Nusa Tenggara.', content: 'Gelombang setinggi 2.5 hingga 4 meter berpotensi terjadi dalam beberapa hari ke depan. Nelayan dan masyarakat yang beraktivitas di pesisir diimbau untuk meningkatkan kewaspadaan.', category: 'Cuaca', date: '2024-08-04T08:00:00Z', imageUrl: 'https://cdn.antaranews.com/cache/800x533/2023/12/26/example3.jpg', imageHint: 'ocean waves', source: 'Antara News', link: 'https://antaranews.com' },
    { id: '4', title: 'Pentingnya Edukasi Mitigasi Bencana Sejak Dini', description: 'Artikel membahas pentingnya edukasi mitigasi bencana kepada anak-anak usia sekolah untuk membangun kesadaran dan kesiapsiagaan.', content: 'Program edukasi yang interaktif dan mudah dipahami dapat membantu anak-anak mengenali potensi bencana di lingkungan mereka dan mengetahui langkah-langkah penyelamatan diri yang dasar.', category: 'Edukasi', date: '2024-08-03T11:00:00Z', imageUrl: 'https://img.antaranews.com/cache/800x533/2022/01/01/example4.jpg', imageHint: 'children learning', source: 'Antara News', link: 'https://antaranews.com' },
];

export const getNewsData = async (page?: string): Promise<NewsApiResponse> => {
    const pageNum = page ? parseInt(page) : 1;
    const pageSize = 10;
    const totalResults = mockNewsData.length * 5; // Simulate more results
    
    const results = mockNewsData.map(article => ({
        ...article,
        id: `${article.id}-${pageNum}`,
    }));
    
    return Promise.resolve({
        results: results.slice(0, pageSize),
        nextPage: (pageNum * pageSize < totalResults) ? (pageNum + 1).toString() : null,
        totalResults: totalResults
    });
};

export const getNewsArticleById = async (id: string): Promise<NewsArticle | undefined> => {
    // In mock data, find the base article and append the ID specifics
    const baseId = id.split('-')[0];
    const article = mockNewsData.find((article) => article.id === baseId);
    if (article) {
        return {
            ...article,
            id: id,
            title: `${article.title} (Berita ID: ${id})`, // Make title unique for detail page
        };
    }
    return Promise.resolve(undefined);
};
