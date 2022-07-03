import { RequestContract } from '@ioc:Adonis/Core/Request'

const defaultSortableColumns = ['id', 'created_at', 'updated_at']
const orders = ['asc', 'desc']

type OrderType = 'asc' | 'desc'

const defaultOrder = 'asc'
const defaultSortBy = 'id'

export function createOrder(
  request: RequestContract,
  sortableColumns: string[] = defaultSortableColumns
): [string, OrderType] {
  const order = request.input('order')
  const orderBy = request.input('order_by')

  const finalOrderBy = sortableColumns.includes(orderBy) ? orderBy : defaultSortBy

  const finalOrder = orders.includes(order) ? order : defaultOrder

  return [finalOrderBy, finalOrder]
}

const defaultPage = 1
const defaultPerPage = 20

export function createPagination(request: RequestContract): [number, number] {
  const page = request.input('page')
  const perPage = request.input('per_page')

  const finalPage = isNaN(page) ? defaultPage : page > 0 ? page : defaultPage
  const finalPerPage = isNaN(perPage) ? defaultPerPage : perPage > 0 ? perPage : defaultPerPage

  return [finalPage, finalPerPage]
}
