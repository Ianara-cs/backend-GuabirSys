import { Module } from '@nestjs/common'
import { GlobalModule } from './global/global.module'
import { UsersModule } from './modules/users/users.module'
import { MenusModule } from './modules/menus/menus.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { FootResolver } from './foot.resolver'
import { CustomerServiceModule } from './modules/customer-service/customer-service.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    GlobalModule,
    UsersModule,
    MenusModule,
    CustomerServiceModule,
  ],
  providers: [FootResolver],
})
export class AppModule {}
