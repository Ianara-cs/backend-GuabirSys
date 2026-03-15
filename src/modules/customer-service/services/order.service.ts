import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { OrderRepository } from '../repositories/interfaces/order.repository'
import { Order } from '../entities/order.entity'
import { MenuService } from 'src/modules/menus/services/menu.service'
import { OrderOutput } from '../outputs/order.output'
import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { TableService } from './table.service'

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private orderRepository: OrderRepository,
    private itemService: MenuService,
    private tableService: TableService,
    private prisma: PrismaService,
  ) {}

  async createOrder(userId: string, tableId: string): Promise<Order> {
    const table = await this.tableService.getTableById(tableId)

    if (table.tableStatus == 'CLOSED') {
      throw new BadRequestException('The table has already been closed')
    }

    return this.prisma.$transaction(async (tx) => {
      const order = await this.orderRepository.create(tx, table.id)

      const result = await this.orderRepository.linkItemsToOrder({
        prisma: tx,
        userId,
        orderId: order.id,
      })

      if (result.count === 0) {
        throw new BadRequestException('No items to create an order')
      }

      const total = await this.orderRepository.calculateTotal(order.id, tx)

      await this.orderRepository.updateOrderPrice(
        { orderId: order.id, total },
        tx,
      )

      return order
    })
  }

  async getOrderById(id: string): Promise<OrderOutput> {
    const order = await this.orderRepository.findOrderById(id)

    if (!order) {
      throw new NotFoundException('Order not found!')
    }

    return order
  }

  // async updateOrderPrice(id: string): Promise<Order> {
  //   const order = await this.getOrderById(id)
  //   let price = 0
  //   for (let i = 0; i < order.items.length; i++) {
  //     const item = await this.itemService.getItemById(order.items[i].itemId)

  //     const quantity = Number(order.items[i].quantity)
  //     const p = Number(item.price)

  //     price += p * quantity
  //   }

  //   const updatedOrder = await this.orderRepository.updateOrderPrice(id, price)
  //   return updatedOrder
  // }
}
