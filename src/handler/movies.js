const axios = require('axios');
const dbOperations = require('../utils/dbOperations');

const addMovies = async (request, h) => {
  try {
    const movieUrl = 'https://stormy-plains-72807.herokuapp.com/movies';
    const genresUrl = 'https://stormy-plains-72807.herokuapp.com/genres';
    const actorsUrl = 'https://stormy-plains-72807.herokuapp.com/actors';
    await Promise.all([axios.get(movieUrl), axios.get(genresUrl), axios.get(actorsUrl)]).then((values) => {
      dbOperations.insertToMovieLists(values[0].data.movies);
      dbOperations.insertToGenres(values[1].data.genres);
      dbOperations.insertToActors(values[2].data.actors);
    });
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

const insertMovie = async (request, h) => {
  try {
    const movieJson = request.payload;
    const moviePresent = await dbOperations.getMovie(movieJson.name);

    if (moviePresent.length === 0) {
      const movieId = Math.floor(100000 + Math.random() * 900000);
      const movieDbData = {};
      movieDbData.id = movieId;
      movieDbData.name = movieJson.name;
      movieDbData.genres = await dbOperations.getGenreId(movieJson.genres);
      await dbOperations.insertToMovieLists([movieDbData]);
      await dbOperations.updateOrInsertActor(movieJson.actors, movieId);
      return h.response(movieDbData).code(200);
    }
    return h.response('database already contains the movie');
  } catch (err) {
    console.log(err);
    return h.response(err).code(500);
  }
};


module.exports = { addMovies, getMovieDetail, insertMovie };
