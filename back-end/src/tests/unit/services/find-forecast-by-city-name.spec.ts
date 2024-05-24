import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryExternalApiService } from '../../../services/weather-forecast-service/external/in-memory/in-memory-external-api-service'
import { FindForecastByCityNameService } from '../../../services/weather-forecast-service/find-forecast-by-city-name'
import { mockForecastResponse1 } from '../../../services/weather-forecast-service/external/in-memory/mocks/mock-data'
import { mockGeolocationResponse1 } from '../../../services/weather-forecast-service/external/in-memory/mocks/mock-data'
let externalApiService: InMemoryExternalApiService
let sut: FindForecastByCityNameService

describe('Check In Use Case',()=>{
	beforeEach(async ()=>{
		externalApiService = new InMemoryExternalApiService(mockForecastResponse1,mockGeolocationResponse1)
		sut = new FindForecastByCityNameService(externalApiService)

	})

	it('should be able to find forecast city by city name',async()=>{
        const cityName = 'São Paulo'
		const { forecast }=await sut.execute({ cityName })
		expect(forecast.city).toEqual('São Paulo')
	})

    it('should be able to find lat long by city name',async()=>{
        const cityName = 'São Paulo'
		const { forecast }=await sut.execute({ cityName })
		expect(forecast.lat).toEqual(-23.5506507)
		expect(forecast.long).toEqual(-46.6333824)
	})

	it('should be able to find actual temperature and for the following 3 days by city name',async()=>{
        const cityName = 'São Paulo'
		const { forecast }=await sut.execute({ cityName })
		expect(forecast.temp).toEqual(25)
		expect(forecast.min).toEqual(20)
		expect(forecast.max).toEqual(30)
		expect(forecast.day1.min).toEqual(21)
		expect(forecast.day1.max).toEqual(31)
		expect(forecast.day2.min).toEqual(22)
		expect(forecast.day2.max).toEqual(32)
		expect(forecast.day3.min).toEqual(23)
		expect(forecast.day3.max).toEqual(33)
	})
	
	it('should be able to find forecast description by city name',async()=>{
        const cityName = 'São Paulo'
		const { forecast }=await sut.execute({ cityName })
		expect(forecast.description).toEqual('Tempo limpo')
		expect(forecast.day1.description).toEqual('Chuva')
		expect(forecast.day2.description).toEqual('Tempo limpo')
		expect(forecast.day3.description).toEqual('Chuva')
	})
	it('should be able to find forecast moon phase by city name',async()=>{
        const cityName = 'São Paulo'
		const { forecast }=await sut.execute({ cityName })
		expect(forecast.moon_phase).toEqual('full')
		expect(forecast.moon_phase_tr).toEqual('Lua cheia')
	})

	it('should be able to find forecast date by city name',async()=>{
        const cityName = 'São Paulo'
		const { forecast }=await sut.execute({ cityName })
		expect(forecast.date).toEqual('2024-05-23')
		expect(forecast.day1.date).toEqual('24/05')
		expect(forecast.day2.date).toEqual('25/05')
		expect(forecast.day3.date).toEqual('26/05')
	})

	it('should be able to find condition_slug by city name',async()=>{
        const cityName = 'São Paulo'
		const { forecast }=await sut.execute({ cityName })
		expect(forecast.condition_slug).toEqual('clear')
	})

	it('should be able to find rain probability by city name',async()=>{
        const cityName = 'São Paulo'
		const { forecast }=await sut.execute({ cityName })
		expect(forecast.rain_probability).toEqual(10)
		expect(forecast.day1.rain_probability).toEqual(20)
		expect(forecast.day2.rain_probability).toEqual(30)
		expect(forecast.day3.rain_probability).toEqual(40)
	})
})