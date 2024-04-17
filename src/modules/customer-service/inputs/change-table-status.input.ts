import { Field, InputType } from '@nestjs/graphql'
import { TableStatus } from '@prisma/client'
import { IsEnum } from 'class-validator'

@InputType()
export class ChangeTableStatusInput {
  @Field()
  id: string

  @Field()
  @IsEnum({ RESERVED: 'RESERVED', BUSY: 'BUSY', CLOSED: 'CLOSED' })
  tableStatus: TableStatus
}
