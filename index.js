require('dotenv').config();
const axios = require('axios');

// Função pra pegar as cords de alguma cidade
const getCoordinates = async (city) => {
  const apiKey = process.env.API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      throw new Error('Cidade não encontrada');
    }
  } catch (error) {
    console.error('Erro ao obter coordenadas:', error.message);
  }
};

// Faz alguma coisa pra testar isso, chama a função lá em cima
getCoordinates('São Paulo').then(coords => console.log(coords));
