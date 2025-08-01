import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { MenuService } from '../services/menu.service'
import { Menu } from '../entities/menu.entity'
import { CreateMenuInput } from '../inputs/create-menu.input'
import { Item } from '../entities/item.entity'
import { CreateItemInput } from '../inputs/create-item.input'
import { UpdateMenuInput } from '../inputs/update-menu.input'
import { UpdateItemInput } from '../inputs/update-item.input'
import { ItemOutput } from '../outputs/item.output'
import { PaginatedMenus } from '../outputs/paginated-menus.output'
import { PaginationArgs } from 'src/global/types/graphql/pagination-args'
import { PaginatedItems } from '../outputs/paginated-items.output'

@Resolver()
export class MenuResolver {
  constructor(private menuService: MenuService) {}

  @Query(() => PaginatedMenus)
  async menus(@Args() paginationArgs: PaginationArgs) {
    return await this.menuService.getMenus(paginationArgs)
  }

  @Query(() => [Menu])
  async menusWithItems() {
    return await this.menuService.getMenusWithItems()
  }

  @Query(() => Menu)
  async menu(@Args('id') id: string) {
    return await this.menuService.getMenuById(id)
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
    const menu = await this.menuService.updateMenu(updateMenuNameInput)
    return menu
  }

  @Mutation(() => Menu)
  async deleteMenu(@Args('id') id: string) {
    const menu = await this.menuService.deleteMenu(id)
    return menu
  }

  @Query(() => PaginatedItems)
  async items(@Args() paginationArgs: PaginationArgs) {
    return await this.menuService.getItems(paginationArgs)
  }

  @Query(() => ItemOutput)
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
