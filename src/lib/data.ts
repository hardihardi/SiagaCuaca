
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


const mockNewsData = [
  { id: 'news-1', title: 'Musim Kemarau 2024 Diprediksi Lebih Basah dari Biasanya', description: 'BMKG memprediksi bahwa musim kemarau tahun ini akan diwarnai oleh hujan sporadis di beberapa wilayah Indonesia.', content: 'Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) merilis prakiraan terbaru untuk musim kemarau 2024. Tidak seperti tahun-tahun sebelumnya, musim kemarau kali ini diprediksi akan lebih basah akibat pengaruh anomali iklim global. Fenomena ini dapat menyebabkan hujan dengan intensitas ringan hingga sedang terjadi secara sporadis, terutama di wilayah Indonesia bagian barat dan tengah. Petani diimbau untuk menyesuaikan jadwal tanam mereka.', category: 'Iklim', date: '2024-08-04', imageUrl: 'https://picsum.photos/seed/news1/600/400', imageHint: 'dry season', source: 'BMKG', link: '#' },
  { id: 'news-2', title: 'Waspada Potensi Angin Kencang di Pesisir Selatan Jawa', description: 'Angin kencang dengan kecepatan mencapai 30 knot berpotensi terjadi di sepanjang pesisir selatan Jawa.', content: 'BMKG mengeluarkan peringatan dini terkait potensi angin kencang di wilayah pesisir selatan Jawa, mulai dari Banten hingga Jawa Timur. Kecepatan angin diperkirakan dapat mencapai 30 knot, yang berisiko bagi aktivitas pelayaran dan perikanan. Masyarakat diimbau untuk selalu waspada dan mengikuti informasi terbaru dari pihak berwenang.', category: 'Cuaca', date: '2024-08-03', imageUrl: 'https://picsum.photos/seed/news2/600/400', imageHint: 'strong wind', source: 'CNN Indonesia', link: '#' },
  { id: 'news-3', title: 'Edukasi Mitigasi Bencana Gempa Bumi Sejak Dini', description: 'Pemerintah menggalakkan program edukasi mitigasi bencana gempa bumi di sekolah-sekolah dasar.', content: 'Sebagai negara yang rawan gempa, edukasi mitigasi bencana menjadi sangat penting. Pemerintah melalui Badan Nasional Penanggulangan Bencana (BNPB) meluncurkan program "Sekolah Aman Bencana" yang menyasar siswa sekolah dasar. Program ini mengajarkan langkah-langkah penyelamatan diri seperti "drop, cover, and hold on" melalui metode yang interaktif dan mudah dipahami anak-anak.', category: 'Bencana', date: '2024-08-02', imageUrl: 'https://picsum.photos/seed/news3/600/400', imageHint: 'earthquake drill', source: 'Kompas', link: '#' },
  { id: 'news-4', title: 'Teknologi AI Bantu Prediksi Cuaca Lebih Akurat', description: 'Penerapan kecerdasan buatan (AI) dalam pemodelan cuaca menunjukkan hasil yang menjanjikan.', content: 'Para peneliti di Institut Teknologi Bandung (ITB) berhasil mengembangkan model prediksi cuaca berbasis AI yang mampu memberikan prakiraan dengan tingkat akurasi lebih tinggi dibandingkan metode konvensional. Model ini menganalisis jutaan data historis cuaca untuk mengenali pola-pola kompleks, sehingga dapat memprediksi perubahan cuaca ekstrem dengan lebih baik.', category: 'Teknologi', date: '2024-08-01', imageUrl: 'https://picsum.photos/seed/news4/600/400', imageHint: 'AI technology', source: 'Detik', link: '#' },
];

export const getNewsData = async (page?: string): Promise<NewsApiResponse> => {
    // This is a mock implementation
    const pageNum = page ? parseInt(page.split('_')[0], 10) : 1;
    const pageSize = 10;
    const totalResults = mockNewsData.length;
    const totalPages = Math.ceil(totalResults / pageSize);
    const startIndex = (pageNum - 1) * pageSize;
    const results = mockNewsData.slice(startIndex, startIndex + pageSize);

    const nextPage = pageNum < totalPages ? `${pageNum + 1}_${Date.now()}` : null;
    
    return {
        results,
        nextPage,
        totalResults
    };
};

export const getNewsArticleById = async (id: string): Promise<NewsArticle | undefined> => {
    // This is a mock implementation
    return mockNewsData.find((article) => article.id === id);
};
