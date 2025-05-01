import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UsersService } from '../services/users.service'
import { CreateUserInput } from '../inputs/create-user.input'
import { CreateUserOutput } from '../outputs/create-user.output'
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator'
import { User } from '../entities/user.entity'
import { Roles } from 'src/modules/auth/decorators/role.decorator'
import { Role } from 'src/global/enums/roles.enum'

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Roles(Role.manager)
  @Mutation(() => CreateUserOutput)
  async createUser(
    @CurrentUser() user: User,
    @Args('createUserData') createUserInput: CreateUserInput,
  ) {
    return await this.usersService.createUser({
      username_created: user.username,
      ...createUserInput,
    })
  }
}
