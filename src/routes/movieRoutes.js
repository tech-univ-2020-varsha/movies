const { addMovies, getMovieDetail, insertMovie } = require('../handler/movies');

const movieRoutes = [
  {
    path: '/movies', method: 'POST', handler: addMovies,
  },
  {
    path: '/movies/{id}',
    method: 'GET',

    handler: getMovieDetail,

  },
  {
    path: '/movies/movie',
    method: 'POST',

    handler: insertMovie,

  },

];

module.exports = movieRoutes;
