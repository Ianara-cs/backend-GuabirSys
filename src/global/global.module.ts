import { Module } from '@nestjs/common'
import { PrismaService } from './prisma-service/prisma-service.service'

@Module({
  providers: [PrismaService],
})
export class GlobalModule {}
