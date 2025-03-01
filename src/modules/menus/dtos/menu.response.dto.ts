import { Item } from '@prisma/client'
import { Category } from '../entities/menu.entity'

export class MenuResponseDto {
  id: string
  name: string
  category: Category
  items?: Item[]
}
