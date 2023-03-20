import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateJokeDto {
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  @ApiProperty()
  content: string;

  @IsUUID()
  @ApiProperty()
  categoryId: string;
}
