import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { REPOSITORY } from 'src/global/utils/constants/repository'
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto'
import { UsersRepository } from 'src/modules/users/repositories/interfaces/users.repository'
import { Encryptor } from 'src/global/utils/Encryptor'
import { User } from 'src/modules/users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @Inject(REPOSITORY.USER)
    private usersRepository: UsersRepository,
  ) {}

  async signUp({
    name,
    password,
    role,
    username,
  }: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findUserByUsername(username)

    if (user) {
      throw new BadRequestException('Username already exists!')
    }

    const hashedPassword = await Encryptor.encrypt(password)

    return await this.usersRepository.createUser({
      name,
      password: hashedPassword,
      role,
      username,
    })
  }
}
