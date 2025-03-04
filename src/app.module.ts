import { Module } from '@nestjs/common'
import { GlobalModule } from './global/global.module'
import { UsersModule } from './modules/users/users.module'
import { MenusModule } from './modules/menus/menus.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { FootResolver } from './foot.resolver'
import { CustomerServiceModule } from './modules/customer-service/customer-service.module'
import { NotesModule } from './modules/notes/notes.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'subscriptions-transport-ws': true,
        // {
        //   path: '/graphql',
        //   onConnect: () => {
        //     console.log('WebSocket connection established')
        //   },
        //   onDisconnect: () => {
        //     console.log('WebSocket connection closed')
        //   },
        // },
      },
    }),
    GlobalModule,
    UsersModule,
    MenusModule,
    CustomerServiceModule,
    NotesModule,
    AuthModule,
  ],
  providers: [FootResolver],
})
export class AppModule {}
