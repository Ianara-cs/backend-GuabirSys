import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class VendorEntity {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  telephone: string

  @Field(() => Date)
  createdAt: Date
}
