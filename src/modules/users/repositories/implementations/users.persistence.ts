import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../../dtos/create-user.dto'
import { User } from '../../entities/user.entity'
import { UsersRepository } from '../interfaces/users.repository'
import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { UpdateUserDto } from '../../dtos/update-user.dto'

@Injectable()
export class UsersPersistence implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser({
    name,
    password,
    role,
    username,
    username_created,
  }: CreateUserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: { name, password, role, username, username_created },
    })

    return newUser
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    return users
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

  async deleteUser(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    })

    return user
  }

  async disableUser(id: string, active: boolean): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { isActive: active },
    })

    return user
  }

  async updateUser({ id, ...updateUser }: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUser,
    })

    return user
  }
}
