import { Module } from '@nestjs/common'
import { UsersPersistence } from './repositories/implementations/users.persistence'
import { REPOSITORY } from 'src/global/utils/constants/repository'

@Module({
  providers: [
    {
      provide: REPOSITORY.USER,
      useClass: UsersPersistence,
    },
  ],
  exports: [
    {
      provide: REPOSITORY.USER,
      useClass: UsersPersistence,
    },
  ],
})
export class UsersModule {}
