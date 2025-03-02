import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { MenuService } from '../services/menu.service'
import { Menu } from '../entities/menu.entity'
import { CreateMenuInput } from '../inputs/create-menu.input'
import { Item } from '../entities/item.entity'
import { CreateItemInput } from '../inputs/create-item.input'
import { UpdateMenuInput } from '../inputs/update-menu.input'
import { UpdateItemInput } from '../inputs/update-item.input'

@Resolver()
export class MenuResolver {
  constructor(private menuService: MenuService) {}

  @Query(() => [Menu])
  async menus() {
    return await this.menuService.getMenus()
  }

  @Query(() => [Menu])
  async menusWithItems() {
    return await this.menuService.getMenusWithItems()
  }

  @Mutation(() => Menu)
  async createMenu(@Args('createMenuData') createMenuInput: CreateMenuInput) {
    const newMenu = await this.menuService.createMenu(createMenuInput)
    return newMenu
  }

  @Mutation(() => Menu)
  async updateMenu(
    @Args('updateMenuData') updateMenuNameInput: UpdateMenuInput,
  ) {
    const menu = await this.menuService.updateMenuName(updateMenuNameInput)
    return menu
  }

  @Query(() => Item)
  async item(@Args('id') id: string) {
    return await this.menuService.getItemById(id)
  }

  @Mutation(() => Item)
  async createItem(@Args('createItemData') createItemInput: CreateItemInput) {
    const newItem = await this.menuService.createItem(createItemInput)
    return newItem
  }

  @Mutation(() => Item)
  async updateItem(@Args('updateItemData') updateItemInput: UpdateItemInput) {
    const menu = await this.menuService.updateItem(updateItemInput)
    return menu
  }

  @Mutation(() => Item)
  async deleteItem(@Args('id') id: string) {
    const item = await this.menuService.deleteItem(id)
    return item
  }
}
