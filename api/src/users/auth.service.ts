import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(user: CreateUserDto) {
    const usersWithUsername = await this.usersService.findByUsername(
      user.username,
    );
    if (usersWithUsername?.length > 0) {
      throw new BadRequestException('Username already in use');
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    Object.assign(user, { password: hashedPassword });
    return await this.newAccessToken(await this.usersService.create(user));
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const [user] = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!compareSync(password, user.password)) {
      throw new ForbiddenException('Bad login data');
    }

    return this.newAccessToken(user);
  }

  private async newAccessToken(user: User): Promise<{ accessToken: string }> {
    return {
      accessToken: sign(
        {
          userId: user.id,
        },
        'jokesarefun',
        {
          expiresIn: '1h',
        },
      ),
    };
  }
}
