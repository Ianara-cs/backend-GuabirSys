import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Decimal } from '@prisma/client/runtime/library'
import { Transform, Type } from 'class-transformer'
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal'
import { ExpenseCategoriesEntity } from './expense-categories.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { VendorEntity } from './vendor.entity'

@ObjectType()
export class AccountsPayableEntity {
  @Field()
  id: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  observation: string

  @Field(() => GraphQLDecimal)
  @Type(() => Object)
  @Transform(transformToDecimal)
  totalValue: Decimal

  @Field(() => Status)
  status: Status

  @Field(() => Date, { nullable: true })
  issueDate: Date

  @Field(() => Date, { nullable: true })
  dueDate: Date

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => User, { nullable: true })
  user: User

  @Field({ nullable: true })
  userCreated: string

  @Field(() => VendorEntity, { nullable: true })
  vendor: VendorEntity

  @Field({ nullable: true })
  vendorId: string

  @Field(() => ExpenseCategoriesEntity, { nullable: true })
  categoryId: ExpenseCategoriesEntity
}

export const Status: {
  PENDING: 'PENDING'
  PAID: 'PAID'
  LATE: 'LATE'
} = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  LATE: 'LATE',
}

export type Status = (typeof Status)[keyof typeof Status]

registerEnumType(Status, {
  name: 'Status',
})
