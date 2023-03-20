import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JokesDto } from 'src/jokes/dtos';

import { JwtAuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUserId } from './decorators/current-user.decorator';
import { UsersService } from './users.service';

@Controller('user-jokes')
@ApiTags('user-jokes')
@UseGuards(JwtAuthGuard)
export class UserJokesController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @Serialize(JokesDto)
  async getCurrentUsersJokes(@CurrentUserId() userId: string) {
    return { jokes: await this.usersService.getUserJokes(userId) };
  }
}
