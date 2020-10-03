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
});
