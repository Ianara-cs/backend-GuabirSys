import { Decimal } from '@prisma/client/runtime/library'

export class ItemsOnOrdersResponse {
  id: string
  orderId?: string
  itemId?: string
  quantity: number
  name: string
  price: Decimal
  imgUrl?: string
}
