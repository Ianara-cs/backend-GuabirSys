import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { SaveRefreshTokenDto } from '../../dtos/save-refresh-token.dto'
import { RefreshToken } from '../../entities/refresh-token.entity'
import { RefreshTokenRepository } from '../interfaces/refresh-toke.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RefreshTokenPersistence implements RefreshTokenRepository {
  constructor(private prisma: PrismaService) {}

  async createRefreshToken(
    saveRefreshTokenData: SaveRefreshTokenDto,
  ): Promise<RefreshToken> {
    const token = await this.prisma.refreshToken.create({
      data: saveRefreshTokenData,
    })

    return token
  }

  async findRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<RefreshToken> {
    const token = await this.prisma.refreshToken.findMany({
      where: {
        userId,
        token: refreshToken,
      },
    })

    return token[0]
  }

  async deleteRefreshToken(id: string): Promise<RefreshToken> {
    const token = await this.prisma.refreshToken.delete({
      where: {
        id,
      },
    })

    return token
  }
}
