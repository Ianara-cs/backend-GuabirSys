import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { REPOSITORY } from 'src/global/utils/constants/repository'
import { UsersRepository } from '../repositories/interfaces/users.repository'
import { UserResultDto } from '../dtos/user-result.dto'

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
}
