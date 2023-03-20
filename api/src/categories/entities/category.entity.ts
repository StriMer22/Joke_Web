import { Joke } from 'src/jokes/entities/joke.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Joke, (joke: Joke) => joke.category)
  jokes: Joke[];
}
