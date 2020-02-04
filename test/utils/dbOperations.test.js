const dbOperations = require('../../src/utils/dbOperations');
const movieSequelize = require('../../models/index');


describe('the insertToMovieLists operation', () => {
  const moviedb = movieSequelize.movielists;
  it('should insert data to movielists table on success', async () => {
    const mockCreate = jest.spyOn(moviedb, 'create');
    const mockMovie = {
      id: '6638453965',
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    };
    mockCreate.mockResolvedValue();
    await dbOperations.insertToMovieLists(mockMovie);
    expect(mockCreate).toHaveBeenCalledWith(mockMovie);
  });

  it('should return error message when insert to db operation fails', async () => {
    const mockCreate = jest.spyOn(moviedb, 'create');
    const mockMovie = {
      id: '6638453965',
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    };
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
  const mockGenre = {
    name: 'Crime',
    id: 1,
  };
  it('should insert data to genres table on success', async () => {
    const mockCreate = jest.spyOn(genresdb, 'create');

    mockCreate.mockResolvedValue();
    await dbOperations.insertToGenres(mockGenre);
    expect(mockCreate).toHaveBeenCalledWith(mockGenre);
  });

  it('should return error message when insert to db operation fails', async () => {
    const mockCreate = jest.spyOn(genresdb, 'create');

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
  const mockActor = {
    name: 'Brad Pitt',
    movies: [
      '7533474498',
      '1393797017',
      '6621531523',
    ],
  };
  it('should insert data to genres table on success', async () => {
    const mockCreate = jest.spyOn(actorsdb, 'create');

    mockCreate.mockResolvedValue();
    await dbOperations.insertToActors(mockActor);
    expect(mockCreate).toHaveBeenCalledWith(mockActor);
  });

  it('should return error message when insert to db operation fails', async () => {
    const mockCreate = jest.spyOn(actorsdb, 'create');

    try {
      mockCreate.mockRejectedValue(new Error('Unable to add actors'));
      await dbOperations.insertToActors(mockActor);
    } catch (err) {
      expect(err.message).toBe('Unable to add actors');
    }
  });
});
