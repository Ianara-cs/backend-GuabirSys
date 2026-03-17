import { Field, InputType } from '@nestjs/graphql'
import { TableStatus } from '../entities/table.entity'

@InputType()
export class TableFilterInput {
  @Field({ nullable: true })
  number?: number

  @Field(() => [String], { nullable: true })
  status?: TableStatus[]

  @Field({ nullable: true })
  hasActiveOrder?: boolean
}
