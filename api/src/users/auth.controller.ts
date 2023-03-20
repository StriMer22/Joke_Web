import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUserId } from './decorators/current-user.decorator';
import { CreateUserDto, LoginDto, UserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('current-user')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  async currentUser(@CurrentUserId() userId: string) {
    return await this.usersService.findOne(userId);
  }

  @Get('signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('signup')
  async createUser(@Body() userData: CreateUserDto) {
    return this.authService.signup(userData);
  }

  @Post('signin')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  verify() {
    return { status: 'OK' };
  }
}
