import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../../dtos/create-user.dto'
import { User } from '../../entities/user.entity'
import { UsersRepository } from '../interfaces/users.repository'
import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class UsersPersistence implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser({
    name,
    password,
    role,
    username,
  }: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        data: { name, password, role, username },
      })

      return newUser
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async findUserByUsername(username: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
      })

      return user
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async findUserByUserId(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      })

      return user
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }
}
