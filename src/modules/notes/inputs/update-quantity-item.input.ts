import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class UpdateQuantityItemInput {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @Field()
  @IsNotEmpty()
  @IsString()
  itemOnOrderId: string
}
