const { Op } = require('sequelize');
const movieSequelize = require('../../models/index');

const insertToMovieLists = async (movies) => {
  try {
    const moviedb = movieSequelize.movielists;
    await moviedb.bulkCreate(movies);
  } catch (err) {
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
    throw new Error('Unable to add actors');
  }
};


const getMovieNameGenre = async (movieId) => {
  const moviedb = movieSequelize.movielists;
  try {
    const result = await moviedb.findOne({
      raw: true,
      attributes: ['name', 'genres'],
      where: {
        id: movieId,
      },
    });
    return result;
  } catch (err) {
    throw new Error('Unable to obtain the details');
  }
};

const getGenres = async (genresIdArray) => {
  const genresdb = movieSequelize.genres;
  try {
    let result = await genresdb.findAll(
      {
        raw: true,
        attributes: ['name'],
        where: {
          id: genresIdArray,
        },
      },
    );
    result = result.map((genres) => genres.name);
    return result;
  } catch (err) {
    throw new Error('Unable to obtain the details');
  }
};


const getActors = async (movieId) => {
  const actorsdb = movieSequelize.actors;
  try {
    let result = await actorsdb.findAll({
      raw: true,
      attributes: ['name'],
      where: {
        movies: {
          [Op.contains]: [`${movieId}`],
        },
      },
    });
    result = result.map((actor) => actor.name);
    return result;
  } catch (err) {
    throw new Error('Unable to obtain the details');
  }
};

module.exports = {
  insertToMovieLists, insertToGenres, insertToActors, getMovieNameGenre, getGenres, getActors,
};
