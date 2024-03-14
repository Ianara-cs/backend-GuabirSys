import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma-service/prisma-service.service'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class GlobalModule {}
