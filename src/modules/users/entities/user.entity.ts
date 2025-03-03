import {
  Field,
  GraphQLISODateTime,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  username: string

  @Field()
  password: string

  @Field(() => Role)
  role: Role

  @Field()
  isActive: boolean

  @Field({ nullable: true })
  username_created?: string

  @Field({ nullable: true })
  username_updated?: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date
}

export const Role: {
  MANAGER: 'MANAGER'
  CHEF: 'CHEF'
  ATTENDANT: 'ATTENDANT'
} = {
  MANAGER: 'MANAGER',
  CHEF: 'CHEF',
  ATTENDANT: 'ATTENDANT',
}

export type Role = (typeof Role)[keyof typeof Role]

registerEnumType(Role, {
  name: 'Role',
})
