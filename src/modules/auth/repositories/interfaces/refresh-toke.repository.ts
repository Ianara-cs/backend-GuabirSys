import { SaveRefreshTokenDto } from '../../dtos/save-refresh-token.dto'
import { RefreshToken } from '../../entities/refresh-token.entity'

export interface RefreshTokenRepository {
  createRefreshToken(
    saveRefreshTokenData: SaveRefreshTokenDto,
  ): Promise<RefreshToken>
  findRefreshToken(refreshToken: string, userId: string): Promise<RefreshToken>
}
