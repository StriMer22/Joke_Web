import { Expose, Type } from 'class-transformer';
import { JokeDto } from './joke.dto';

export class JokesDto {
  @Expose()
  @Type(() => JokeDto)
  jokes: JokeDto;
}
