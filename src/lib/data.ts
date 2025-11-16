
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

const mockNewsData: NewsArticle[] = [
    {
      id: 'news-1',
      title: 'BMKG: Waspada Potensi Hujan Lebat di Sebagian Besar Wilayah Indonesia',
      description: 'Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) mengeluarkan peringatan dini mengenai potensi hujan lebat yang dapat disertai kilat/petir dan angin kencang di sebagian besar wilayah Indonesia dalam beberapa hari ke depan.',
      content: 'Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) meminta masyarakat untuk waspada terhadap potensi hujan dengan intensitas sedang hingga lebat yang dapat disertai kilat/petir dan angin kencang di sejumlah provinsi di Indonesia. Prakiraan ini berlaku untuk periode 6-8 Agustus 2024. Beberapa wilayah yang berpotensi mengalami cuaca signifikan antara lain Sumatera Barat, Riau, Jambi, Bengkulu, Sumatera Selatan, Lampung, sebagian besar Jawa, Kalimantan, Sulawesi, dan Papua. Kepala Pusat Meteorologi Publik BMKG, Andri Ramdhani, mengatakan bahwa kondisi ini dipicu oleh aktivitas gelombang atmosfer dan sirkulasi siklonik di sekitar wilayah Indonesia. "Kami mengimbau masyarakat untuk tetap waspada dan berhati-hati terhadap potensi dampak bencana hidrometeorologi seperti banjir, tanah longsor, dan pohon tumbang," ujarnya.',
      category: 'Cuaca',
      date: '5 Agu 2024',
      imageUrl: 'https://picsum.photos/seed/news1/600/400',
      imageHint: 'rainy weather',
      source: 'BMKG',
      link: 'https://www.bmkg.go.id'
    },
    {
      id: 'news-2',
      title: 'Gempa Magnitudo 5.2 Guncang Sukabumi, Tidak Berpotensi Tsunami',
      description: 'Gempa bumi dengan magnitudo 5.2 mengguncang wilayah Sukabumi, Jawa Barat pada Senin (5/8) siang. BMKG menyatakan gempa ini tidak berpotensi tsunami.',
      content: 'Gempa bumi tektonik mengguncang wilayah pesisir selatan Jawa Barat pada hari Senin, 5 Agustus 2024, pukul 14:35:10 WIB. Hasil analisis BMKG menunjukkan bahwa gempa ini memiliki parameter update dengan magnitudo M5.0. Episenter gempa terletak pada koordinat 7.99° LS dan 106.51° BT, atau tepatnya berlokasi di laut pada jarak 125 km arah Barat Daya dari Kabupaten Sukabumi, Jawa Barat pada kedalaman 10 km. Berdasarkan pemodelan, gempa ini tidak berpotensi menimbulkan tsunami. Guncangan dirasakan di beberapa daerah seperti Palabuhanratu, Cianjur, hingga sebagian wilayah Jakarta dengan intensitas yang berbeda. Warga diimbau untuk tetap tenang dan tidak terpengaruh oleh isu yang tidak dapat dipertanggungjawabkan kebenarannya.',
      category: 'Gempa Bumi',
      date: '5 Agu 2024',
      imageUrl: 'https://picsum.photos/seed/news2/600/400',
      imageHint: 'earthquake map',
      source: 'Kompas',
      link: '#'
    },
];

// Reverted to mock data due to API key failure.
export const getNewsData = async (page?: string): Promise<NewsApiResponse> => {
    console.log("Menggunakan data berita mock karena kegagalan API.");
    // This mock implementation does not support pagination.
    // It returns the same data regardless of the page parameter.
    return Promise.resolve({
        results: mockNewsData,
        nextPage: null, // No next page for mock data
        totalResults: mockNewsData.length,
    });
};

export const getNewsArticleById = async (id: string): Promise<NewsArticle | undefined> => {
    // Finds the article from the mock data array.
    const allNews = mockNewsData;
    return allNews.find(article => article.id === id);
}
