import { Prisma } from '@prisma/client'
import { BatchPayloadDto } from '../../dtos/batch-payload.dto'
import { Order } from '../../entities/order.entity'
import { OrderOutput } from '../../outputs/order.output'
import { LinkItemsToOrderDto } from '../../dtos/link-items-to-order.dto'

export interface OrderRepository {
  create(prisma: Prisma.TransactionClient, tableId: string): Promise<Order>
  linkItemsToOrder(
    LinkItemsToOrderDto: LinkItemsToOrderDto,
  ): Promise<BatchPayloadDto>
  findOrderById(id: string): Promise<OrderOutput>
  updateOrderPrice(id: string, price: number): Promise<Order>
}
