import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { CreateCategoryDto } from '../../dtos/category/create-category.dto'
import { ExpenseCategoriesEntity } from '../../entities/expense-categories.entity'
import { ExpenseCategoryRepository } from '../interfaces/expense-categories.repository'
import { Injectable } from '@nestjs/common'
import { UpdateCategoryDto } from '../../dtos/category/update-category.dto'

@Injectable()
export class ExpenseCategoryPersistence implements ExpenseCategoryRepository {
  constructor(private prisma: PrismaService) {}
  async createCategory({
    name,
    description,
  }: CreateCategoryDto): Promise<ExpenseCategoriesEntity> {
    const newCategory = await this.prisma.expenseCategories.create({
      data: { name, description },
    })

    return newCategory
  }

  async findAllCategories(): Promise<ExpenseCategoriesEntity[]> {
    const categories = await this.prisma.expenseCategories.findMany()
    return categories
  }

  async findCategoryById(id: string): Promise<ExpenseCategoriesEntity> {
    const category = await this.prisma.expenseCategories.findUnique({
      where: { id },
    })
    return category
  }

  async updateName({
    id,
    name,
    description,
  }: UpdateCategoryDto): Promise<ExpenseCategoriesEntity> {
    const category = await this.prisma.expenseCategories.update({
      where: { id },
      data: { name, description },
    })

    return category
  }
}
