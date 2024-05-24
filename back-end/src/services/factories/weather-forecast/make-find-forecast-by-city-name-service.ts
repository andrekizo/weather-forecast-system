import { ExternalApiService } from '@/services/weather-forecast-service/external/external-api/external-api-service'
import { FindForecastByCityNameService } from '@/services/weather-forecast-service/find-forecast-by-city-name'

// Factory to create the service, using the ExternalApiService
// Used for dependency inversion, when creating the weather forecast service
export function makeFindForecastByCityNameService(){
    const externalApiService = new ExternalApiService()
    const findForecastByCityNameService = new FindForecastByCityNameService(externalApiService)
	return findForecastByCityNameService
}