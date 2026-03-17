import { Table, TableStatus } from '../../entities/table.entity'
import { CreateTableInput } from '../../inputs/create-table.input'
import { TableFilterInput } from '../../inputs/table-filter-input'

export interface TableRepository {
  createTable(createTable: CreateTableInput): Promise<Table>
  findTableById(id: string): Promise<Table>
  findAllTable(filters?: TableFilterInput): Promise<Table[]>
  changeTableStatus(id: string, status: TableStatus): Promise<Table>
  deleteTable(id: string): Promise<Table>
}
