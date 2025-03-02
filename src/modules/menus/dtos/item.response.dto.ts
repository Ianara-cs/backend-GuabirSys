import { Decimal } from '@prisma/client/runtime/library'
import { Menu } from '../entities/menu.entity'

export class ItemResponseDto {
  id: string
  name: string
  description?: string
  price: Decimal
  quantityPeople: number
  imgUrl?: string
  menu?: Menu
}
