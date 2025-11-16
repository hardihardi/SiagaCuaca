
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
    {
      id: '1',
      title: 'BMKG Prediksi Puncak Musim Hujan di Januari-Februari 2025',
      description: 'Badan Meteorologi, Klimatologi, dan Geofisika (BMKG) memprediksi bahwa puncak musim hujan di sebagian besar wilayah Indonesia akan terjadi pada bulan Januari dan Februari 2025.',
      content: 'Kepala BMKG, Dwikorita Karnawati, menyatakan bahwa sebagian besar wilayah Indonesia akan memasuki musim hujan mulai akhir tahun ini. "Puncak musim hujan diprakirakan terjadi pada Januari hingga Februari 2025. Masyarakat diimbau untuk waspada terhadap potensi bencana hidrometeorologi seperti banjir dan tanah longsor," ujarnya dalam konferensi pers di Jakarta.',
      category: 'Cuaca',
      date: '2024-08-05T10:00:00Z',
      imageUrl: 'https://asset.kompas.com/crops/example-image-url-1.jpg',
      imageHint: 'cuaca hujan',
      source: 'Kompas.com'
    },
    {
      id: '2',
      title: 'Gempa Magnitudo 5.2 Guncang Sukabumi, Tidak Berpotensi Tsunami',
      description: 'Gempa bumi dengan magnitudo 5.2 mengguncang wilayah Kabupaten Sukabumi, Jawa Barat. Gempa ini tidak berpotensi menimbulkan tsunami.',
      content: 'Gempa bumi tektonik terjadi pada pukul 14:35:10 WIB di wilayah Samudera Hindia Selatan Jawa. Hasil analisis BMKG menunjukkan gempa ini memiliki parameter update dengan magnitudo 5.0. Episenter gempa bumi terletak pada koordinat 7,99° LS ; 106,51° BT, atau tepatnya berlokasi di laut pada jarak 125 Km arah Barat Daya Kota Sukabumi, Jawa Barat pada kedalaman 10 km. BMKG menyatakan gempa ini tidak berpotensi tsunami.',
      category: 'Gempa',
      date: '2024-08-05T08:00:00Z',
      imageUrl: 'https://media.suara.com/pictures/970x545/2024/01/01/example-image-url-2.jpg',
      imageHint: 'peta gempa',
      source: 'Suara.com'
    },
    {
      id: '3',
      title: 'Waspada Gelombang Tinggi di Perairan Selatan Jawa',
      description: 'BMKG mengeluarkan peringatan dini terkait potensi gelombang tinggi yang bisa mencapai 4 meter di perairan selatan Jawa Barat, Jawa Tengah, dan DI Yogyakarta.',
      content: 'Peringatan ini berlaku selama tiga hari ke depan. BMKG mengimbau nelayan dan masyarakat yang beraktivitas di pesisir untuk selalu waspada dan memperhatikan update informasi cuaca maritim dari BMKG. Pola angin di wilayah Indonesia bagian selatan yang cenderung bergerak dari Timur - Tenggara dengan kecepatan 5 - 25 knot menjadi salah satu penyebabnya.',
      category: 'Maritim',
      date: '2024-08-04T12:00:00Z',
      imageUrl: 'https://cdn.antaranews.com/cache/800x533/2023/12/26/example-image-url-3.jpg',
      imageHint: 'ombak laut',
      source: 'Antara News'
    },
     {
      id: '4',
      title: 'Antisipasi Kekeringan, BMKG dan Kementan Lakukan Modifikasi Cuaca',
      description: 'Untuk mengatasi dampak El Nino yang menyebabkan kekeringan di sejumlah wilayah, BMKG bekerja sama dengan Kementerian Pertanian untuk melakukan Teknologi Modifikasi Cuaca (TMC).',
      content: 'Operasi TMC difokuskan pada wilayah-wilayah sentra produksi pangan yang mengalami defisit curah hujan. Diharapkan dengan adanya hujan buatan, kebutuhan air untuk pertanian dapat tercukupi sehingga tidak terjadi gagal panen. Operasi ini direncanakan akan berlangsung selama satu bulan ke depan dengan evaluasi berkala.',
      category: 'Iklim',
      date: '2024-08-03T09:30:00Z',
      imageUrl: 'https://img.antaranews.com/cache/800x533/2023/08/21/WhatsApp-Image-2023-08-21-at-13.43.58.jpeg',
      imageHint: 'modifikasi cuaca',
      source: 'Antara News'
    },
  ];

export const getNewsData = async (page: string = '1'): Promise<NewsApiResponse> => {
    const pageNum = parseInt(page, 10);
    const pageSize = 10;
    const totalResults = mockNewsData.length;
    const totalPages = Math.ceil(totalResults / pageSize);

    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const results = mockNewsData.slice(startIndex, endIndex);

    const nextPage = pageNum < totalPages ? (pageNum + 1).toString() : null;
    
    return {
        results,
        nextPage,
        totalResults,
    };
};

export const getNewsArticleById = async (id: string): Promise<NewsArticle | undefined> => {
    return mockNewsData.find(article => article.id === id);
};
