// Class for storing information for the following days
export default class DateForecast {
	min: number
	max: number
	description: string
	rain_probability: number
	date: string
    condition: string
    
	constructor(min: number, max: number,
		description: string, rain_probability: number,
		date: string, condition:string){
		this.min = min
		this.max = max
		this.description = description
		this.rain_probability = rain_probability
		this.date = date
        this.condition = condition
	}

	static dateForecastFromForecastResponse(forecastResponse: any): DateForecast{
		const dateForecast = new DateForecast(
			forecastResponse.min, 
			forecastResponse.max, 
			forecastResponse.description,
			forecastResponse.rain_probability,
			forecastResponse.date,
			forecastResponse.condition
		)
		return dateForecast
	}
}