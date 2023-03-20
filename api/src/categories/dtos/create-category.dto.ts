import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty()
  @MinLength(3)
  name: string;
}
