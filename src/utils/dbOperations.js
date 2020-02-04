const movieSequelize = require('../../models/index');


const insertToMovieLists = async (movie) => {
  try {
    const moviedb = movieSequelize.movielists;
    await moviedb.create({ id: movie.id, name: movie.name, genres: movie.genres });
  } catch (err) {
    console.log('error', err.message);
    throw new Error('Unable to add movies');
  }
};

const insertToGenres = async (genres) => {
  try {
    const genresdb = movieSequelize.genres;
    await genresdb.create({ id: genres.id, name: genres.name });
  } catch (err) {
    throw new Error('Unable to add genres');
  }
};

const insertToActors = async (actors) => {
  try {
    const actorsdb = movieSequelize.actors;
    await actorsdb.create({ name: actors.name, movies: actors.movies });
  } catch (err) {
    console.log(err.message);
    throw new Error('Unable to add actors');
  }
};


module.exports = { insertToMovieLists, insertToGenres, insertToActors };
