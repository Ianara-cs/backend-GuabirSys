import { Field, InputType, Int } from '@nestjs/graphql'
import { Transform, Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Decimal } from '@prisma/client/runtime/library'

@InputType()
export class UpdateItemInput {
  @Field()
  @IsNotEmpty()
  id: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal

  @Field()
  @IsNotEmpty()
  @IsString()
  menuId: string

  @Field(() => Int, { nullable: true })
  @IsNumber()
  quantityPeople?: number
}
