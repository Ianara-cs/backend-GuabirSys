import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from '../../dtos/create-menu.dto'
import { Menu } from '../../entities/menu.entity'
import { MenuRepository } from '../interfaces/menu.repository'
import { PrismaService } from 'src/global/prisma-service/prisma-service.service'
import { Item } from '../../entities/item.entity'
import { CreateItemInput } from '../../inputs/create-item.input'
import { UpdateMenuInput } from '../../inputs/update-menu.input'
import { UpdateItemInput } from '../../inputs/update-item.input'
import { Prisma } from '@prisma/client'
import { MenuResponseDto } from '../../dtos/menu.response.dto'
import { ItemResponseDto } from '../../dtos/item.response.dto'

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
    try {
      const menu = await this.prisma.menu.findUnique({
        where: { id },
        include: { items: { orderBy: [{ name: 'asc' }] } },
      })

      let menuResponse: MenuResponseDto | null

      if (menu) {
        menuResponse = {
          ...menu,
          items: menu.items.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            menuId: item.menuId,
            quantityPeople: item.quantityPeople,
            imgUrl: item.imgUrl,
          })),
        }
      }

      return menuResponse
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async createMenu(createMenu: CreateMenuDto): Promise<Menu> {
    return await this.prisma.menu.create({ data: createMenu })
  }

  async updateMenu({ id, name, category }: UpdateMenuInput): Promise<Menu> {
    try {
      const menu = await this.prisma.menu.update({
        where: { id },
        data: {
          name,
          category,
        },
        include: { items: { orderBy: [{ name: 'asc' }] } },
      })

      const menuResponse: MenuResponseDto = {
        ...menu,
        items: menu.items.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          menuId: item.menuId,
          quantityPeople: item.quantityPeople,
          imgUrl: item.imgUrl,
        })),
      }

      return menuResponse
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async deleteMenu(id: string): Promise<Menu> {
    try {
      const menu = await this.prisma.menu.delete({
        where: { id },
      })

      const menuResponse: MenuResponseDto = {
        ...menu,
      }

      return menuResponse
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async createItem({
    description,
    menuId,
    name,
    price,
    quantityPeople,
  }: CreateItemInput): Promise<Item> {
    try {
      const item = await this.prisma.item.create({
        data: {
          name,
          quantityPeople,
          price,
          description,
          menuId,
        },
      })

      return item
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
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
    quantityPeople,
    menuId,
  }: UpdateItemInput): Promise<Item> {
    try {
      const item = await this.prisma.item.update({
        where: { id },
        data: { description, name, price, quantityPeople, menuId },
      })

      return item
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async findItemById(id: string): Promise<ItemResponseDto> {
    try {
      const item = await this.prisma.item.findUnique({
        where: { id },
        include: { Menu: true },
      })

      let itemsResponse: ItemResponseDto | null

      if (item) {
        itemsResponse = {
          ...item,
          menu: {
            ...item.Menu,
          },
        }
      }

      return itemsResponse
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }

  async findAllItems(): Promise<ItemResponseDto[]> {
    try {
      const items = await this.prisma.item.findMany({
        include: { Menu: true },
      })

      const itemsResponse: ItemResponseDto[] = items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        menuId: item.menuId,
        quantityPeople: item.quantityPeople,
        imgUrl: item.imgUrl,
        menu: {
          id: item.Menu.id,
          name: item.Menu.name,
          category: item.Menu.category,
        },
      }))

      return itemsResponse
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Database error: ${error.message}`)
      }
      throw error
    }
  }
}
