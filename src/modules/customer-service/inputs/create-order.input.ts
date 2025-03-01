import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateOrderInput {
  @Field(() => [CreateOrder])
  @IsArray()
  order: CreateOrder[]
}

@InputType()
export class CreateOrder {
  @Field()
  @IsString()
  itemId: string

  @Field()
  @IsNumber()
  quantity: number
}
