// Mocks for the unit tests
export const mockForecastResponse1 = {
    data: {
      results: {
        temp: 25,
        description: 'Tempo limpo',
        forecast: [
          { min: 20, max: 30, description: 'Tempo limpo', rain_probability: 10, date: '23/05', condition: 'clear' },
          { min: 21, max: 31, description: 'Chuva', rain_probability: 20, date: '24/05', condition: 'rain' },
          { min: 22, max: 32, description: 'Tempo limpo', rain_probability: 30, date: '25/05', condition: 'clear_day' },
          { min: 23, max: 33, description: 'Chuva', rain_probability: 40, date: '26/05', condition: 'rain' }
        ],
        moon_phase: 'full',
        date: '2024-05-23',
        humidity: 80,
        condition_slug: 'clear'
      }
    }
  };
  
  export const mockGeolocationResponse1 = {
    data: [
      { lat: -23.5506507, lon: -46.6333824, name: 'São Paulo' }
    ]
  };
