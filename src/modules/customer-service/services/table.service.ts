import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Table } from '../entities/table.entity'
import { CreateTableInput } from '../inputs/create-table.input'
import { TableRepository } from '../repositories/interfaces/table.repository'
import { ChangeTableStatusInput } from '../inputs/change-table-status.input'

@Injectable()
export class TableService {
  constructor(
    @Inject('TableRepository')
    private tableRepository: TableRepository,
  ) {}

  async createTable(createTable: CreateTableInput): Promise<Table> {
    const newTable = await this.tableRepository.createTable(createTable)
    return newTable
  }

  async getAllTable(): Promise<Table[]> {
    const tables = await this.tableRepository.findAllTable()
    return tables
  }

  async getTableById(id: string): Promise<Table> {
    const table = await this.tableRepository.findTableById(id)

    if (!table) {
      throw new NotFoundException('Table not found!')
    }

    return table
  }

  async changeTableStatus({ id, tableStatus }: ChangeTableStatusInput) {
    const table = await this.getTableById(id)

    const updatedTable = await this.tableRepository.changeTableStatus(
      table.id,
      tableStatus,
    )

    return updatedTable
  }

  async deleteTable(id: string): Promise<Table> {
    await this.getTableById(id)

    const deletedTable = await this.tableRepository.deleteTable(id)

    return deletedTable
  }
}
