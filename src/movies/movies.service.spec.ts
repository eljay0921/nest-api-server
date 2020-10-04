import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let movieId: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    movieId = service.addOne({
      title: 'test title',
      year: 2020,
      genres: ['action', 'sports', 'drama'],
    });
  });

  describe('Unit Test :: get all movies', () => {
    it('should be return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Unit Test :: get one movie', () => {
    it('should be return a movie information', () => {
      const movie = service.getOne(movieId);
      expect(movie).toBeDefined();
      expect(movie.title).toEqual('test title');
    });

    it('should throw NotFoundException', () => {
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
    it('should be remove', () => {
      const beforeRemoveLen = service.getAll().length;
      service.removeOne(movieId);
      const afterRemoveLen = service.getAll().length;
      expect(afterRemoveLen).toBeLessThan(beforeRemoveLen);
    });

    it('should throw NotFoundException', () => {
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

      const secondMovieId = service.addOne({
        title: 'test title 2',
        year: 2021,
        genres: ['action', 'sports', 'drama'],
      });

      expect(secondMovieId).toEqual(2);
      expect(secondMovieId).toEqual(expect.any(Number));

      const addedMoviesLen = service.getAll().length;

      expect(addedMoviesLen).toBeGreaterThan(originMoviesLen);

      const addedMovie = service.getOne(secondMovieId);
      expect(addedMovie.title).toEqual('test title 2');
      expect(addedMovie.year).toEqual(2021);
      expect(addedMovie.genres.length).toEqual(3);
    });
  });

  describe('Unit Test :: update one movie', () => {
    it('should update a movie', () => {
      service.updateOne(movieId, { year: 2099 });

      const updatedMovie = service.getOne(movieId);
      expect(updatedMovie.id).toEqual(movieId);
      expect(updatedMovie.title).toEqual('test title');
      expect(updatedMovie.year).toEqual(2099);
    });

    it('should throw NotFoundException', () => {
      const nonExistId = 9999;
      try {
        service.updateOne(nonExistId, { title: 'blah blah~' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie id ${nonExistId} is not found.`);
      }
    });
  });
});
