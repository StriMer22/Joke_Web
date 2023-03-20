import { Expose, Type } from 'class-transformer';
import { CategoryDto } from 'src/categories/dtos/category.dto';
import { Category } from 'src/categories/entities/category.entity';

export class JokeDto {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  @Type(() => CategoryDto)
  category: Category;
}
