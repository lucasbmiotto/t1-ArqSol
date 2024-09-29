require('dotenv').config();
const axios = require('axios');

const getCordenadas = async (city) => {
  const apiKey = process.env.API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      throw new Error('Erro: Essa cidade não foi encontrada');
    }
  } catch (error) {
    console.error('Erro ao obter coordenadas:', error.message);
  }
};

// Faz alguma coisa pra testar isso, chama a função lá em cima
// getCordenadas('São Paulo').then(coords => console.log(coords));

// Função pra pegar a condição climatica (no site é um fells_like e um description)
const getCondicao = async (lat, lon) => {
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const { feels_like } = response.data.main;
    const { description } = response.data.weather[0];
    return { feels_like, description };
  } catch (error) {
    console.error('Erro ao obter condições climáticas:', error.message);
  }
};

// Essa função vai juntar a função de pegar a condição climatica atual e com a lat e long da função getCordenadas
const getTempo_Cidade = async (city) => {
  try {
    const coords = await getCordenadas(city);
    if (coords) {
      const weather = await getCondicao(coords.lat, coords.lon);
      console.log(`${city} está com uma sensação térmica de ${weather.feels_like}°C e o clima está ${weather.description}.`);
    }
  } catch (error) {
    console.error('Erro ao obter cordenadas:', error.message);
  }
};

// Teste
getTempo_Cidade('Bruxelas');
getCordenadas('Bruxelas').then(coords => console.log(coords));