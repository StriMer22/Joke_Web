import { Expose, Type } from 'class-transformer';
import { JokeDto } from 'src/jokes/dtos';

export class UserJokesDto {
  @Expose()
  @Type(() => JokeDto)
  jokes: JokeDto;
}
