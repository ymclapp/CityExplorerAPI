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

app.get('/movies', getMovies);


//Make sure the server is listening for requests.  Adding http et al. now you can click on the link to see the localhost running
app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));

//route handlers down here
const axios = require('axios');

//Beginning of Weather
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
    console.error('axios error!', err);
    response.status(500).send('This is a Status 500.  Negative Ghost Rider; the pattern is full.');
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
//End of Weather

//Beginning of Movies
async function getMovies(request, response) {
  const api_key = process.env.API_MOVIE_KEY;

  try {
    const movieResults = await axios.get('https://api.themoviedb.org/3/search/movie?', {
      params:  {
        query: 'seattle',
        api_key,
        // language: 'en-US',
        // page: 1,
      },
    });
    console.log('HERE IS THE MOVIES........................................................................!!!', movieResults.data.results);
    let movieData =
      movieResults.data.results.map(movie => new Movie(movie));
    response.send(movieData);
  }
  catch(err) {
    console.error('axios error!', err);
    response.status(500).send('This is a Status 500. Negative Ghost Rider; the pattern is full');
  }
}

class Movie {
  constructor(movieData) {
    this.title = movieData.title;
    this.overview = movieData.overview;
    this.average_votes = movieData.vote_average;
    this.total_votes = movieData.vote_count;
    this.image_url = movieData.poster_path;
    this.popularity = movieData.popularity;
    this.released_on = movieData.release_date;
  }
}
//End of Movies

