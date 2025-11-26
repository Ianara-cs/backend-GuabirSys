import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AccountsPayableService } from '../services/accounts-payable.service'
import { AccountPayableResponseOutput } from '../outputs/account-payable-response.output'
import { CreateAccountsPayableInput } from '../inputs/create-accounts-payable.input'

@Resolver()
export class AccountsPayableResolver {
  constructor(private accountsPayableService: AccountsPayableService) {}

  @Query(() => [AccountPayableResponseOutput])
  async accountsPayable() {
    return await this.accountsPayableService.getAllAccountPayable()
  }

  @Mutation(() => AccountPayableResponseOutput)
  async createAccountPayable(
    @Args('createAccountPayableData')
    createAccountPayableInput: CreateAccountsPayableInput,
  ) {
    return await this.accountsPayableService.createAccountPayable(
      createAccountPayableInput,
    )
  }
}
