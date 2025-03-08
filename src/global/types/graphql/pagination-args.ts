import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 15 })
  take: number

  @Field(() => Int, { defaultValue: 1 })
  page: number
}
