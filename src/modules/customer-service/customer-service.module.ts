import { Module } from '@nestjs/common'
import { CustomerServiceResolver } from './resolvers/customer-service.resolver'
import { TableService } from './services/table.service'
import { TablePersistence } from './repositories/implementations/table.persistence'

@Module({
  providers: [
    { provide: 'TableRepository', useClass: TablePersistence },
    TableService,
    CustomerServiceResolver,
  ],
})
export class CustomerServiceModule {}
