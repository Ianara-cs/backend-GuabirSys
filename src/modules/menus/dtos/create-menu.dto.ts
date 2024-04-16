import { Category } from '../entities/menu.entity'

export class CreateMenuDto {
  name: string
  category: Category
}
