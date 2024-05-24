import WeatherForecast from '../../models/weather-forecast'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { IExternalApiService } from './external/interfaces/external-api-service-interface'

interface FindForecastByCityNameServiceRequest {
    cityName: string
}

interface FindForecastByCityNameServiceResponse {
    forecast: WeatherForecast
}

//Service that retrieves information from geolocation and forecast external APIs
export class FindForecastByCityNameService {
	constructor(
        private externalApiService: IExternalApiService
	){}
	async execute ({
		cityName
	}: FindForecastByCityNameServiceRequest): Promise<FindForecastByCityNameServiceResponse>{

		try {
			const { forecastResponse, geolocationResponse } = await this.externalApiService.fetchFromForecastAndGeolocationApis(cityName)
		
			const forecast = WeatherForecast.weatherForecastFromForecastResponse(forecastResponse,geolocationResponse)
			return {
				forecast
			}
		  } catch (error) {
			console.error('Error fetching data from APIs:', error);
			throw new ResourceNotFoundError() 
		  }
		}
}
