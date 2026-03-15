import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { OrderRepository } from '../interfaces/order.repository'
import { Injectable } from '@nestjs/common'
import { Decimal } from '@prisma/client/runtime/library'
import { OrderOutput } from '../../outputs/order.output'
import { Order } from '../../entities/order.entity'
import { BatchPayloadDto } from '../../dtos/batch-payload.dto'
import { LinkItemsToOrderDto } from '../../dtos/link-items-to-order.dto'
import { Prisma } from '@prisma/client'
import { UpdatePriceOrderDto } from '../../dtos/update-price-order.dto'

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

  async calculateTotal(
    orderId: string,
    connection?: Prisma.TransactionClient,
  ): Promise<Decimal> {
    const prisma = connection ? connection : this.prisma
    const items = await prisma.itemsOnOrders.findMany({
      where: { orderId },
      include: { item: true },
    })

    const result = items.reduce((acc, item) => {
      return acc + item.quantity * Number(item.item.price)
    }, 0)

    return new Decimal(result)
  }

  async updateOrderPrice(
    { orderId, total }: UpdatePriceOrderDto,
    connection?: Prisma.TransactionClient,
  ): Promise<Order> {
    const prisma = connection ? connection : this.prisma
    return prisma.order.update({
      where: { id: orderId },
      data: { price: total },
    })
  }
}
