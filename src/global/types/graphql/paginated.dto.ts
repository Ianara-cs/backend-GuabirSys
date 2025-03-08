import { Type } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'

export function Paginated<T>(classRef: Type<T>) {
  const typeName = `Paginated${(classRef as any).name}`
  @ObjectType(typeName, { isAbstract: true })
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
