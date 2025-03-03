import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
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

@Injectable()
export class AuthService {
  constructor(
    @Inject(REPOSITORY.USER)
    private usersRepository: UsersRepository,
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

    const accessToken = this.generateToken(
      payload,
      process.env.ACCESS_EXPIRES_IN,
    )

    const refreshToken = this.generateToken(
      payload,
      process.env.REFRESH_EXPIRES_IN,
    )

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

    const accessToken = this.generateToken(
      payload,
      process.env.ACCESS_EXPIRES_IN,
    )

    const refreshToken = this.generateToken(
      payload,
      process.env.REFRESH_EXPIRES_IN,
    )

    return {
      accessToken,
      refreshToken,
    }
  }

  generateToken(payload: Payload, expiresIn: string): string {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn,
    })

    return token
  }
}
