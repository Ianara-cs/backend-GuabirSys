import { Module } from '@nestjs/common'
import { AuthResolver } from './resolvers/auth.resolver'
import { AuthService } from './services/auth.service'
import { UsersModule } from '../users/users.module'
import { REPOSITORY } from 'src/global/utils/constants/repository'
import { RefreshTokenPersistence } from './repositories/implementations/refresh-token.persistence'

@Module({
  imports: [UsersModule],
  providers: [
    AuthResolver,
    AuthService,
    {
      provide: REPOSITORY.REFRESH_TOKEN,
      useClass: RefreshTokenPersistence,
    },
  ],
})
export class AuthModule {}
