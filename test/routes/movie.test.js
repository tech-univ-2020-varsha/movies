const axios = require('axios');
let server = require('../../server');
const dbOperations = require('../../src/utils/dbOperations');

const init = async () => {
  await server.initialize();
  return server;
};

describe('the server function', () => {
  beforeEach(async () => {
    server = await init();
  });
  afterEach(async () => {
    await server.stop();
  });

  it('should obtain 200 success code for route "movies" with POST method', async () => {
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

    const postMovies = {
      method: 'POST',
      url: '/movies',
    };
    const response = await server.inject(postMovies);
    expect(response.statusCode).toBe(200);
    mockInsertMovie.mockRestore();
    mockInsertGenres.mockRestore();
    mockInsertGenres.mockRestore();
  });
});
