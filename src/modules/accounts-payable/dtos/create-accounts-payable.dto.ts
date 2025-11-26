import { Status } from '../entities/accounts-payable.entity'

export class CreateAccountsPayableDto {
  description?: string
  totalValue: string
  observation?: string
  issueDate: Date
  dueDate: Date
  status: Status
  categoryId: string
}
