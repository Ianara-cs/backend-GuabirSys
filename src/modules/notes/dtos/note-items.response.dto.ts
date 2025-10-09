import { Decimal } from '@prisma/client/runtime/library'
import { ItemsOnOrders } from 'src/modules/customer-service/entities/order.entity'

export class NoteItemsResponseDto {
  id: string
  total: Decimal
  items?: ItemsOnOrders[]
  userId: string
}
