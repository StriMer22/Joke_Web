import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { Joke } from './entities/joke.entity';
import { JokesController } from './jokes.controller';
import { JokesService } from './jokes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Joke, User]), UsersModule],
  controllers: [JokesController],
  providers: [JokesService, UsersService],
})
export class JokesModule {}
