const axios = require('axios');
const dbOperations = require('../../src/utils/dbOperations');
const { addMovies, getMovie } = require('../../src/handler/movies');

describe('the add movie function', () => {
  it('should return a success message with status code 200 when data is successfully inserted to db', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    const mockMovie = {
      id: '6638453965',
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    };

    const mockActor = {
      name: 'Brad Pitt',
      movies: [
        '7533474498',
        '1393797017',
        '6621531523',
      ],
    };
    const mockGenre = {

      name: 'Crime',
      id: 1,

    };
    const mockMovieData = {
      data: {
        movies: [mockMovie],
        genres: [mockGenre],
        actors: [mockActor],
      },

    };

    mockAxios.mockResolvedValue(mockMovieData);

    const mockInsertMovie = jest.spyOn(dbOperations, 'insertToMovieLists');
    mockInsertMovie.mockResolvedValue();
    const mockInsertGenres = jest.spyOn(dbOperations, 'insertToGenres');
    mockInsertGenres.mockResolvedValue();
    const mockInsertActors = jest.spyOn(dbOperations, 'insertToActors');
    mockInsertActors.mockResolvedValue();
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    await addMovies(null, mockH);

    expect(mockInsertMovie).toHaveBeenCalledWith(mockMovieData.data.movies);
    expect(mockInsertGenres).toHaveBeenCalledWith(mockMovieData.data.genres);
    expect(mockInsertActors).toHaveBeenCalledWith(mockMovieData.data.actors);
    expect(mockH.response).toHaveBeenCalledWith('Successfull inserted data to db');
    expect(mockCode).toHaveBeenCalledWith(200);
    mockInsertMovie.mockRestore();
    mockInsertGenres.mockRestore();
    mockInsertGenres.mockRestore();
  });

  it('should return a failure message with status code 500 when insert to movie fails', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    const mockMovie = {
      id: '6638453965',
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    };

    const mockActor = {
      name: 'Brad Pitt',
      movies: [
        '7533474498',
        '1393797017',
        '6621531523',
      ],
    };
    const mockGenre = {

      name: 'Crime',
      id: 1,

    };
    const mockMovieData = {
      data: {
        movies: [mockMovie],
        genres: [mockGenre],
        actors: [mockActor],
      },

    };

    mockAxios.mockResolvedValue(mockMovieData);

    const mockInsertMovie = jest.spyOn(dbOperations, 'insertToMovieLists');
    mockInsertMovie.mockRejectedValue(new Error('Unable to insert data to db'));
    const mockInsertGenres = jest.spyOn(dbOperations, 'insertToGenres');
    mockInsertGenres.mockResolvedValue();
    const mockInsertActors = jest.spyOn(dbOperations, 'insertToActors');
    mockInsertActors.mockResolvedValue();
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    await addMovies(null, mockH);

    expect(mockInsertMovie).toHaveBeenCalledWith(mockMovieData.data.movies);
    expect(mockH.response).toHaveBeenCalledWith('Unable to insert data to db');
    expect(mockCode).toHaveBeenCalledWith(500);
    mockInsertMovie.mockRestore();
    mockInsertGenres.mockRestore();
    mockInsertGenres.mockRestore();
  });

  it('should return a failure message with status code 500 when insert to genres fails', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    const mockMovie = {
      id: '6638453965',
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    };

    const mockActor = {
      name: 'Brad Pitt',
      movies: [
        '7533474498',
        '1393797017',
        '6621531523',
      ],
    };
    const mockGenre = {

      name: 'Crime',
      id: 1,

    };
    const mockMovieData = {
      data: {
        movies: [mockMovie],
        genres: [mockGenre],
        actors: [mockActor],
      },

    };

    mockAxios.mockResolvedValue(mockMovieData);

    const mockInsertMovie = jest.spyOn(dbOperations, 'insertToMovieLists');
    mockInsertMovie.mockResolvedValue();

    const mockInsertGenres = jest.spyOn(dbOperations, 'insertToGenres');
    mockInsertGenres.mockRejectedValue(new Error('Unable to insert data to db'));
    const mockInsertActors = jest.spyOn(dbOperations, 'insertToActors');
    mockInsertActors.mockResolvedValue();
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    await addMovies(null, mockH);

    expect(mockInsertMovie).toHaveBeenCalledWith(mockMovieData.data.movies);
    expect(mockInsertGenres).toHaveBeenCalledWith(mockMovieData.data.genres);

    expect(mockH.response).toHaveBeenCalledWith('Unable to insert data to db');
    expect(mockCode).toHaveBeenCalledWith(500);
    mockInsertMovie.mockRestore();
    mockInsertGenres.mockRestore();
    mockInsertGenres.mockRestore();
  });

  it('should return a failure message with status code 500 when insert to actors fails', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    const mockMovie = {
      id: '6638453965',
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    };

    const mockActor = {
      name: 'Brad Pitt',
      movies: [
        '7533474498',
        '1393797017',
        '6621531523',
      ],
    };
    const mockGenre = {

      name: 'Crime',
      id: 1,

    };
    const mockMovieData = {
      data: {
        movies: [mockMovie],
        genres: [mockGenre],
        actors: [mockActor],
      },

    };

    mockAxios.mockResolvedValue(mockMovieData);

    const mockInsertMovie = jest.spyOn(dbOperations, 'insertToMovieLists');
    mockInsertMovie.mockResolvedValue();

    const mockInsertGenres = jest.spyOn(dbOperations, 'insertToGenres');
    mockInsertGenres.mockResolvedValue();
    const mockInsertActors = jest.spyOn(dbOperations, 'insertToActors');
    mockInsertActors.mockRejectedValue(new Error('Unable to insert data to db'));
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    await addMovies(null, mockH);

    expect(mockInsertMovie).toHaveBeenCalledWith(mockMovieData.data.movies);
    expect(mockInsertGenres).toHaveBeenCalledWith(mockMovieData.data.genres);

    expect(mockH.response).toHaveBeenCalledWith('Unable to insert data to db');
    expect(mockCode).toHaveBeenCalledWith(500);
    mockInsertMovie.mockRestore();
    mockInsertGenres.mockRestore();
    mockInsertGenres.mockRestore();
  });
});
