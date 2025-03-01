import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { OrderRepository } from '../repositories/interfaces/order.repository'
import { Order } from '../entities/order.entity'
import { MenuService } from 'src/modules/menus/services/menu.service'
import { CreateOrderInput } from '../inputs/create-order.input'
import { OrderOutput } from '../outputs/order.output'

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private orderRepository: OrderRepository,
    private itemService: MenuService,
  ) {}

  async createOrder(createOrderData: CreateOrderInput): Promise<Order> {
    for (let i = 0; i < createOrderData.order.length; i++) {
      await this.itemService.getItemById(createOrderData.order[i].itemId)
    }

    const newOrder = await this.orderRepository.createOrder(
      createOrderData.order,
    )

    const order = await this.updateOrderPrice(newOrder.id)

    return order
  }

  async getOrderById(id: string): Promise<OrderOutput> {
    const order = await this.orderRepository.findOrderById(id)

    if (!order) {
      throw new NotFoundException('Order not found!')
    }

    return order
  }

  async updateOrderPrice(id: string): Promise<Order> {
    const order = await this.getOrderById(id)
    let price = 0
    for (let i = 0; i < order.items.length; i++) {
      const item = await this.itemService.getItemById(order.items[i].itemId)

      const quantity = Number(order.items[i].quantity)
      const p = Number(item.price)

      price += p * quantity
    }

    const updatedOrder = await this.orderRepository.updateOrderPrice(id, price)
    return updatedOrder
  }
}
