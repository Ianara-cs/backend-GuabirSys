import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from '../services/auth.service'
import { SignupInput } from '../inputs/signup.input'
import { SigninInput } from '../inputs/signin.input'
import { SigninOutput } from '../outputs/signin.output'
import { SignupOutput } from '../outputs/signup.output'
import { RefreshTokenOutput } from '../outputs/refresh-token.output'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignupOutput)
  async signUp(@Args('signupData') signupInput: SignupInput) {
    return await this.authService.signUp(signupInput)
  }

  @Mutation(() => SigninOutput)
  async signIn(@Args('signinData') signinInput: SigninInput) {
    return await this.authService.signIn(signinInput)
  }

  @Mutation(() => RefreshTokenOutput)
  async refreshToken(@Args('refreshTokenData') refreshToken: string) {
    const accessToken = await this.authService.refreshToken(refreshToken)
    return {
      accessToken,
    }
  }
}
