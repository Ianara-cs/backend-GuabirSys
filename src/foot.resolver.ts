import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class FootResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!'
  }
}
