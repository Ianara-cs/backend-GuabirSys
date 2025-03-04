import { Module } from '@nestjs/common'
import { UsersPersistence } from './repositories/implementations/users.persistence'
import { REPOSITORY } from 'src/global/utils/constants/repository'
import { UsersService } from './services/users.service'

@Module({
  providers: [
    {
      provide: REPOSITORY.USER,
      useClass: UsersPersistence,
    },
    UsersService,
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
