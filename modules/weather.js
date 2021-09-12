const axios = require('axios');
const errorHandler = require('../errorHandler');

module.exports = {getWeather};


async function getWeather(request, response) {
  const q = request.query.q;
  const appid = process.env.API_WEATHER_KEY;
  const exclude = 'current,minutely,hourly,alerts';
  const lon = request.query.lon;
  const lat = request.query.lat;

  try {
    const weatherResults = await axios.get('https://api.openweathermap.org/data/2.5/onecall?', {
      params:  {
        q,
        exclude,
        lat,
        lon,
        // cnt: 7,
        appid,
      },
    });
    console.log('HERE IS THE WEATHER...............................................................!!!', weatherResults.data.daily);
    let weatherData =
        weatherResults.data.daily.map(weather => new Weather(weather));

    response.send(weatherData);
  }
  catch(err) {
    errorHandler(err, response);
  }
}

class Weather {
  constructor(weatherData) {
    // this.forecast = weatherData.timezone;
    this.description = weatherData.weather[0].description;
    this.time = new Date (weatherData.dt).toDateString();
    // this.time = weatherData.dt;
  }
}
