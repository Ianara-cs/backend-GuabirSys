import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TableService } from '../services/table.service'
import { Table } from '../entities/table.entity'
import { CreateTableInput } from '../inputs/create-table.input'
import { ChangeTableStatusInput } from '../inputs/change-table-status.input'

@Resolver()
export class CustomerServiceResolver {
  constructor(private tableService: TableService) {}

  @Query(() => [Table])
  async tables() {
    return await this.tableService.getAllTable()
  }

  @Mutation(() => Table)
  async createTable(
    @Args('createTableData') createTableInput: CreateTableInput,
  ) {
    const newTable = await this.tableService.createTable(createTableInput)
    return newTable
  }

  @Mutation(() => Table)
  async changeTableStatus(
    @Args('changeTableStatusData') changeTableStatus: ChangeTableStatusInput,
  ) {
    const updatedTable =
      await this.tableService.changeTableStatus(changeTableStatus)
    return updatedTable
  }

  @Mutation(() => Table)
  async deleteTable(@Args('id') id: string) {
    const deletedTable = await this.tableService.deleteTable(id)
    return deletedTable
  }
}
