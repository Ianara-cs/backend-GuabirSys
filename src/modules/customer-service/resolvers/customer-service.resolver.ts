import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TableService } from '../services/table.service'
import { Table } from '../entities/table.entity'
import { CreateTableInput } from '../inputs/create-table.input'
import { ChangeTableStatusInput } from '../inputs/change-table-status.input'
import { TableFilterInput } from '../inputs/table-filter-input'

@Resolver()
export class CustomerServiceResolver {
  constructor(private tableService: TableService) {}

  @Query(() => [Table])
  async tables(
    @Args('filters', { nullable: true }) filters?: TableFilterInput,
  ) {
    return await this.tableService.getAllTable(filters)
  }

  @Query(() => Table)
  async table(@Args('id') id: string) {
    return await this.tableService.getTableById(id)
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
