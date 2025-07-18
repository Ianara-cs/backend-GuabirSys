import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../../dtos/create-user.dto'
import { User } from '../../entities/user.entity'
import { UsersRepository } from '../interfaces/users.repository'
import { PrismaService } from 'src/global/prisma-service/prisma-service.service'

@Injectable()
export class UsersPersistence implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser({
    name,
    password,
    role,
    username,
  }: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: { name, password, role, username },
    })

    return newUser
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    })

    return user
  }

  async findUserByUserId(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    return user
  }
}
