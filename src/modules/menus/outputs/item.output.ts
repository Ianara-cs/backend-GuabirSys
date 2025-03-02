import { Field, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Menu } from '../entities/menu.entity'

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

  @Field()
  quantityPeople: number

  @Field({ nullable: true })
  imgUrl?: string

  @Field(() => Menu)
  menu: Menu
}
