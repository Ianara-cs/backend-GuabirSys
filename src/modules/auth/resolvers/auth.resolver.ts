import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from '../services/auth.service'
import { SignupInput } from '../inputs/signup.input'
import { SigninInput } from '../inputs/signin.input'
import { SigninOutput } from '../outputs/signin.output'
import { SignupOutput } from '../outputs/signup.output'
import { RefreshTokenOutput } from '../outputs/refresh-token.output'
import { User } from 'src/modules/users/entities/user.entity'
import { CurrentUser } from '../decorators/current-user.decorator'
import { UsersService } from 'src/modules/users/services/users.service'
import { UserResultDto } from 'src/modules/users/dtos/user-result.dto'
import { Public } from 'src/global/decorators/public.decorator'

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Mutation(() => SignupOutput)
  async signUp(@Args('signupData') signupInput: SignupInput) {
    return await this.authService.signUp(signupInput)
  }

  @Public()
  @Mutation(() => SigninOutput)
  async signIn(@Args('signinData') signinInput: SigninInput) {
    return await this.authService.signIn(signinInput)
  }

  @Public()
  @Mutation(() => RefreshTokenOutput)
  async refreshToken(@Args('refreshTokenData') refreshToken: string) {
    const accessToken = await this.authService.refreshToken(refreshToken)
    return {
      accessToken,
    }
  }

  @Query(() => UserResultDto)
  async whoAmI(@CurrentUser() user: User): Promise<UserResultDto> {
    const result = await this.usersService.getUserById(user.id)
    return result
  }
}
