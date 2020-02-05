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
const getMovie = async (movieName) => {
  try {
    const moviesdb = movieSequelize.movielists;
    const result = await moviesdb.findAll({
      attributes: ['name'],
      raw: true,
      where: {
        name: movieName,
      },
    });
    return result;
  } catch (err) {
    throw new Error('Unable to fetch the movie');
  }
};

const getGenreId = async (genrelist) => {
  const genresdb = movieSequelize.genres;
  try {
    const result = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const genre of genrelist) {
      // eslint-disable-next-line no-await-in-loop
      const response = await genresdb.findOne({
        raw: true,
        attributes: ['id'],
        where: {
          name: genre,
        },
      });
      // eslint-disable-next-line no-await-in-loop
      const genreLength = await genresdb.findAll({ raw: true });
      if (response === null) {
        // eslint-disable-next-line no-await-in-loop
        await genresdb.create({
          id: genreLength.length + 1,
          name: genre,
        });
        result.push(genreLength.length + 1);
      } else {
        result.push(response.id);
      }
    }
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateOrInsertActor = async (actorsList, movieId) => {
  const actorsdb = movieSequelize.actors;
  try {
    const id = 0;
    actorsList.forEach(async (actor) => {
      const checkActorPresent = await actorsdb.findAll({
        attributes: ['movies'],
        raw: true,
        where: {
          name: actor,
        },
      });
      if (checkActorPresent.length === 0) {
        await actorsdb.create({
          name: actor,
          movies: [movieId],
        });
      } else {
        await actorsdb.update({
          movies: [...checkActorPresent.movies, movieId],
        }, {
          where:
          {
            name: actorsList[id],
          },
        });
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  insertToMovieLists,
  insertToGenres,
  insertToActors,
  getMovieNameGenre,
  getGenres,
  getActors,
  getGenreId,
  updateOrInsertActor,
  getMovie,
};
