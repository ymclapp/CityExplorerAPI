'use strict';

//Load Environment Variables from the .env file
require('dotenv').config();

const express = require ('express');

const app = express();

//add cors - middleware to be able to use with React
const cors = require('cors');
app.use(cors());

//Application Setup
const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('Home Page!');
});

// const weather = require('./data/weather.json');
app.get('/weather', getWeather);


//Make sure the server is listening for requests.  Adding http et al. now you can click on the link to see the localhost running
app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));

//route handlers down here
const axios = require('axios');


async function getWeather(request, response) {
  const q = request.query.q;
  const appid =process.env.API_WEATHER_KEY;
  const exclude = 'current,minutely,hourly,alerts';
  const lon = request.query.lon;
  const lat = request.query.lat;

  try {
    const results = await axios.get('https://api.openweathermap.org/data/2.5/onecall?', {
      params:  {
        q,
        exclude,
        lat,
        lon,
        // cnt: 7,
        appid,
      },
    });
    console.log(results.data.daily);
    let weatherData =
      results.data.daily.map(weather => new Weather(weather));

    response.send(weatherData);
  }
  catch(err) {
    console.error('axios error!', err);
    response.status(500).send('This is a Status 500.  Negative Ghost Rider the pattern is full.');
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
