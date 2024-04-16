import { Field, InputType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { IsNotEmpty, IsObject, IsString } from 'class-validator'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'

@InputType()
export class CreateItemInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsString()
  description: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  @IsObject()
  price: Decimal

  @Field()
  @IsNotEmpty()
  @IsString()
  menuId: string
}
