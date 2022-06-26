import { RequestContract } from '@ioc:Adonis/Core/Request'

export function orderRequest(request: RequestContract) {
  const column = request.input('order_by', 'id')
  const order = request.input('order', 'desc')

  return [{ column, order }]
}
