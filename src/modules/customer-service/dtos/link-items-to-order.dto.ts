import { Prisma } from '@prisma/client'

export class LinkItemsToOrderDto {
  prisma?: Prisma.TransactionClient
  userId: string
  orderId: string
}
