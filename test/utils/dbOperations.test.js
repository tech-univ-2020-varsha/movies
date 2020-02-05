const { Op } = require('sequelize');
const dbOperations = require('../../src/utils/dbOperations');
const movieSequelize = require('../../models/index');

describe('the insertToMovieLists operation', () => {
  const moviedb = movieSequelize.movielists;
  it('should insert data to movielists table on success', async () => {
    const mockCreate = jest.spyOn(moviedb, 'bulkCreate');
    const mockMovie = [{
      id: '6638453965',
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    }];
    mockCreate.mockResolvedValue();
    await dbOperations.insertToMovieLists(mockMovie);
    expect(mockCreate).toHaveBeenCalledWith(mockMovie);
  });

  it('should return error message when insert to db operation fails', async () => {
    const mockCreate = jest.spyOn(moviedb, 'bulkCreate');
    const mockMovie = [{
      id: '6638453965',
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    }];
    try {
      mockCreate.mockRejectedValue(new Error('Unable to add movies'));
      await dbOperations.insertToMovieLists(mockMovie);
    } catch (err) {
      expect(err.message).toBe('Unable to add movies');
    }
  });
});


describe('the insertToGenres operation', () => {
  const genresdb = movieSequelize.genres;
  const mockGenre = [{
    name: 'Crime',
    id: 1,
  }];
  it('should insert data to genres table on success', async () => {
    const mockCreate = jest.spyOn(genresdb, 'bulkCreate');

    mockCreate.mockResolvedValue();
    await dbOperations.insertToGenres(mockGenre);
    expect(mockCreate).toHaveBeenCalledWith(mockGenre);
  });

  it('should return error message when insert to db operation fails', async () => {
    const mockCreate = jest.spyOn(genresdb, 'bulkCreate');

    try {
      mockCreate.mockRejectedValue(new Error('Unable to add genres'));
      await dbOperations.insertToGenres(mockGenre);
    } catch (err) {
      expect(err.message).toBe('Unable to add genres');
    }
  });
});


describe('the insertToActors operation', () => {
  const actorsdb = movieSequelize.actors;
  const mockActor = [{
    name: 'Brad Pitt',
    movies: [
      '7533474498',
      '1393797017',
      '6621531523',
    ],
  }];
  it('should insert data to genres table on success', async () => {
    const mockCreate = jest.spyOn(actorsdb, 'bulkCreate');

    mockCreate.mockResolvedValue();
    await dbOperations.insertToActors(mockActor);
    expect(mockCreate).toHaveBeenCalledWith(mockActor);
  });

  it('should return error message when insert to db operation fails', async () => {
    const mockCreate = jest.spyOn(actorsdb, 'bulkCreate');

    try {
      mockCreate.mockRejectedValue(new Error('Unable to add actors'));
      await dbOperations.insertToActors(mockActor);
    } catch (err) {
      expect(err.message).toBe('Unable to add actors');
    }
  });
});

describe('the getMovieNameGenre operation', () => {
  const movieid = '7533474498';
  const moviedb = movieSequelize.movielists;

  it('should get the name and genre given to movieID on success', async () => {
    const mockFindOne = jest.spyOn(moviedb, 'findOne');
    const mockFindOneAttributes = {
      raw: true,
      attributes: ['name', 'genres'],
      where: {
        id: movieid,
      },
    };
    mockFindOne.mockResolvedValue();
    await dbOperations.getMovieNameGenre(movieid);
    expect(mockFindOne).toHaveBeenCalledWith(mockFindOneAttributes);
  });

  it('should return error message when insert to db operation fails', async () => {
    try {
      const mockFindOne = jest.spyOn(moviedb, 'findOne');
      const mockFindOneAttributes = {
        raw: true,
        attributes: ['name', 'genres'],
        where: {
          id: movieid,
        },
      };
      mockFindOne.mockRejectedValue(new Error('Unable to obtain the details'));
      await dbOperations.getMovieNameGenre(movieid);
      expect(mockFindOne).toHaveBeenCalledWith(mockFindOneAttributes);
    } catch (err) {
      expect(err.message).toBe('Unable to obtain the details');
    }
  });
});

describe('the get movie function', () => {
  const moviesdb = movieSequelize.movielists;
  it('should get the movie on success', async () => {
    const mockMovieName = 'Pineapple Express';
    const mockFindAll = jest.spyOn(moviesdb, 'findAll');
    const mockfindAllAttributes = {
      raw: true,
      attributes: ['name'],
      where: {
        name: mockMovieName,
      },
    };
    const mockFindAllResult = [{
      name: 'Pineapple Express',

    }];
    mockFindAll.mockResolvedValue(mockFindAllResult);
    const result = await dbOperations.getMovie(mockMovieName);
    expect(mockFindAll).toHaveBeenCalledWith(mockfindAllAttributes);
    expect(result).toBe(mockFindAllResult);
  });
  it('should return an error message when db operation to fetch movie fails', async () => {
    const mockMovieName = 'Pineapple Express';
    try {
      const mockFindAll = jest.spyOn(moviesdb, 'findAll');
      const mockfindAllAttributes = {
        raw: true,
        attributes: ['name'],
        where: {
          name: mockMovieName,
        },
      };

      mockFindAll.mockRejectedValue(new Error('Unable to fetch the movie'));
      await dbOperations.getMovie(mockMovieName);
      expect(mockFindAll).toHaveBeenCalledWith(mockfindAllAttributes);
    } catch (err) {
      expect(err.message).toBe('Unable to fetch the movie');
    }
  });
});


describe('the getGenres operation', () => {
  const genresIdArray = [1, 2, 3];
  const genresdb = movieSequelize.genres;

  it('should get the name and genre given to movieID on success', async () => {
    const mockFindAll = jest.spyOn(genresdb, 'findAll');
    const mockfindAllAttributes = {
      raw: true,
      attributes: ['name'],
      where: {
        id: genresIdArray,
      },
    };
    const mockFindAllResult = [{
      name: 'Crime',

    }];
    mockFindAll.mockResolvedValue(mockFindAllResult);
    await dbOperations.getGenres(genresIdArray);

    expect(mockFindAll).toHaveBeenCalledWith(mockfindAllAttributes);


    mockFindAll.mockRestore();
  });

  it('should return error message when insert to db operation fails', async () => {
    try {
      const mockFindAll = jest.spyOn(genresdb, 'findAll');
      const mockFindAllAttributes = {
        raw: true,
        attributes: ['name'],
        where: {
          id: genresIdArray,
        },
      };
      mockFindAll.mockRejectedValue(new Error('Unable to obtain the details'));
      await dbOperations.getGenres(genresIdArray);
      expect(mockFindAll).toHaveBeenCalledWith(mockFindAllAttributes);
    } catch (err) {
      expect(err.message).toBe('Unable to obtain the details');
    }
  });
});

describe('the getActors operation', () => {
  const movieid = '7533474498';
  const actorsdb = movieSequelize.actors;

  it('should get the actors given to movieID on success', async () => {
    const mockFindAll = jest.spyOn(actorsdb, 'findAll');
    const mockfindAllAttributes = {
      raw: true,
      attributes: ['name'],
      where: {
        movies: {
          [Op.contains]: [`${movieid}`],
        },
      },
    };
    const mockFindAllResult = [{
      name: 'Brad Pitt',

    }];
    mockFindAll.mockResolvedValue(mockFindAllResult);
    await dbOperations.getActors(movieid);

    expect(mockFindAll).toHaveBeenCalledWith(mockfindAllAttributes);


    mockFindAll.mockRestore();
  });

  it('should return error message when insert to db operation fails', async () => {
    try {
      const mockFindAll = jest.spyOn(actorsdb, 'findAll');
      const mockFindAllAttributes = {
        raw: true,
        attributes: ['name'],
        where: {
          movies: {
            [Op.contains]: [`${movieid}`],
          },
        },
      };
      mockFindAll.mockRejectedValue(new Error('Unable to obtain the details'));
      await dbOperations.getActors(movieid);
      expect(mockFindAll).toHaveBeenCalledWith(mockFindAllAttributes);
    } catch (err) {
      expect(err.message).toBe('Unable to obtain the details');
    }
  });
});

// describe('the get genreId function', () => {
//   it('should return the array of genre id on success', () => {
//     const genresdb = movieSequelize.genres;
//     const mockFindOne = jest.spyOn(genresdb, 'findOne');

//   });
// });
