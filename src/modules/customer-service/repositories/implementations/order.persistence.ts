import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { ItemsOnOrders, Order } from '../../entities/order.entity'
import { OrderRepository } from '../interfaces/order.repository'
import { CreateOrderDto } from '../../dtos/create-order.dto'
import { Injectable } from '@nestjs/common'
import { Decimal } from '@prisma/client/runtime/library'
import { OrderOutput } from '../../outputs/order.output'
import { Prisma } from '@prisma/client'

@Injectable()
export class OrderPersistence implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async createOrder(createOrderData: CreateOrderDto[]): Promise<Order> {
    let newOrder: Order
    try {
      newOrder = await this.prisma.order.create({
        data: {},
      })

      const itemsToCreate: ItemsOnOrders[] = createOrderData.map(
        (orderItem) => ({
          quantity: orderItem.quantity,
          orderId: newOrder.id,
          itemId: orderItem.itemId,
        }),
      )

      await this.prisma.itemsOnOrders.createMany({ data: itemsToCreate })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }

    return newOrder
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
