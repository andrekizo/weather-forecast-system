import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFindForecastByCityNameService } from '@/services/factories/weather-forecast/make-find-forecast-by-city-name-service'

// Controller that retrieves forecast and geoencoding information
export async function findForecastByCityName (request: FastifyRequest,reply: FastifyReply){
	const paramsSchema = z.object({
		cityName: z.string()

		})
	const params = paramsSchema.parse(request.params)
	const cityName = params.cityName.trim()
    
	try {
 		const findForecastByCityNameService = makeFindForecastByCityNameService()
		const { forecast } = await findForecastByCityNameService.execute({cityName})
		return reply.status(200).send({
			forecast,
			success: true
		})
	} catch (error) {
		console.error('Error: ',error)
		return reply.status(404).send({
			success: false
		})
	}
}