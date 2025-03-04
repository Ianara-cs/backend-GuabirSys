import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { REPOSITORY } from 'src/global/utils/constants/repository'
import { UsersRepository } from 'src/modules/users/repositories/interfaces/users.repository'
import { Payload } from '../types/payloadType'
import { SignupUserDTO } from '../dtos/signup-user.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(REPOSITORY.USER)
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate({ username }: Payload): Promise<SignupUserDTO> {
    const user = await this.usersRepository.findUserByUsername(username)

    if (!user) {
      throw new UnauthorizedException('User nor found!')
    }

    return user
  }
}
