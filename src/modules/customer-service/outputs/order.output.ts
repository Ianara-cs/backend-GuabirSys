import { Field, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { ItemsOnOrders } from '../entities/order.entity'

@ObjectType()
export class OrderOutput {
  @Field()
  id: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price: Decimal

  @Field(() => Date)
  createdAt: Date

  @Field(() => [ItemsOnOrders])
  items?: ItemsOnOrders[]
}
