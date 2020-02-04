const movieSequelize = require('../../models/index');


const insertToMovieLists = async (movies) => {
  try {
    const moviedb = movieSequelize.movielists;
    await moviedb.bulkCreate(movies);
  } catch (err) {
    console.log('error', err.message);
    throw new Error('Unable to add movies');
  }
};

const insertToGenres = async (genres) => {
  try {
    const genresdb = movieSequelize.genres;
    await genresdb.bulkCreate(genres);
  } catch (err) {
    throw new Error('Unable to add genres');
  }
};

const insertToActors = async (actors) => {
  try {
    const actorsdb = movieSequelize.actors;
    await actorsdb.bulkCreate(actors);
  } catch (err) {
    console.log(err.message);
    throw new Error('Unable to add actors');
  }
};

// const getMovieDetails = async (movieId) => {

// };


module.exports = { insertToMovieLists, insertToGenres, insertToActors };
