import { Decimal } from '@prisma/client/runtime/library'

export class UpdatePriceOrderDto {
  orderId: string
  total: Decimal
}
