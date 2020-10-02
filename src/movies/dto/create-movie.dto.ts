import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly genres: string[];
}
