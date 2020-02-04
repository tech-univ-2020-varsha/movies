const axios = require('axios');
let server = require('../../server');
const dbOperations = require('../../src/utils/dbOperations');

const init = async () => {
  await server.initialize();
  return server;
};

describe('the POST movies route', () => {
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

  it('should obtain 500 status code for route "movies" with POST method when when insert to movie fails', async () => {
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

    const postMovies = {
      method: 'POST',
      url: '/movies',
    };
    const response = await server.inject(postMovies);
    expect(response.statusCode).toBe(500);

    mockInsertMovie.mockRestore();
    mockInsertGenres.mockRestore();
    mockInsertGenres.mockRestore();
  });

  it('should obtain 500 status code for route "movies" with POST method when when insert to genres fails', async () => {
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

    const postMovies = {
      method: 'POST',
      url: '/movies',
    };
    const response = await server.inject(postMovies);
    expect(response.statusCode).toBe(500);

    mockInsertMovie.mockRestore();
    mockInsertGenres.mockRestore();
    mockInsertGenres.mockRestore();
  });

  it('should obtain 500 status code for route "movies" with POST method when when insert to actors fails', async () => {
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

    const postMovies = {
      method: 'POST',
      url: '/movies',
    };
    const response = await server.inject(postMovies);
    expect(response.statusCode).toBe(500);

    mockInsertMovie.mockRestore();
    mockInsertGenres.mockRestore();
    mockInsertGenres.mockRestore();
  });
});
describe('the GET movies route', () => {
  beforeEach(async () => {
    server = await init();
  });
  afterEach(async () => {
    await server.stop();
  });

  it('should obtain 200 success code for route "movies/id" with GET method', async () => {
    const mockGetMovieNameGenre = jest.spyOn(dbOperations, 'getMovieNameGenre');
    const mockGetGenres = jest.spyOn(dbOperations, 'getGenres');
    const mockGetActors = jest.spyOn(dbOperations, 'getActors');
    const mockMovie = {
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    };

    const mockGenre = [
      'Mystery',
      'Romance',
    ];
    const mockActor = [
      'Morgan Freeman',
    ];

    mockGetMovieNameGenre.mockResolvedValue(mockMovie);
    mockGetGenres.mockResolvedValue(mockGenre);
    mockGetActors.mockResolvedValue(mockActor);


    const getMovies = {
      method: 'GET',
      url: '/movies/6638453965',
    };
    const response = await server.inject(getMovies);
    expect(response.statusCode).toBe(200);
  });


  it('should obtain status code of 500 when we fail to obatin getMovieNameGenre ', async () => {
    const mockGetMovieNameGenre = jest.spyOn(dbOperations, 'getMovieNameGenre');
    const mockGetGenres = jest.spyOn(dbOperations, 'getGenres');
    const mockGetActors = jest.spyOn(dbOperations, 'getActors');

    const mockGenre = [
      'Mystery',
      'Romance',
    ];
    const mockActor = [
      'Morgan Freeman',
    ];


    mockGetMovieNameGenre.mockRejectedValue(new Error('Unable to obtain the details'));
    mockGetGenres.mockResolvedValue(mockGenre);
    mockGetActors.mockResolvedValue(mockActor);


    const getMovies = {
      method: 'GET',
      url: '/movies/6638453965',
    };
    const response = await server.inject(getMovies);
    expect(response.statusCode).toBe(500);
  });

  it('should obtain status code of 500 when we fail to obatin getGenres', async () => {
    const mockGetMovieNameGenre = jest.spyOn(dbOperations, 'getMovieNameGenre');
    const mockGetGenres = jest.spyOn(dbOperations, 'getGenres');
    const mockGetActors = jest.spyOn(dbOperations, 'getActors');

    const mockMovie = {
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    };


    const mockActor = [
      'Morgan Freeman',
    ];


    mockGetMovieNameGenre.mockResolvedValue(mockMovie);
    mockGetGenres.mockRejectedValue(new Error('Unable to obtain the details'));

    mockGetActors.mockResolvedValue(mockActor);


    const getMovies = {
      method: 'GET',
      url: '/movies/6638453965',
    };
    const response = await server.inject(getMovies);
    expect(response.statusCode).toBe(500);
  });

  it('should obtain status code of 500 when we fail to obatin getActors ', async () => {
    const mockGetMovieNameGenre = jest.spyOn(dbOperations, 'getActors');
    const mockGetGenres = jest.spyOn(dbOperations, 'getGenres');
    const mockGetActors = jest.spyOn(dbOperations, 'getActors');

    const mockMovie = {
      name: 'The Shawshank Redemption',
      genres: [
        2,
        4,
      ],
    };

    const mockGenre = [
      'Mystery',
      'Romance',
    ];


    mockGetMovieNameGenre.mockResolvedValue(mockMovie);
    mockGetActors.mockRejectedValue(new Error('Unable to obtain the details'));

    mockGetGenres.mockResolvedValue(mockGenre);


    const getMovies = {
      method: 'GET',
      url: '/movies/6638453965',
    };
    const response = await server.inject(getMovies);
    expect(response.statusCode).toBe(500);
  });
});


describe('the invalid route', () => {
  it('should obtain status code of 404 when invalid path is requested', async () => {
    const somePath = {
      method: 'POST',
      url: '/movies/6638453965',
    };
    const response = await server.inject(somePath);
    expect(response.statusCode).toBe(404);
  });
});
