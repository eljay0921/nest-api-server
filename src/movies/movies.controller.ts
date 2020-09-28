import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies.';
  }

  @Get('/:id')
  getOne(@Param('id') movieID: number) {
    return `This will return one movie(${movieID})`;
  }

  @Post()
  addOne() {
    return `This will add a movie`;
  }

  @Delete('/:id')
  removeOne(@Param('id') movieID: number) {
    return `This will delete a movie(${movieID})`;
  }

  @Patch('/:id')
  updateMovieInfo(@Param('id') movieID: number) {
    return `This will update a movie(${movieID})'s some informations`;
  }

  @Put('/:id')
  updateMovie(@Param('id') movieID: number) {
    return `This will update a movie(${movieID})`;
  }
}
