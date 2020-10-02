import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsArray()
  @IsString({ each: true })
  readonly genres: string[];
}
