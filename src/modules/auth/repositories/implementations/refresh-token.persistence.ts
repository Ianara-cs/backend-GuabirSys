import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { SaveRefreshTokenDto } from '../../dtos/save-refresh-token.dto'
import { RefreshToken } from '../../entities/refresh-token.entity'
import { RefreshTokenRepository } from '../interfaces/refresh-toke.repository'
import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RefreshTokenPersistence implements RefreshTokenRepository {
  constructor(private prisma: PrismaService) {}

  async createRefreshToken(
    saveRefreshTokenData: SaveRefreshTokenDto,
  ): Promise<RefreshToken> {
    try {
      const token = await this.prisma.refreshToken.create({
        data: saveRefreshTokenData,
      })

      return token
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }
}
