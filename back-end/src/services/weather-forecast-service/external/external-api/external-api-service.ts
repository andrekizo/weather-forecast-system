import axios from "axios";
import { IExternalApiService } from "../interfaces/external-api-service-interface";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { env } from "@/env";

// Service that performs the requests to different external APIs, in an asynchronous way
export class ExternalApiService implements IExternalApiService {
    async fetchFromForecastAndGeolocationApis(cityName: string): Promise<any> {
        try {
			const [forecastResponse, geolocationResponse] = await Promise.all([
			  axios.get(`https://api.hgbrasil.com/weather?key=${env.HG_BRASIL_API_KEY}&city_name=${cityName}`),
			  axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${env.OPEN_WEATHER_MAP_API_KEY}`)
			]);

            return {
                forecastResponse,
                geolocationResponse
            }
        }
        catch (error) {
			console.error('Error fetching data from APIs:', error);
			throw new ResourceNotFoundError() 
		  }
    }
}