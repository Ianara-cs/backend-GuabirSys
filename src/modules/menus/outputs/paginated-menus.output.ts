import { Paginated } from 'src/global/types/graphql/paginated.dto'
import { Menu } from '../entities/menu.entity'

export const PaginatedMenus = Paginated(Menu)
