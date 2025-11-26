import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ExpenseCategoriesEntity {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  description: string

  @Field(() => Date)
  createdAt: Date
}
