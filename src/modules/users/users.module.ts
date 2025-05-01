import { Module } from '@nestjs/common'
import { UsersPersistence } from './repositories/implementations/users.persistence'
import { REPOSITORY } from 'src/global/utils/constants/repository'
import { UsersService } from './services/users.service'
import { UsersResolver } from './resolvers/users.resolver'

@Module({
  providers: [
    {
      provide: REPOSITORY.USER,
      useClass: UsersPersistence,
    },
    UsersService,
    UsersResolver,
  ],
  exports: [
    {
      provide: REPOSITORY.USER,
      useClass: UsersPersistence,
    },
    UsersService,
  ],
})
export class UsersModule {}
