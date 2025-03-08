import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { IsNumber } from 'class-validator'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Menu } from './menu.entity'

@ObjectType()
export class Item {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  description?: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  price: Decimal

  @Field()
  menuId: string

  @Field(() => Menu, { nullable: true })
  Menu?: Menu

  @Field(() => Int, { nullable: true })
  @IsNumber()
  quantityPeople: number

  @Field({ nullable: true })
  imgUrl?: string
}
