import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { MenuRepository } from '../repositories/interfaces/menu.repository'
import { Menu } from '../entities/menu.entity'
import { CreateMenuDto } from '../dtos/create-menu.dto'
import { CreateItemInput } from '../inputs/create-item.input'
import { Item } from '../entities/item.entity'
import { UpdateMenuNameInput } from '../inputs/update-name-menu.input'

@Injectable()
export class MenuService {
  constructor(
    @Inject('MenuRepository')
    private menuRepository: MenuRepository,
  ) {}

  async getAllMenus(): Promise<Menu[]> {
    return await this.menuRepository.findAllMenus()
  }

  async createMenu({ name, category }: CreateMenuDto): Promise<Menu> {
    const newMenu = await this.menuRepository.createMenu({ name, category })
    return newMenu
  }

  async updateMenuName({ id, name }: UpdateMenuNameInput): Promise<Menu> {
    const menu = await this.menuRepository.findMenuById(id)

    if (!menu) {
      throw new NotFoundException('menu not found!')
    }

    const updatedMenu = await this.menuRepository.updateMenuName({ id, name })
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

  async deleteItem(id: string): Promise<Item> {
    await this.getItemById(id)

    const deletedItem = await this.menuRepository.deleteItem(id)
    return deletedItem
  }
}
