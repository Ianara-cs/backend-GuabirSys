import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { MenuRepository } from '../repositories/interfaces/menu.repository'
import { Menu } from '../entities/menu.entity'
import { CreateMenuDto } from '../dtos/create-menu.dto'
import { CreateItemInput } from '../inputs/create-item.input'
import { Item } from '../entities/item.entity'
import { UpdateMenuInput } from '../inputs/update-menu.input'
import { UpdateItemInput } from '../inputs/update-item.input'

@Injectable()
export class MenuService {
  constructor(
    @Inject('MenuRepository')
    private menuRepository: MenuRepository,
  ) {}

  async getMenus(): Promise<Menu[]> {
    return await this.menuRepository.findAllMenus()
  }

  async getMenusWithItems(): Promise<Menu[]> {
    return await this.menuRepository.findAllMenusWithItems()
  }

  async createMenu({ name, category }: CreateMenuDto): Promise<Menu> {
    const newMenu = await this.menuRepository.createMenu({ name, category })
    return newMenu
  }

  async updateMenuName({ id, name, category }: UpdateMenuInput): Promise<Menu> {
    const menu = await this.menuRepository.findMenuById(id)

    if (!menu) {
      throw new NotFoundException('menu not found!')
    }

    const updatedMenu = await this.menuRepository.updateMenu({
      id,
      name,
      category,
    })
    return updatedMenu
  }

  async createItem({
    name,
    price,
    description,
    menuId,
  }: CreateItemInput): Promise<Item> {
    const newItem = await this.menuRepository.createItem({
      name,
      price,
      description,
      menuId,
    })

    return newItem
  }

  async getItemById(id: string): Promise<Item> {
    const item = await this.menuRepository.findItemById(id)

    if (!item) {
      throw new NotFoundException('Item not found!')
    }

    return item
  }

  async updateItem({
    id,
    description,
    name,
    price,
  }: UpdateItemInput): Promise<Item> {
    const item = await this.getItemById(id)

    if (!name) {
      name = item.name
    }

    if (!description) {
      description = item.description
    }

    if (!price) {
      price = item.price
    }

    const updatedItem = await this.menuRepository.updateItem({
      id,
      description,
      name,
      price,
    })
    return updatedItem
  }

  async deleteItem(id: string): Promise<Item> {
    await this.getItemById(id)

    const deletedItem = await this.menuRepository.deleteItem(id)
    return deletedItem
  }
}
