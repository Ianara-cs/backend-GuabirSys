import { PaginatedResult } from 'src/global/types/paginated-result'

interface PaginateArgs {
  prismaModel: any
  page: number
  take: number
  include?: object
  orderBy?: Array<object>
}

export async function paginate<T>({
  prismaModel,
  page,
  include,
  take,
  orderBy,
}: PaginateArgs): Promise<PaginatedResult<T>> {
  const skip = (page - 1) * take

  const [data, total] = await Promise.all([
    prismaModel.findMany({
      skip,
      take,
      include,
      orderBy,
    }),
    prismaModel.count(),
  ])

  return {
    result: data,
    total,
    hasNextPage: skip + take < total,
  }
}
