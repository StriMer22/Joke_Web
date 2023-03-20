import { Joke } from 'src/jokes/entities/joke.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Joke, (joke: Joke) => joke.user)
  jokes: Joke[];
}
