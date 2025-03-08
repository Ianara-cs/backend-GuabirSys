import { PaginatedResult } from 'src/global/types/paginated-result'

interface IPaginate {
  prismaModel: any
  page: number
  take: number
  include: object
}

export async function paginate<T>({
  prismaModel,
  page,
  include,
  take,
}: IPaginate): Promise<PaginatedResult<T>> {
  const skip = (page - 1) * take

  const [data, total] = await Promise.all([
    prismaModel.findMany({
      skip,
      take,
      include,
    }),
    prismaModel.count(),
  ])

  return {
    result: data,
    total,
    hasNextPage: skip + take < total,
  }
}
