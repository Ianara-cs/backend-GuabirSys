import { PaginatedResult } from 'src/global/types/paginated-result'
import { CreateMenuDto } from '../../dtos/create-menu.dto'
import { ItemResponseDto } from '../../dtos/item.response.dto'
import { Item } from '../../entities/item.entity'
import { Menu } from '../../entities/menu.entity'
import { CreateItemInput } from '../../inputs/create-item.input'
import { UpdateItemInput } from '../../inputs/update-item.input'
import { UpdateMenuInput } from '../../inputs/update-menu.input'
import { MenuResponseDto } from '../../dtos/menu.response.dto'
import { MenuFiltersDto } from '../../dtos/menu-filters.dto'
import { ItemFiltersDto } from '../../dtos/item-filters.dto'

export interface MenuRepository {
  findAllMenus(
    filter: MenuFiltersDto,
  ): Promise<PaginatedResult<MenuResponseDto>>
  findAllMenusWithItems(): Promise<Menu[]>
  findMenuById(id: string): Promise<Menu>
  createMenu(createMenu: CreateMenuDto): Promise<Menu>
  updateMenu(updateMenuData: UpdateMenuInput): Promise<Menu>
  deleteMenu(id: string): Promise<Menu>
  findAllItems(
    filters: ItemFiltersDto,
  ): Promise<PaginatedResult<ItemResponseDto>>
  createItem(createItem: CreateItemInput): Promise<Item>
  deleteItem(id: string): Promise<Item>
  findItemById(id: string): Promise<ItemResponseDto>
  updateItem(updateItemData: UpdateItemInput): Promise<Item>
}
