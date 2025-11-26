import { Field, ObjectType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Status } from '../entities/accounts-payable.entity'

@ObjectType()
export class AccountPayableResponseOutput {
  @Field()
  id: string

  @Field()
  description: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  totalValue: Decimal

  @Field()
  observation: string

  @Field(() => Date)
  issueDate: Date

  @Field(() => Date)
  dueDate: Date

  @Field(() => Status)
  status: Status
}
