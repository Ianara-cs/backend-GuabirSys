import { Type } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'

export function Paginated<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    result: T[]

    @Field(() => Int)
    total: number

    @Field()
    hasNextPage: boolean
  }

  return PaginatedType
}
