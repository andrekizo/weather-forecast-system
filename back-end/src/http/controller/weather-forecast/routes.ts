import { FastifyInstance } from 'fastify'
import { findForecastByCityName } from './find-forecast-by-city-name'

// Definition of the route of the API
export async function forecastRoutes(app: FastifyInstance){
	app.get('/find-forecast-by-city-name/:cityName', findForecastByCityName)
}