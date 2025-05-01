import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { REPOSITORY } from 'src/global/utils/constants/repository'
import { UsersRepository } from '../repositories/interfaces/users.repository'
import { UserResultDto } from '../dtos/user-result.dto'
import { Encryptor } from 'src/global/utils/Encryptor'
import { CreateUserDto } from '../dtos/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @Inject(REPOSITORY.USER)
    private usersRepository: UsersRepository,
  ) {}

  async getUserById(id: string): Promise<UserResultDto> {
    const user = await this.usersRepository.findUserByUserId(id)

    if (!user) {
      throw new NotFoundException('User not found!')
    }

    return {
      ...user,
    }
  }

  async createUser({
    name,
    password,
    role,
    username,
    username_created,
  }: CreateUserDto): Promise<UserResultDto> {
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
      username_created,
    })

    return newUser
  }
}
