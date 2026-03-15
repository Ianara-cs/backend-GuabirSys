import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { OrderService } from '../services/order.service'
import { Order } from '../entities/order.entity'
import { OrderOutput } from '../outputs/order.output'
import { PubSub } from 'graphql-subscriptions'
import { User } from 'src/modules/users/entities/user.entity'
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator'
import { CreateOrderInput } from '../inputs/create-order.input'

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
    @CurrentUser() user: User,
    @Args('createOrderData') { tableId }: CreateOrderInput,
  ) {
    const newOrder = await this.orderService.createOrder(user.id, tableId)
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
