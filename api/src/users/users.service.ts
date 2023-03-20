import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findOne(id: string): Promise<User> {
    return this.repo.findOne({ where: { id } });
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  findByUsername(username: string): Promise<User[]> {
    return this.repo.find({ where: { username } });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.repo.create(dto);
    return this.repo.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(await this.findOne(id));
  }

  async getUserJokes(id: string) {
    return (
      await this.repo.findOne({
        where: { id },
        relations: { jokes: { category: true } },
      })
    ).jokes;
  }
}
