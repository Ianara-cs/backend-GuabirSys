import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { OrderRepository } from '../interfaces/order.repository'
import { Injectable } from '@nestjs/common'
import { Decimal } from '@prisma/client/runtime/library'
import { OrderOutput } from '../../outputs/order.output'
import { Order } from '../../entities/order.entity'
import { BatchPayloadDto } from '../../dtos/batch-payload.dto'
import { LinkItemsToOrderDto } from '../../dtos/link-items-to-order.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class OrderPersistence implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    prisma: Prisma.TransactionClient,
    tableId: string,
  ): Promise<Order> {
    const newOrder = await prisma.order.create({
      data: { tableId },
    })
    return newOrder
  }

  async linkItemsToOrder({
    prisma,
    orderId,
    userId,
  }: LinkItemsToOrderDto): Promise<BatchPayloadDto> {
    return prisma.itemsOnOrders.updateMany({
      where: {
        note: { userId },
        orderId: null,
      },
      data: {
        orderId,
      },
    })
  }

  async findOrderById(id: string): Promise<OrderOutput> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { item: true } } },
    })
    console.log(order)
    return order
  }

  async updateOrderPrice(id: string, price: number): Promise<Order> {
    const decimalPrice = new Decimal(price)
    const order = await this.prisma.order.update({
      where: { id },
      data: { price: decimalPrice },
    })

    return order
  }
}
