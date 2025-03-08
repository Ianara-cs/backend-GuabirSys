import { Paginated } from 'src/global/types/graphql/paginated.dto'
import { ItemOutput } from './item.output'

export const PaginatedItems = Paginated(ItemOutput)
