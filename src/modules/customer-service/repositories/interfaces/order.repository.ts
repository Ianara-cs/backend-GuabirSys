import { Order } from '../../entities/order.entity'
import { CreateOrderDto } from '../../dtos/create-order.dto'
import { OrderOutput } from '../../outputs/order.output'

export interface OrderRepository {
  createOrder(createOrderData: CreateOrderDto[]): Promise<Order>
  findOrderById(id: string): Promise<OrderOutput>
  updateOrderPrice(id: string, price: number): Promise<Order>
}
