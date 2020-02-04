const { addMovies, getMovieDetail } = require('../handler/movies');

const movieRoutes = [
  {
    path: '/movies', method: 'POST', handler: addMovies,
  },
  {
    path: '/movies/{id}',
    method: 'GET',

    handler: getMovieDetail,

  },

];

module.exports = movieRoutes;
