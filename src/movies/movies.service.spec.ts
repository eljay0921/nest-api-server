import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('Unit Test :: get all movies', () => {
    it('should be return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Unit Test :: get one movie', () => {
    it('should be return a movie information', () => {
      const movieId = service.addOne({
        title: 'test title',
        year: 2020,
        genres: ['action', 'sports', 'drama'],
      });

      const movie = service.getOne(movieId);
      expect(movie).toBeDefined();
      expect(movie.title).toEqual('test title');
    });

    it('should throw 404 error', () => {
      const nonExistId = 9999;
      try {
        service.getOne(nonExistId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie id ${nonExistId} is not found.`);
      }
    });
  });

  describe('Unit Test :: remove one movie', () => {
    let movieId = 0;

    it('should be remove', () => {
      movieId = service.addOne({
        title: 'test title',
        year: 2020,
        genres: ['action', 'sports', 'drama'],
      });

      const beforeRemoveLen = service.getAll().length;
      service.removeOne(movieId);
      const afterRemoveLen = service.getAll().length;
      expect(afterRemoveLen).toBeLessThan(beforeRemoveLen);
    });

    it('should throw 404 error', () => {
      try {
        service.removeOne(movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie id ${movieId} is not found.`);
      }
    });
  });

  describe('Unit Test :: add one movie', () => {
    it('shoul add a movie', () => {
      const originMoviesLen = service.getAll().length;

      const movieId = service.addOne({
        title: 'test title',
        year: 2020,
        genres: ['action', 'sports', 'drama'],
      });

      expect(movieId).toEqual(1);
      expect(movieId).toEqual(expect.any(Number));

      const addedMoviesLen = service.getAll().length;

      expect(addedMoviesLen).toBeGreaterThan(originMoviesLen);

      const addedMovie = service.getOne(movieId);
      expect(addedMovie.title).toEqual('test title');
      expect(addedMovie.year).toEqual(2020);
      expect(addedMovie.genres.length).toEqual(3);
    });
  });
});
