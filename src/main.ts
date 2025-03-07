import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { WsAdapter } from '@nestjs/platform-ws'
import { PrismaGraphQLExceptionFilter } from './global/filters/prisma-graphql-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useWebSocketAdapter(new WsAdapter(app))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new PrismaGraphQLExceptionFilter())
  app.enableCors()
  await app.listen(3000, '0.0.0.0')
}
bootstrap()
