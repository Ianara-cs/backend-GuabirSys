import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from '../../dtos/create-menu.dto'
import { Menu } from '../../entities/menu.entity'
import { MenuRepository } from '../interfaces/menu.repository'
import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { Item } from '../../entities/item.entity'
import { CreateItemInput } from '../../inputs/create-item.input'
import { UpdateMenuNameInput } from '../../inputs/update-name-menu.input'
import { UpdateItemInput } from '../../inputs/update-item.input'
import { Prisma } from '@prisma/client'
import { MenuResponseDto } from '../../dtos/menu.response.dto'

@Injectable()
export class MenuPersistence implements MenuRepository {
  constructor(private prisma: PrismaService) {}

  async findAllMenus(): Promise<MenuResponseDto[]> {
    try {
      const menus = await this.prisma.menu.findMany({
        include: { items: { orderBy: [{ name: 'asc' }] } },
        orderBy: [{ category: 'desc' }, { name: 'asc' }],
      })

      const menuResponse: MenuResponseDto[] = menus.map((menu) => ({
        id: menu.id,
        name: menu.name,
        category: menu.category,
        items: menu.items.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          menuId: item.menuId,
          quantityPeople: item.quantityPeople,
          imgUrl: item.imgUrl,
        })),
      }))

      return menuResponse
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async findAllMenusWithItems(): Promise<MenuResponseDto[]> {
    try {
      const menus = await this.prisma.menu.findMany({
        where: {
          items: {
            some: {},
          },
        },
        include: { items: { orderBy: [{ name: 'asc' }] } },
        orderBy: [{ category: 'desc' }, { name: 'asc' }],
      })

      const menuResponse: MenuResponseDto[] = menus.map((menu) => ({
        id: menu.id,
        name: menu.name,
        category: menu.category,
        items: menu.items.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          menuId: item.menuId,
          quantityPeople: item.quantityPeople,
          imgUrl: item.imgUrl,
        })),
      }))

      return menuResponse
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
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

  async updateItem({
    id,
    description,
    name,
    price,
  }: UpdateItemInput): Promise<Item> {
    const item = await this.prisma.item.update({
      where: { id },
      data: { description, name, price },
    })
    return item
  }

  async findItemById(id: string): Promise<Item> {
    return await this.prisma.item.findUnique({ where: { id } })
  }
}
