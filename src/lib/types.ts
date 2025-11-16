
import type { LucideIcon } from "lucide-react";

type IconName = "Sun" | "Cloud" | "CloudRain" | "Zap";

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  conditionIcon: IconName;
  humidity: number;
  windSpeed: number;
  rainFall: number;
  hourly: { time: string; temp: number; icon: IconName }[];
  daily: { day: string; temp: number; icon: IconName, condition: string; rainFall: number; }[];
}

export interface EarthquakeData {
  id: string;
  time: string;
  magnitude: number;
  depth: string;
  location: string;
  coordinates: [number, number];
}

export interface AlertData {
  id: string;
  title: string;
  area: string;
  time: string;
  details: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  category: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  source: string;
  link?: string;
}

export interface NewsApiResponse {
    results: NewsArticle[];
    nextPage: string | null;
    totalResults: number;
}
