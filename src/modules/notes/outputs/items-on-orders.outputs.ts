import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { IsNumber } from 'class-validator'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'

@ObjectType()
export class ItemsOnOrdersOutputs {
  @Field()
  id?: string

  @Field({ nullable: true })
  orderId?: string

  @Field()
  itemId: string

  @Field(() => Int, { nullable: true })
  @IsNumber()
  quantity: number

  @Field()
  name: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price: Decimal

  @Field({ nullable: true })
  imgUrl?: string
}
