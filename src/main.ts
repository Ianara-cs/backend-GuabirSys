import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { WsAdapter } from '@nestjs/platform-ws'
import { PrismaGraphQLExceptionFilter } from './global/filters/prisma-graphql-exception.filter'
import { json, urlencoded } from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useWebSocketAdapter(new WsAdapter(app))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new PrismaGraphQLExceptionFilter())
  app.enableCors({
    origin: [
      'https://gestor-front-delta.vercel.app',
      'https://gestor-front-git-main-ianara-cs-projects.vercel.app',
      'https://studio.apollographql.com',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  app.use(json({ limit: '10mb' }))
  app.use(urlencoded({ extended: true }))

  await app.listen(3000, '0.0.0.0')
}
bootstrap()
