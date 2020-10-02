import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('title') movieTitle: string) {
    return `We are searching for a movie with a ${movieTitle}`;
  }

  @Get(':id')
  getOne(@Param('id') movieID: number) {
    return this.moviesService.getOne(movieID);
  }

  @Post()
  addOne(@Body() movieData: CreateMovieDto) {
    return this.moviesService.addOne(movieData);
  }

  @Delete(':id')
  removeOne(@Param('id') movieID: number) {
    this.moviesService.removeOne(movieID);
  }

  @Patch(':id')
  updateMovieInfo(
    @Param('id') movieID: number,
    @Body() updateMovieData: UpdateMovieDto,
  ) {
    return this.moviesService.updateOne(movieID, updateMovieData);
  }
}
