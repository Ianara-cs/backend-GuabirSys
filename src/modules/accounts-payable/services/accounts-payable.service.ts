import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { AccountsPayableRepository } from '../repositories/interfaces/accounts-payable.repository'
import { CreateAccountsPayableDto } from '../dtos/create-accounts-payable.dto'
import { AccountsPayableResponse } from '../dtos/accounts-payable.response'

@Injectable()
export class AccountsPayableService {
  constructor(
    @Inject('accountsPayableRepository')
    private accountsPayableRepository: AccountsPayableRepository,
  ) {}

  async createAccountPayable(
    createAccountsPayableData: CreateAccountsPayableDto,
  ): Promise<AccountsPayableResponse> {
    const newAccountPayable =
      await this.accountsPayableRepository.createAccountPayable(
        createAccountsPayableData,
      )

    return newAccountPayable
  }

  async getAllAccountPayable() {
    return await this.accountsPayableRepository.findAllAccountsPayable()
  }

  async getAllAccountPayableById(id: string) {
    const accountsPayable =
      await this.accountsPayableRepository.findAccountPayableById(id)

    if (!accountsPayable) {
      throw new NotFoundException('Account Payable not found!')
    }

    return accountsPayable
  }
}
