import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateOrderInput {
  @Field({ nullable: true })
  tableId?: string
}
