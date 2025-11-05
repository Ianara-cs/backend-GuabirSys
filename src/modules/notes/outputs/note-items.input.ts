import { Field, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { ItemsOnOrdersOutputs } from './items-on-orders.outputs'

@ObjectType()
export class NoteItemsOutputs {
  @Field()
  id: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  total: Decimal

  @Field(() => [ItemsOnOrdersOutputs], { nullable: true })
  items?: ItemsOnOrdersOutputs[]
}
