import { PaginatedResult } from 'src/global/types/paginated-result'

interface PaginateArgs {
  prismaModel: any
  isPaginated: boolean
  page: number
  take: number
  include?: object
  orderBy?: Array<object>
}

export async function paginate<T>({
  prismaModel,
  isPaginated,
  page,
  include,
  take,
  orderBy,
}: PaginateArgs): Promise<PaginatedResult<T>> {
  let skip: number | undefined
  let limit: number | undefined

  if (isPaginated) {
    skip = (page - 1) * take
    limit = take
  }

  const [data, total] = await Promise.all([
    prismaModel.findMany({
      ...(skip !== undefined ? { skip } : {}),
      ...(limit !== undefined ? { take: limit } : {}),
      include,
      orderBy,
    }),
    prismaModel.count(),
  ])

  return {
    result: data,
    total,
    hasNextPage: skip + limit < total,
  }
}
