import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { AccountsPayableResponse } from '../../dtos/accounts-payable.response'
import { CreateAccountsPayableDto } from '../../dtos/create-accounts-payable.dto'
import { AccountsPayableRepository } from '../interfaces/accounts-payable.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AccountsPayablePersistence implements AccountsPayableRepository {
  constructor(private prisma: PrismaService) {}

  async createAccountPayable({
    description,
    dueDate,
    issueDate,
    observation,
    status,
    totalValue,
    categoryId,
  }: CreateAccountsPayableDto): Promise<AccountsPayableResponse> {
    const newAccountPayable = await this.prisma.accountsPayable.create({
      data: {
        status,
        description,
        dueDate,
        issueDate,
        observation,
        totalValue,
        categoryId,
      },
    })

    return newAccountPayable
  }

  async findAllAccountsPayable(): Promise<AccountsPayableResponse[]> {
    const accountsPayable = await this.prisma.accountsPayable.findMany()
    return accountsPayable
  }

  async findAccountPayableById(id: string): Promise<AccountsPayableResponse> {
    const accountsPayable = await this.prisma.accountsPayable.findUnique({
      where: { id },
    })
    return accountsPayable
  }

  // async update(id: string, name: string): Promise<AccountsPayableResponse> {
  //   throw new Error('Method not implemented.')
  // }
}
