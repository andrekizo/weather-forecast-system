// Back end cache to store locally information from weather forecast. Currently disabled
import WeatherForecast from '@/models/weather-forecast'

const cache: { [key: string]: WeatherForecast[] } = {};
const cacheDuration = 500;  // 0.5 seconds

export const getForecastFromCache = (key: string): WeatherForecast | null => {
    const forecasts = cache[key];
    if (!forecasts) return null;
    const validForecast = forecasts.find(forecast => forecast.isValid(cacheDuration));
    return validForecast || null;};

export const addForecastToCache = (key: string, forecast: WeatherForecast): void => {
    if (!cache[key]) {
        cache[key] = [];
    }
    cache[key].push(forecast);
    cache[key] = cache[key].filter(forecast => forecast.isValid(cacheDuration));
};
