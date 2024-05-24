import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {OSM} from 'ol/source.js';
import {Tile as TileLayer} from 'ol/layer.js';
import {useGeographic} from 'ol/proj.js';

const view = new View({
  center: [0, 0],
  zoom: 2,
});

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  view: view,
});


const cidadeInput = document.getElementById('cidade');
const consultarButton = document.getElementById('consultar');
const cidadesConsultadasSelect = document.getElementById('cidades-consultadas');
const informacoesDiv = document.getElementById('informacoes');

useGeographic();

const consultarClima = async (cidade, useCachedData = false) => {
  cidade = cidade.trim()
  try {
    let geoData;
    if (useCachedData) {
      // Retrieve cached data from localStorage
      geoData = JSON.parse(localStorage.getItem(cidade));
    } else {
      // Fetch data from the external API
      const geoResponse = await fetch(`http://localhost:3333/find-forecast-by-city-name/${cidade}`);
      if(geoResponse.status === 404){
        alert('Não foi possível localizar as informações da cidade.');
        return false
      }
      geoData = await geoResponse.json();
      if (geoData.length === 0) {
        throw new Error('Cidade não encontrada');
      }
    }
    

    const { lat, long, max, min, city, temp, description, rain_probability, moon_phase, moon_phase_tr, date, condition_slug } = geoData.forecast;

    // Update the information
    informacoesDiv.style.display = 'block';
    informacoesDiv.innerHTML = `
      <h2>${city}</h2>
      <br>
      <p>${date}</p>
      <p>Temperatura Atual: ${temp}°C</p>
      <p>Temperatura Máxima: ${max}°C</p>
      <p>Temperatura Mínima: ${min}°C</p>
      <p>Clima: ${description} <img src="images/conditions-slugs/${condition_slug}.svg" alt="condition image" width="30" style="vertical-align: middle;"></p>
      <p>Probabilidade de Chuva: ${rain_probability}%</p>
      <p>Fase da Lua: ${moon_phase_tr} <img src="images/moon-phases/${moon_phase}.png" alt="moon image" width="30" style="vertical-align: middle;"></p>
      <h3>Previsão para os próximos 3 dias:</h3>
      <p>${geoData.forecast.day1.date}</p>
      <p>Temperatura Máxima: ${geoData.forecast.day1.max}°C</p>
      <p>Temperatura Mínima: ${geoData.forecast.day1.min}°C</p>
      <p>Clima: ${geoData.forecast.day1.description} <img src="images/conditions-slugs/${geoData.forecast.day1.condition}.svg" alt="condition image" width="30" style="vertical-align: middle;"></p>
      <p>Probabilidade de Chuva: ${geoData.forecast.day1.rain_probability}%</p>
      <br>
      <p>${geoData.forecast.day2.date}</p>
      <p>Temperatura Máxima: ${geoData.forecast.day2.max}°C</p>
      <p>Temperatura Mínima: ${geoData.forecast.day2.min}°C</p>
      <p>Clima: ${geoData.forecast.day2.description} <img src="images/conditions-slugs/${geoData.forecast.day2.condition}.svg" alt="condition image" width="30" style="vertical-align: middle;"></p>
      <p>Probabilidade de Chuva: ${geoData.forecast.day2.rain_probability}%</p>
      <br>
      <p>${geoData.forecast.day3.date}</p>
      <p>Temperatura Máxima: ${geoData.forecast.day3.max}°C</p>
      <p>Temperatura Mínima: ${geoData.forecast.day3.min}°C</p>
      <p>Clima: ${geoData.forecast.day3.description} <img src="images/conditions-slugs/${geoData.forecast.day3.condition}.svg" alt="condition image" width="30" style="vertical-align: middle;"></p>
      <p>Probabilidade de Chuva: ${geoData.forecast.day3.rain_probability}%</p>
    `;

    // Update the map view
    map.getView().setCenter([long, lat]);
    map.getView().setZoom(10);
    if (!useCachedData) {
      const existingOption = Array.from(cidadesConsultadasSelect.options).find(option => option.value === city);
      if (!existingOption){
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cidadesConsultadasSelect.appendChild(option);
      }

      // Store data in localStorage for future use

      localStorage.setItem(city, JSON.stringify(geoData));
    }
  } catch (error) {
    alert(error.message);
  }
};

consultarButton.addEventListener('click', () => {
  const cidade = cidadeInput.value.trim();
  const selectedCity = cidadesConsultadasSelect.value;
  if (selectedCity) {
    // Use cached data if a city is selected from the dropdown
    consultarClima(selectedCity, true);
  } else if (cidade) {
    // Fetch data from the API if a new city is entered
    consultarClima(cidade);
  } else {
    // Handle case when no city is selected or entered
    alert("Por favor, selecione uma cidade ou digite o nome de uma cidade para consultar o clima.");
  }
});

cidadeInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default form submission
    document.getElementById('consultar').click(); // Trigger the click event on the "Consultar" button
  }
});

cidadeInput.addEventListener('input', () => {
  // Reset the value of cidadesConsultadasSelect to its default value
  cidadesConsultadasSelect.selectedIndex = 0; // Assumes the default option is the first one
});

cidadesConsultadasSelect.addEventListener('change', () => {
  cidadeInput.value = '';
  const cidade = cidadesConsultadasSelect.value;
  if (cidade) {
    // Use cached data when the city is selected from the dropdown
    consultarClima(cidade, true);
  }
});


