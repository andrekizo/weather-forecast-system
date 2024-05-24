import DateForecast from "./date-forecast"
import { MoonPhaseDictionary } from "../utils/moon-phase-dictionary"

// Class that stores the necessary information to be displayed by the front-end
export default class WeatherForecast {
	min: number
	max: number
	lat: string
	long: string
	city: string
	temp: number
	description: string
	rain_probability: number
	moon_phase: string
	date: string
	humidity: string
	day1: DateForecast
	day2: DateForecast
	day3: DateForecast
    timestamp: number
	condition_slug: string
	moon_phase_tr: string


	constructor(min: number, max: number,lat: string, long: string, 
		city: string, temp: number, description: string, rain_probability: number, moon_phase: string, 
		date: string, humidity: string, day1: DateForecast, day2: DateForecast,day3: DateForecast,condition_slug: string){
		this.min = min
		this.max = max
		this.lat = lat
		this.long = long
		this.city = city
		this.temp = temp
		this.description = description
		this.rain_probability = rain_probability
		this.moon_phase = moon_phase
		this.date = date
		this.humidity = humidity
		this.day1 = day1
		this.day2 = day2
		this.day3 = day3
		this.timestamp = Date.now()
		this.condition_slug = condition_slug
		this.moon_phase_tr = MoonPhaseDictionary[moon_phase]
	}
	// Validation for the back-end cache
	isValid(cacheDuration: number): boolean {
		return (Date.now() - this.timestamp) < cacheDuration
	}

	static weatherForecastFromForecastResponse(forecastResponse: any, geolocationResponse: any): WeatherForecast {
		const day1 = DateForecast.dateForecastFromForecastResponse(forecastResponse.data?.results.forecast[1])
		const day2 = DateForecast.dateForecastFromForecastResponse(forecastResponse.data?.results.forecast[2])
		const day3 = DateForecast.dateForecastFromForecastResponse(forecastResponse.data?.results.forecast[3])
		const weatherForecast = new WeatherForecast(
			forecastResponse.data?.results.forecast[0].min, 
			forecastResponse.data?.results.forecast[0].max, 
			geolocationResponse.data?.[0].lat, 
			geolocationResponse.data?.[0].lon, 
			geolocationResponse.data?.[0].name, 
			forecastResponse.data?.results.temp,
			forecastResponse.data?.results.description,
			forecastResponse.data?.results.forecast[0].rain_probability,
			forecastResponse.data?.results.moon_phase,
			forecastResponse.data?.results.date,
			forecastResponse.data?.results.humidity,
			day1,
			day2,
			day3,
			forecastResponse.data?.results.condition_slug
		)
		return weatherForecast
	}
}