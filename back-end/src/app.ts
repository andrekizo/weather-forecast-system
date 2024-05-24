import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { forecastRoutes } from './http/controller/weather-forecast/routes'
export const app = fastify()
app.register(fastifyCors, { 
    origin: (origin, cb) => {
      // Allow all origins for simplicity
      cb(null, true);
    }
  })
app.register(forecastRoutes)