import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { MenuRepository } from '../repositories/interfaces/menu.repository'
import { Menu } from '../entities/menu.entity'
import { CreateMenuDto } from '../dtos/create-menu.dto'
import { CreateItemInput } from '../inputs/create-item.input'
import { Item } from '../entities/item.entity'
import { UpdateMenuInput } from '../inputs/update-menu.input'
import { UpdateItemInput } from '../inputs/update-item.input'
import { ItemResponseDto } from '../dtos/item.response.dto'
import { PaginatedResult } from 'src/global/types/paginated-result'
import { MenuResponseDto } from '../dtos/menu.response.dto'
import { PaginationArgs } from 'src/global/types/graphql/pagination-args'

@Injectable()
export class MenuService {
  constructor(
    @Inject('MenuRepository')
    private menuRepository: MenuRepository,
  ) {}

  async getMenus(
    paginationArgs: PaginationArgs,
  ): Promise<PaginatedResult<MenuResponseDto>> {
    return await this.menuRepository.findAllMenus({ paginationArgs })
  }

  async getMenusWithItems(): Promise<Menu[]> {
    return await this.menuRepository.findAllMenusWithItems()
  }

  async getMenuById(id: string): Promise<Menu> {
    const menu = await this.menuRepository.findMenuById(id)

    if (!menu) {
      throw new NotFoundException('Menu not found!')
    }

    return menu
  }

  async createMenu({ name, category }: CreateMenuDto): Promise<Menu> {
    const newMenu = await this.menuRepository.createMenu({ name, category })
    return newMenu
  }

  async updateMenu({ id, name, category }: UpdateMenuInput): Promise<Menu> {
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

  async deleteMenu(id: string): Promise<Menu> {
    const menu = await this.getMenuById(id)

    if (menu.items.length > 0) {
      throw new BadRequestException('Undeletable menu!')
    }

    const deletedMenu = await this.menuRepository.deleteMenu(id)
    return deletedMenu
  }

  async createItem(createItemData: CreateItemInput): Promise<Item> {
    const newItem = await this.menuRepository.createItem(createItemData)

    return newItem
  }

  async getItemById(id: string): Promise<ItemResponseDto> {
    const item = await this.menuRepository.findItemById(id)

    if (!item) {
      throw new NotFoundException('Item not found!')
    }

    return item
  }

  async getItems(
    paginationArgs: PaginationArgs,
  ): Promise<PaginatedResult<ItemResponseDto>> {
    return await this.menuRepository.findAllItems({ paginationArgs })
  }

  async updateItem({
    id,
    description,
    name,
    price,
    quantityPeople,
    menuId,
  }: UpdateItemInput): Promise<Item> {
    const item = await this.getItemById(id)
    await this.getMenuById(menuId)

    if (!name) {
      name = item.name
    }

    if (!description) {
      description = item.description
    }

    if (!price) {
      price = item.price
    }

    if (!quantityPeople) {
      quantityPeople = item.quantityPeople
    }

    const updatedItem = await this.menuRepository.updateItem({
      id,
      description,
      name,
      price,
      quantityPeople,
      menuId,
    })
    return updatedItem
  }

  async deleteItem(id: string): Promise<Item> {
    await this.getItemById(id)

    const deletedItem = await this.menuRepository.deleteItem(id)
    return deletedItem
  }
}
