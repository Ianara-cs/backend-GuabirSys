import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UsersService } from '../services/users.service'
import { CreateUserInput } from '../inputs/create-user.input'
import { CreateUserOutput } from '../outputs/create-user.output'
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator'
import { User } from '../entities/user.entity'
import { Roles } from 'src/modules/auth/decorators/role.decorator'
import { Role } from 'src/global/enums/roles.enum'
import { UserResultDto } from '../dtos/user-result.dto'
import { UpdateUserInput } from '../inputs/update-user.input'
import { DisableUserInput } from '../inputs/disable-user.input'
import { BadRequestException } from '@nestjs/common'

@Resolver()
@Roles(Role.manager)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserResultDto])
  async users() {
    return await this.usersService.getAllUser()
  }

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

  @Mutation(() => UserResultDto)
  async updateUser(
    @CurrentUser() currentUser: User,
    @Args('updateUserData') updateUserInput: UpdateUserInput,
  ) {
    const user = await this.usersService.updateUser({
      username_updated: currentUser.username,
      ...updateUserInput,
    })
    return user
  }

  @Mutation(() => UserResultDto)
  async deleteUser(@CurrentUser() currentUser: User, @Args('id') id: string) {
    if (currentUser.id == id) {
      throw new BadRequestException('Operation cannot be performed!')
    }
    const user = await this.usersService.delete(id)
    return user
  }

  @Mutation(() => UserResultDto)
  async disableUser(
    @CurrentUser() currentUser: User,
    @Args('disableUserData') disableUserInput: DisableUserInput,
  ) {
    if (currentUser.id == disableUserInput.id) {
      throw new BadRequestException('Operation cannot be performed!')
    }

    const user = await this.usersService.disableUser(
      disableUserInput.id,
      disableUserInput.active,
    )
    return user
  }
}
