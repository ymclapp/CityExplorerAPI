const axios = require('axios');
const errorHandler = require('../errorHandler');

module.exports = {getMovies};

async function getMovies(request, response) {
  const api_key = process.env.API_MOVIE_KEY;

  try {
    const movieResults = await axios.get('https://api.themoviedb.org/3/search/movie?', {
      params:  {
        query: response.query,
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
    errorHandler(err, response);
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
