const { addMovies, getMovie } = require('../handler/movies');

const movieRoutes = [
  {
    path: '/movies', method: 'POST', handler: addMovies,
  },
  {
    path: '/movies/{id}',
    method: 'GET',

    handler: getMovie,

  },

];

module.exports = movieRoutes;
