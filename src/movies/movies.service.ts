import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

// 실제로 service.ts 에서는 db를 다루게 되겠지만, 이번 강의에서는 db처럼 유사하게만 사용할 예정

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  // controller에 있던 이름과 다르게 사용해도 되지만, 헷갈리지 않게 같은 이름으로 하자.
  // 실제 서비스라면 여기서 db에 연결하는 작업(쿼리 등)이 포함될 것이다. 이 예제에서는 dummy data로 하자.
  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const oneMovie = this.movies.find(movie => movie.id === id);
    if (!oneMovie) {
      throw new NotFoundException(`Movie id ${id} is not found.`);
    }
    return oneMovie;
  }

  addOne(movieData: CreateMovieDto): number {
    const id = this.movies.length + 1;
    this.movies.push({
      id,
      ...movieData,
    });

    return id;
  }

  removeOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  updateOne(id: number, movieData: UpdateMovieDto) {
    const movie = this.getOne(id);

    // 구리지만 db가 없고 dummy data를 사용하는 예제니까 일단 이렇게 하자...
    this.removeOne(id);
    this.movies.push({ ...movie, ...movieData });
  }
}
