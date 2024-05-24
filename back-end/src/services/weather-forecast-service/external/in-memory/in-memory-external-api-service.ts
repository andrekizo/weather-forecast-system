import { IExternalApiService } from '../interfaces/external-api-service-interface'

// InMemoryExternalApiService that implements the IExternalApiService. It is only used inside the unit testing environment
export class InMemoryExternalApiService implements IExternalApiService {
	public forecastResponse: any
    public geolocationResponse: any
    
    constructor (mockForecastResponse: any, mockGeolocationResponse: any){
        this.forecastResponse = mockForecastResponse
        this.geolocationResponse = mockGeolocationResponse
    }
    fetchFromForecastAndGeolocationApis(cityName: string): Promise<any> {
        return Promise.resolve({
            forecastResponse: this.forecastResponse,
            geolocationResponse: this.geolocationResponse
        });
    }
}