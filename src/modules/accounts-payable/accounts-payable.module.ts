import { Module } from '@nestjs/common'
import { AccountsPayableService } from './services/accounts-payable.service'
import { AccountsPayablePersistence } from './repositories/implamentations/accounts-payable.persistence'
import { AccountsPayableResolver } from './resolvers/accounts-payable.resolver'

@Module({
  imports: [],
  providers: [
    AccountsPayableService,
    {
      provide: 'accountsPayableRepository',
      useClass: AccountsPayablePersistence,
    },
    AccountsPayableResolver,
  ],
})
export class AccountsPayableModule {}
