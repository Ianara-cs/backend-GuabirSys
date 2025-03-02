import { CreateMenuDto } from '../../dtos/create-menu.dto'
import { Item } from '../../entities/item.entity'
import { Menu } from '../../entities/menu.entity'
import { CreateItemInput } from '../../inputs/create-item.input'
import { UpdateItemInput } from '../../inputs/update-item.input'
import { UpdateMenuInput } from '../../inputs/update-menu.input'

export interface MenuRepository {
  findAllMenus(): Promise<Menu[]>
  findAllMenusWithItems(): Promise<Menu[]>
  findMenuById(id: string): Promise<Menu>
  createMenu(createMenu: CreateMenuDto): Promise<Menu>
  updateMenu(updateMenuData: UpdateMenuInput): Promise<Menu>
  deleteMenu(id: string): Promise<Menu>
  createItem(createItem: CreateItemInput): Promise<Item>
  deleteItem(id: string): Promise<Item>
  findItemById(id: string): Promise<Item>
  updateItem(updateItemData: UpdateItemInput): Promise<Item>
}
