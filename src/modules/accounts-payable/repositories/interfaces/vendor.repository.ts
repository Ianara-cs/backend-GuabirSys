import { CreateVendorDto } from '../../dtos/vendor/create-vendor.dto'
import { VendorEntity } from '../../entities/vendor.entity'

export interface VendorRepository {
  createVendor(createVendorData: CreateVendorDto): Promise<VendorEntity>
  findAllVendor(): Promise<VendorEntity[]>
  findVendorById(id: string): Promise<VendorEntity>
  updateName(id: string, name: string): Promise<VendorEntity>
  updateTelephone(id: string, telephone: string): Promise<VendorEntity>
}
