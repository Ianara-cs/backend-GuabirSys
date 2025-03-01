import { Module } from '@nestjs/common'
import { CustomerServiceResolver } from './resolvers/customer-service.resolver'
import { TableService } from './services/table.service'
import { TablePersistence } from './repositories/implementations/table.persistence'
import { OrderService } from './services/order.service'
import { OrderResolver } from './resolvers/order.resolver'
import { OrderPersistence } from './repositories/implementations/order.persistence'
import { MenusModule } from '../menus/menus.module'

@Module({
  imports: [MenusModule],
  providers: [
    { provide: 'TableRepository', useClass: TablePersistence },
    { provide: 'OrderRepository', useClass: OrderPersistence },
    TableService,
    CustomerServiceResolver,
    OrderService,
    OrderResolver,
  ],
})
export class CustomerServiceModule {}
