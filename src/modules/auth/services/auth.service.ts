import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { REPOSITORY } from 'src/global/utils/constants/repository'
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto'
import { UsersRepository } from 'src/modules/users/repositories/interfaces/users.repository'
import { Encryptor } from 'src/global/utils/Encryptor'
import { JwtService } from '@nestjs/jwt'
import { SigninInput } from '../inputs/signin.input'
import { SigninOutput } from '../outputs/signin.output'
import { Payload } from '../types/payloadType'
import { SignupOutput } from '../outputs/signup.output'
import { RefreshTokenRepository } from '../repositories/interfaces/refresh-toke.repository'
import { convertToMilliseconds } from 'src/global/utils/functions/convertToMilliseconds'
import { GenerateTokenDto } from '../dtos/generate-token.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(REPOSITORY.USER)
    private usersRepository: UsersRepository,
    @Inject(REPOSITORY.REFRESH_TOKEN)
    private refreshTokenRepository: RefreshTokenRepository,
    private jwtService: JwtService,
  ) {}

  async signUp({
    name,
    password,
    role,
    username,
  }: CreateUserDto): Promise<SignupOutput> {
    const user = await this.usersRepository.findUserByUsername(username)

    if (user) {
      throw new BadRequestException('Username already exists!')
    }

    const hashedPassword = await Encryptor.encrypt(password)

    const newUser = await this.usersRepository.createUser({
      name,
      password: hashedPassword,
      role,
      username,
    })

    const payload = { sub: newUser.id, username: newUser.username }

    const { token: accessToken } = this.generateToken(
      payload,
      process.env.ACCESS_EXPIRES_IN,
    )

    const { token: refreshToken, expiresAt } = this.generateToken(
      payload,
      process.env.REFRESH_EXPIRES_IN,
    )

    await this.refreshTokenRepository.createRefreshToken({
      userId: user.id,
      token: refreshToken,
      expiresAt,
    })

    return {
      user: newUser,
      refreshToken,
      accessToken,
    }
  }

  async signIn({ password, username }: SigninInput): Promise<SigninOutput> {
    const user = await this.usersRepository.findUserByUsername(username)

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    const isUser = await Encryptor.compare(password, user.password)

    if (!isUser) {
      throw new BadRequestException('Username or password incorrect!')
    }

    const payload = { sub: user.id, username: user.username }

    const { token: accessToken } = this.generateToken(
      payload,
      process.env.ACCESS_EXPIRES_IN,
    )

    const { token: refreshToken, expiresAt } = this.generateToken(
      payload,
      process.env.REFRESH_EXPIRES_IN,
    )

    await this.refreshTokenRepository.createRefreshToken({
      userId: user.id,
      token: refreshToken,
      expiresAt,
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
        ignoreExpiration: true,
      })

      const token = await this.refreshTokenRepository.findRefreshToken(
        refreshToken,
        payload.sub,
      )

      if (!token) {
        throw new UnauthorizedException()
      }

      if (token.expiresAt < new Date()) {
        await this.refreshTokenRepository.deleteRefreshToken(token.id)
        throw new UnauthorizedException('Refresh token expired!')
      }

      const { token: accessToken } = this.generateToken(
        {
          sub: payload.sub,
          username: payload.username,
        },
        process.env.ACCESS_EXPIRES_IN,
      )

      return accessToken
    } catch (error) {
      throw new UnauthorizedException(`${error}`)
    }
  }

  async deleteRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    const token = await this.refreshTokenRepository.findRefreshToken(
      refreshToken,
      userId,
    )

    if (!token) {
      throw new BadRequestException('Error logging out!')
    }

    await this.refreshTokenRepository.deleteRefreshToken(token.id)
    return true
  }

  generateToken(payload: Payload, expiresIn: string): GenerateTokenDto {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn,
    })

    const expiresAt = new Date(Date.now() + convertToMilliseconds(expiresIn))

    return {
      token,
      expiresAt,
    }
  }
}
