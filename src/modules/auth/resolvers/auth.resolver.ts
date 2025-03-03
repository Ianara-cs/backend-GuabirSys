import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from 'src/modules/users/entities/user.entity'
import { AuthService } from '../services/auth.service'
import { SignupInput } from '../inputs/signup.input'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signUp(@Args('signupData') signupInput: SignupInput) {
    const newItem = await this.authService.signUp(signupInput)
    return newItem
  }
}
