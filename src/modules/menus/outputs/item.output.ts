import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Menu } from '../entities/menu.entity'
import { IsNumber } from 'class-validator'

@ObjectType()
export class ItemOutput {
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

  @Field(() => Int, { nullable: true })
  @IsNumber()
  quantityPeople: number

  @Field({ nullable: true })
  imgUrl?: string

  @Field(() => Menu)
  menu: Menu
}
