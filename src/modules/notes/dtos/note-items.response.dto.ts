import { Decimal } from '@prisma/client/runtime/library'
import { ItemsOnOrdersResponse } from './items-on-orders.response'

export class NoteItemsResponseDto {
  id: string
  total: Decimal
  items?: ItemsOnOrdersResponse[]
  userId: string
}
