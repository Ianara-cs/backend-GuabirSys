import { Field, InputType, Int } from '@nestjs/graphql'
import { TableStatus } from '../entities/table.entity'
import { IsEnum, IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateTableInput {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  number: number

  @Field({ nullable: true })
  @IsString()
  nameClient: string

  @Field(() => Int, { nullable: true })
  @IsNumber()
  totalPeople: number

  @Field()
  @IsEnum({ RESERVED: 'RESERVED', BUSY: 'BUSY', CLOSED: 'CLOSED' })
  tableStatus: TableStatus
}
