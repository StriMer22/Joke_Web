import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUserId } from 'src/users/decorators/current-user.decorator';
import {
  CreateJokeDto,
  CreateJokeResponseDto,
  JokeDto,
  JokesDto,
} from './dtos';
import { JokesService } from './jokes.service';

@Controller('jokes')
@ApiTags('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Post('')
  @Serialize(CreateJokeResponseDto)
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateJokeDto, @CurrentUserId() userId: string) {
    return await this.jokesService.create(dto, userId);
  }

  @Get('')
  @Serialize(JokesDto)
  async findAll() {
    return { jokes: await this.jokesService.findAll() };
  }

  @Get(':id')
  @Serialize(JokeDto)
  findOne(@Param('id') id: string) {
    return this.jokesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() dto: Partial<CreateJokeDto>) {
    return await this.jokesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.jokesService.remove(id);
  }
}
