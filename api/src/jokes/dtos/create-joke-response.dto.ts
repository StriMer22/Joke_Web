import { Expose, Type } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entity';
import { UserDto } from 'src/users/dtos';
import { User } from 'src/users/entities/user.entity';

export class CreateJokeResponseDto {
  @Expose()
  id: string;

  @Expose()
  categoryId: string;

  @Expose()
  userId: string;

  @Expose()
  content: string;

  @Expose()
  @Type(() => UserDto)
  user: User;

  @Expose()
  category: Category;
}
