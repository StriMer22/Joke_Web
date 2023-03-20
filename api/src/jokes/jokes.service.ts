import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateJokeDto } from './dtos';
import { Joke } from './entities/joke.entity';

@Injectable()
export class JokesService {
  constructor(
    @InjectRepository(Joke) private repo: Repository<Joke>,
    private usersService: UsersService,
  ) {}

  findOne(id: string): Promise<Joke> {
    return this.repo.findOne({ where: { id } });
  }

  findAll(): Promise<Joke[]> {
    return this.repo.find({ relations: { category: true } });
  }

  async create(dto: CreateJokeDto, userId: string): Promise<Joke> {
    const user = await this.usersService.findOne(userId);
    const joke = await this.repo.create({ ...dto, user });
    return this.repo.save(joke);
  }

  async remove(id: string): Promise<void> {
    const joke = await this.findOne(id);
    await this.repo.remove(joke);
  }

  async update(id: string, dto: Partial<CreateJokeDto>): Promise<Joke> {
    const joke = await this.findOne(id);
    Object.assign(joke, dto);
    return this.repo.save(joke);
  }
}
