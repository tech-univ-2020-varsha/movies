const axios = require('axios');
const dbOperations = require('../../src/utils/dbOperations');
const { addMovies, getMovieDetail } = require('../../src/handler/movies');

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

describe('the getMovieDetail function', () => {
  it('should obtain status code of 200 on success', async () => {
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
    const movieId = '6638453965';
    const mockResponse = {
      name: 'The Shawshank Redemption',
      genres: [
        'Mystery',
        'Romance',
      ],
      actors: [
        'Morgan Freeman',
      ],
    };
    mockGetMovieNameGenre.mockResolvedValue(mockMovie);
    mockGetGenres.mockResolvedValue(mockGenre);
    mockGetActors.mockResolvedValue(mockActor);
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    const mockRequest = {
      params: {
        id: movieId,
      },
    };


    await getMovieDetail(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith(mockResponse);
    expect(mockCode).toHaveBeenCalledWith(200);
  });


  it('should obtain status code of 500 when we fail to obatin getMovieNameGenre ', async () => {
    const mockGetMovieNameGenre = jest.spyOn(dbOperations, 'getMovieNameGenre');
    const mockGetGenres = jest.spyOn(dbOperations, 'getGenres');
    const mockGetActors = jest.spyOn(dbOperations, 'getActors');
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };


    const mockGenre = [
      'Mystery',
      'Romance',
    ];
    const mockActor = [
      'Morgan Freeman',
    ];
    const movieId = '6638453965';

    mockGetMovieNameGenre.mockRejectedValue(new Error('Unable to obtain the details'));
    mockGetGenres.mockResolvedValue(mockGenre);
    mockGetActors.mockResolvedValue(mockActor);

    const mockRequest = {
      params: {
        id: movieId,
      },
    };
    await getMovieDetail(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Unable to obtain the details');
    expect(mockCode).toHaveBeenCalledWith(500);
  });

  it('should obtain status code of 500 when we fail to obatin getGenres ', async () => {
    const mockGetMovieNameGenre = jest.spyOn(dbOperations, 'getMovieNameGenre');
    const mockGetGenres = jest.spyOn(dbOperations, 'getGenres');
    const mockGetActors = jest.spyOn(dbOperations, 'getActors');
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
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
    const movieId = '6638453965';

    mockGetMovieNameGenre.mockResolvedValue(mockMovie);
    mockGetGenres.mockRejectedValue(new Error('Unable to obtain the details'));

    mockGetActors.mockResolvedValue(mockActor);

    const mockRequest = {
      params: {
        id: movieId,
      },
    };
    await getMovieDetail(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Unable to obtain the details');
    expect(mockCode).toHaveBeenCalledWith(500);
  });

  it('should obtain status code of 500 when we fail to obatin getActors ', async () => {
    const mockGetMovieNameGenre = jest.spyOn(dbOperations, 'getActors');
    const mockGetGenres = jest.spyOn(dbOperations, 'getGenres');
    const mockGetActors = jest.spyOn(dbOperations, 'getActors');
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
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

    const movieId = '6638453965';

    mockGetMovieNameGenre.mockResolvedValue(mockMovie);
    mockGetActors.mockRejectedValue(new Error('Unable to obtain the details'));

    mockGetGenres.mockResolvedValue(mockGenre);

    const mockRequest = {
      params: {
        id: movieId,
      },
    };
    await getMovieDetail(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Unable to obtain the details');
    expect(mockCode).toHaveBeenCalledWith(500);
  });
});
