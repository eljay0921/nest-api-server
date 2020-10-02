import { Injectable } from '@nestjs/common';
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

  getOne(id: string): Movie {
    return this.movies.find(movie => movie.id === +id);
  }

  removeOne(id: number): number {
    this.movies.filter(movie => movie.id !== id);
    return id;
  }

  addOne(movieData: Movie): number {
    const id = this.movies.length + 1;
    this.movies.push({
      id,
      ...movieData,
    });

    return id;
  }
}
