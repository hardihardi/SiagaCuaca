import type { WeatherData, EarthquakeData, AlertData } from '@/lib/types';

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
        { day: "Senin", temp: 31, icon: "Cloud" },
        { day: "Selasa", temp: 32, icon: "Sun" },
        { day: "Rabu", temp: 29, icon: "CloudRain" },
        { day: "Kamis", temp: 30, icon: "Zap" },
        { day: "Jumat", temp: 32, icon: "Sun" },
        { day: "Sabtu", temp: 31, icon: "Cloud" },
        { day: "Minggu", temp: 30, icon: "CloudRain" },
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
