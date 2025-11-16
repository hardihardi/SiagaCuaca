import type { LucideIcon } from "lucide-react";

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  conditionIcon: LucideIcon;
  humidity: number;
  windSpeed: number;
  rainFall: number;
  hourly: { time: string; temp: number; icon: LucideIcon }[];
  daily: { day: string; temp: number; icon: LucideIcon }[];
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
