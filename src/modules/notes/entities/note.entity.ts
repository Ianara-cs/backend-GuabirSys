import { Field, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { ItemsOnOrders } from 'src/modules/customer-service/entities/order.entity'

@ObjectType()
export class Note {
  @Field()
  id: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  total: Decimal

  @Field(() => [ItemsOnOrders])
  items?: ItemsOnOrders[]
}
