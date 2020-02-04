const axios = require('axios');
const dbOperations = require('../utils/dbOperations');

const addMovies = async (request, h) => {
  try {
    const movieUrl = 'https://stormy-plains-72807.herokuapp.com/movies';
    const movies = await axios.get(movieUrl);
    const moviesData = movies.data.movies;
    moviesData.forEach((movie) => {
      try {
        dbOperations.insertToMovieLists(movie);
      } catch (err) {
        throw new Error('Unable to add movies');
      }
    });

    const genresUrl = 'https://stormy-plains-72807.herokuapp.com/genres';
    const genres = await axios.get(genresUrl);
    const genresData = genres.data.genres;
    genresData.forEach(async (genre) => {
      await dbOperations.insertToGenres(genre);
    });

    const actorsUrl = 'https://stormy-plains-72807.herokuapp.com/actors';
    const actors = await axios.get(actorsUrl);
    const actorsData = actors.data.actors;
    actorsData.forEach(async (actor) => {
      await dbOperations.insertToActors(actor);
    });

    return h.response('Successfull inserted data to db').code(200);
  } catch (error) {
    console.log('errro is expected');
    return h.response(error.message).code(500);
  }
};
const getMovie = (request, h) => h.response('get movie');

module.exports = { addMovies, getMovie };
