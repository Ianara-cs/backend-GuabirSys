import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { Table, TableStatus } from '../../entities/table.entity'
import { TableRepository } from '../interfaces/table.repository'
import { CreateTableInput } from '../../inputs/create-table.input'
import { TableFilterInput } from '../../inputs/table-filter-input'

@Injectable()
export class TablePersistence implements TableRepository {
  constructor(private prisma: PrismaService) {}

  async createTable({
    nameClient,
    number,
    tableStatus,
    totalPeople,
  }: CreateTableInput): Promise<Table> {
    const newTable = await this.prisma.table.create({
      data: { nameClient, number, tableStatus, totalPeople },
    })

    return newTable
  }

  async findTableById(id: string): Promise<Table> {
    const table = await this.prisma.table.findUnique({
      where: { id },
      include: { orders: { include: { items: { include: { item: true } } } } },
    })
    return table
  }

  async findAllTable(filters?: TableFilterInput): Promise<Table[]> {
    const tables = await this.prisma.table.findMany({
      where: {
        ...(filters?.status && {
          tableStatus: { in: filters.status },
        }),
      },
      include: { orders: true },
    })
    return tables
  }

  async changeTableStatus(id: string, status: TableStatus): Promise<Table> {
    const table = await this.prisma.table.update({
      where: { id },
      data: { tableStatus: status },
    })
    return table
  }

  async deleteTable(id: string): Promise<Table> {
    const table = await this.prisma.table.delete({ where: { id } })

    return table
  }
}
