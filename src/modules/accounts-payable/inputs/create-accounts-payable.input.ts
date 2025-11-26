import { Field, InputType } from '@nestjs/graphql'
import { Status } from '../entities/accounts-payable.entity'
import { IsEnum, IsObject, IsString } from 'class-validator'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { Transform, Type } from 'class-transformer'

@InputType()
export class CreateAccountsPayableInput {
  @Field({ nullable: true })
  description?: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  @IsObject()
  totalValue: string

  @Field({ nullable: true })
  observation?: string

  @Field({ nullable: true })
  issueDate: Date

  @Field({ nullable: true })
  dueDate: Date

  @Field()
  @IsEnum({ PENDING: 'PENDING', PAID: 'PAID', LATE: 'LATE' })
  status: Status

  @Field()
  @IsString()
  categoryId: string
}
