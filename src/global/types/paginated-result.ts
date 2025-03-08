export interface PaginatedResult<T> {
  result: T[]
  total: number
  hasNextPage: boolean
}
