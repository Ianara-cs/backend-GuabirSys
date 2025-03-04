import { Module } from '@nestjs/common'
import { AuthResolver } from './resolvers/auth.resolver'
import { AuthService } from './services/auth.service'
import { UsersModule } from '../users/users.module'
import { REPOSITORY } from 'src/global/utils/constants/repository'
import { RefreshTokenPersistence } from './repositories/implementations/refresh-token.persistence'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategies/jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { GqlAuthGuard } from './guards/gql-auth.guard'
import { RolesGuard } from './guards/roles.guard'

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsersModule],
  providers: [
    JwtStrategy,
    AuthResolver,
    AuthService,
    {
      provide: REPOSITORY.REFRESH_TOKEN,
      useClass: RefreshTokenPersistence,
    },
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
