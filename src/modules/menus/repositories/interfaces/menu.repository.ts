import { CreateMenuDto } from '../../dtos/create-menu.dto'
import { Item } from '../../entities/item.entity'
import { Menu } from '../../entities/menu.entity'
import { CreateItemInput } from '../../inputs/create-item.input'
import { UpdateMenuNameInput } from '../../inputs/update-name-menu.input'

export interface MenuRepository {
  findAllMenus(): Promise<Menu[]>
  findMenuById(id: string): Promise<Menu>
  createMenu(createMenu: CreateMenuDto): Promise<Menu>
  updateMenuName(updateNameMenuData: UpdateMenuNameInput): Promise<Menu>
  createItem(createItem: CreateItemInput): Promise<Item>
  deleteItem(id: string): Promise<Item>
  findItemById(id: string): Promise<Item>
}
