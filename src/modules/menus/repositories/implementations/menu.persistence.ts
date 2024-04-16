import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from '../../dtos/create-menu.dto'
import { Menu } from '../../entities/menu.entity'
import { MenuRepository } from '../interfaces/menu.repository'
import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { Item } from '../../entities/item.entity'
import { CreateItemInput } from '../../inputs/create-item.input'
import { UpdateMenuNameInput } from '../../inputs/update-name-menu.input'

@Injectable()
export class MenuPersistence implements MenuRepository {
  constructor(private prisma: PrismaService) {}

  async findAllMenus(): Promise<Menu[]> {
    return await this.prisma.menu.findMany({ include: { items: true } })
  }

  async findMenuById(id: string): Promise<Menu> {
    return await this.prisma.menu.findUnique({ where: { id } })
  }

  async createMenu(createMenu: CreateMenuDto): Promise<Menu> {
    return await this.prisma.menu.create({ data: createMenu })
  }

  async updateMenuName({ id, name }: UpdateMenuNameInput): Promise<Menu> {
    return await this.prisma.menu.update({
      where: { id },
      data: {
        name,
      },
    })
  }

  async createItem({
    description,
    menuId,
    name,
    price,
  }: CreateItemInput): Promise<Item> {
    const i = await this.prisma.item.create({
      data: {
        name,
        price,
        description,
        menuId,
      },
    })

    return i
  }

  async deleteItem(id: string): Promise<Item> {
    const item = await this.prisma.item.delete({ where: { id } })
    return item
  }

  async findItemById(id: string): Promise<Item> {
    return await this.prisma.item.findUnique({ where: { id } })
  }
}
