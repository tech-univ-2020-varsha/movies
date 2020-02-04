const axios = require('axios');
const dbOperations = require('../utils/dbOperations');

const addMovies = async (request, h) => {
  try {
    const movieUrl = 'https://stormy-plains-72807.herokuapp.com/movies';
    const movies = await axios.get(movieUrl);
    const moviesData = movies.data.movies;

    await dbOperations.insertToMovieLists(moviesData);


    const genresUrl = 'https://stormy-plains-72807.herokuapp.com/genres';
    const genres = await axios.get(genresUrl);
    const genresData = genres.data.genres;
    await dbOperations.insertToGenres(genresData);


    const actorsUrl = 'https://stormy-plains-72807.herokuapp.com/actors';
    const actors = await axios.get(actorsUrl);
    const actorsData = actors.data.actors;
    await dbOperations.insertToActors(actorsData);


    return h.response('Successfull inserted data to db').code(200);
  } catch (error) {
    return h.response(error.message).code(500);
  }
};
const getMovieDetail = async (request, h) => {
  try {
    const movieId = request.params.id;
    const movieResponse = {};
    const result = await dbOperations.getMovieNameGenre(movieId);
    movieResponse.name = result.name;
    movieResponse.genres = await dbOperations.getGenres(result.genres);
    movieResponse.actors = await dbOperations.getActors(movieId);
    return h.response(movieResponse).code(200);
  } catch (error) {
    return h.response(error.message).code(500);
  }
};


module.exports = { addMovies, getMovieDetail };
