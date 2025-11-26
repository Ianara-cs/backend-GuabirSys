import { Decimal } from '@prisma/client/runtime/library'
import { Status } from '../entities/accounts-payable.entity'

export class AccountsPayableResponse {
  id: string
  description: string
  totalValue: Decimal
  observation: string
  issueDate: Date
  dueDate: Date
  status: Status
}
