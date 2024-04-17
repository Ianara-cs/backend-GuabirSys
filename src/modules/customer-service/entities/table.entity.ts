import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'

@ObjectType()
export class Table {
  @Field()
  id: string

  @Field(() => Int, { nullable: true })
  number: number

  @Field({ nullable: true })
  nameClient: string

  @Field(() => Int, { nullable: true })
  totalPeople: number

  @Field(() => TableStatus)
  tableStatus: TableStatus

  @Field(() => Date)
  createdAt: Date
}

const TableStatus: {
  RESERVED: 'RESERVED'
  BUSY: 'BUSY'
  CLOSED: 'CLOSED'
} = {
  RESERVED: 'RESERVED',
  BUSY: 'BUSY',
  CLOSED: 'CLOSED',
}

export type TableStatus = (typeof TableStatus)[keyof typeof TableStatus]

registerEnumType(TableStatus, {
  name: 'TableStatus',
})
