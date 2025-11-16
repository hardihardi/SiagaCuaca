# **App Name**: IndoWeatherAlert

## Core Features:

- Weather Data Fetching: Fetches real-time weather forecast data from the BMKG API based on selected province/city.
- Earthquake Data Parsing: Parses earthquake data from BMKG's XML feed into JSON format for easy use.
- Severe Weather Alerts Display: Displays the latest severe weather alerts from BMKG, highlighting critical notifications.
- Interactive Weather Visualization: Uses Chart.js to present weather data visually through interactive graphs (temperature, humidity, wind speed, rainfall).
- Geolocation Integration: Detects user's location automatically using Geolocation API to provide localized weather data. As a tool, if a user asks for weather from Jakarta, use local language (Bahasa Indonesia).
- User Authentication: Integrates Clerk for user registration, login, and account management.
- Push Notifications: Allows users to subscribe to push notifications for earthquake alerts or severe weather warnings based on their selected locations.

## Style Guidelines:

- Primary color: A vibrant sky blue (#29ABE2) to represent clear skies and calmness.
- Background color: Light grey (#F5F5F5) for a clean and modern interface in light mode, and dark grey (#333333) for dark mode.
- Accent color: A warm orange (#FF8C00) to highlight alerts and interactive elements.
- Body and headline font: 'Inter' for a modern, neutral, and readable experience.
- Note: currently only Google Fonts are supported.
- Dynamic weather icons that change according to current weather conditions, ensuring visual clarity.
- Responsive design that adapts seamlessly across desktop, tablet, and mobile devices.
- Subtle animations for data loading and transitions to enhance user engagement.