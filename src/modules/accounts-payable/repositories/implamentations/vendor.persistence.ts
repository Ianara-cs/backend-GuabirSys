import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { CreateVendorDto } from '../../dtos/vendor/create-vendor.dto'
import { VendorEntity } from '../../entities/vendor.entity'
import { VendorRepository } from '../interfaces/vendor.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class VendorPersistence implements VendorRepository {
  constructor(private prisma: PrismaService) {}

  async createVendor({
    name,
    telephone,
  }: CreateVendorDto): Promise<VendorEntity> {
    const newVendor = await this.prisma.vendor.create({
      data: { name, telephone },
    })

    return newVendor
  }

  async findAllVendor(): Promise<VendorEntity[]> {
    return await this.prisma.vendor.findMany()
  }
  async findVendorById(id: string): Promise<VendorEntity> {
    const vendor = await this.prisma.vendor.findUnique({ where: { id } })

    return vendor
  }

  async updateName(id: string, name: string): Promise<VendorEntity> {
    const vendor = await this.prisma.vendor.update({
      where: { id },
      data: { name },
    })

    return vendor
  }

  async updateTelephone(id: string, telephone: string): Promise<VendorEntity> {
    const vendor = await this.prisma.vendor.update({
      where: { id },
      data: { telephone },
    })

    return vendor
  }
}
