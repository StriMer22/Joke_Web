import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async findOne(id: string) {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  findAll() {
    return this.repo.find();
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const { name } = dto;
    const category = await this.repo.create({
      name,
      code: name.replace(' ', '_').toUpperCase(),
    });
    return this.repo.save(category);
  }
}
