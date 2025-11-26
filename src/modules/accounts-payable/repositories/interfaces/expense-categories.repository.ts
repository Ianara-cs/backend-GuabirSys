import { CreateCategoryDto } from '../../dtos/category/create-category.dto'
import { UpdateCategoryDto } from '../../dtos/category/update-category.dto'
import { ExpenseCategoriesEntity } from '../../entities/expense-categories.entity'

export interface ExpenseCategoryRepository {
  createCategory(
    createCategoryData: CreateCategoryDto,
  ): Promise<ExpenseCategoriesEntity>
  findAllCategories(): Promise<ExpenseCategoriesEntity[]>
  findCategoryById(id: string): Promise<ExpenseCategoriesEntity>
  updateName(
    updateCategory: UpdateCategoryDto,
  ): Promise<ExpenseCategoriesEntity>
}
