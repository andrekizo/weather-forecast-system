import 'dotenv/config'
import { z } from 'zod'

//Load env parameters
const envSchema = z.object({
	NODE_ENV: z.enum(['dev','test','production']).default('dev'),
	PORT: z.coerce.number().default(3333),
	HG_BRASIL_API_KEY: z.string(),
	OPEN_WEATHER_MAP_API_KEY: z.string()
})

const _env = envSchema.safeParse(process.env)

//Check if env parameters are correct
if (_env.success===false){
	console.error('Invalid environment variables', _env.error.format())
	throw new Error('Invalid environment variables.')
}

export const env = _env.data