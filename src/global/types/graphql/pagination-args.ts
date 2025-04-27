import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class PaginationArgs {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  isPaginated?: boolean

  @Field(() => Int, { defaultValue: 15, nullable: true })
  take?: number

  @Field(() => Int, { defaultValue: 1, nullable: true })
  page?: number
}
