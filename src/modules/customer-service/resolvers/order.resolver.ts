import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { OrderService } from '../services/order.service'
import { Order } from '../entities/order.entity'
import { CreateOrderInput } from '../inputs/create-order.input'
import { OrderOutput } from '../outputs/order.output'
import { PubSub } from 'graphql-subscriptions'

// const pubSub = new PubSub()

@Resolver()
export class OrderResolver {
  private pubSub: PubSub
  constructor(private orderService: OrderService) {
    this.pubSub = new PubSub()
  }

  @Query(() => OrderOutput)
  async order(@Args('id') id: string) {
    return await this.orderService.getOrderById(id)
  }

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderData') createOrderInput: CreateOrderInput,
  ) {
    const newOrder = await this.orderService.createOrder(createOrderInput)
    await this.pubSub.publish('orderAdded', { orderAdded: newOrder })
    return newOrder
  }

  @Subscription(() => Order, {
    resolve: (value) => value,
  })
  orderAdded() {
    return this.pubSub.asyncIterator('orderAdded')
  }
}
