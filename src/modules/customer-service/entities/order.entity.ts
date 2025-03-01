import { Field, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Item } from 'src/modules/menus/entities/item.entity'

@ObjectType()
export class Order {
  @Field()
  id: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price: Decimal

  @Field(() => Date)
  createdAt: Date

  /*@Field(() => [ItemsOnOrders])
  items: ItemsOnOrders[]*/
}

@ObjectType()
export class ItemsOnOrders {
  @Field()
  id?: string

  @Field()
  orderId?: string

  @Field()
  itemId: string

  @Field(() => Item)
  item?: Item

  @Field()
  quantity: number
}
