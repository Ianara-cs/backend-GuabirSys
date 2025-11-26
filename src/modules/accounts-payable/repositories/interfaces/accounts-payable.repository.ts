import { AccountsPayableResponse } from '../../dtos/accounts-payable.response'
import { CreateAccountsPayableDto } from '../../dtos/create-accounts-payable.dto'

export interface AccountsPayableRepository {
  createAccountPayable(
    createAccountsPayableData: CreateAccountsPayableDto,
  ): Promise<AccountsPayableResponse>
  findAllAccountsPayable(): Promise<AccountsPayableResponse[]>
  findAccountPayableById(id: string): Promise<AccountsPayableResponse>
  // update(id: string, name: string): Promise<AccountsPayableResponse>
}
