// Interface to be implemented by the ExternalApiService or the InMemoryExternalApiService
// Used for dependency inversion, when creating the weather forecast service
export interface IExternalApiService {
    fetchFromForecastAndGeolocationApis(cityName: string): Promise<any>;
}