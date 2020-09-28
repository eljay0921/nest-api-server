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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies.';
  }

  @Get('search')
  search(@Query('title') movieTitle: string) {
    return `We are searching for a movie with a ${movieTitle}`;
  }

  @Get(':id')
  getOne(@Param('id') movieID: number) {
    return `This will return one movie(${movieID})`;
  }

  @Post()
  addOne(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  removeOne(@Param('id') movieID: number) {
    return `This will delete a movie(${movieID})`;
  }

  @Patch(':id')
  updateMovieInfo(@Param('id') movieID: number, @Body() updateMovieData) {
    return {
      updatedMovie: movieID,
      ...updateMovieData,
    };
  }
}
