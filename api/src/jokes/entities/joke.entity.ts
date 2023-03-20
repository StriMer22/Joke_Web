import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Joke {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (User) => User.jokes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (Category) => Category.jokes)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
