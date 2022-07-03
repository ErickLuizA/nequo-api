import { test } from '@japa/runner'
import { createOrder, createPagination, createSearch } from 'Utils/request'

const createRequest = (args) => {
  return {
    input: (key: string) => {
      return args[key]
    },
    qs: () => {
      return args
    },
  }
}

test.group('Request Utils', () => {
  test('should create order', ({ assert }) => {
    const params = {
      request: createRequest({ order: 'desc', order_by: 'name' }),
      sortableColumns: ['id', 'name'],
    } as any

    const result = createOrder(params.request, params.sortableColumns)

    assert.deepEqual(result, ['name', 'desc'])
  })

  test('should fallback to default order and orderBy', ({ assert }) => {
    const params = {
      request: createRequest({ order: 'foo', order_by: 'name' }),
      sortableColumns: ['id', 'created_at'],
    } as any

    const result = createOrder(params.request, params.sortableColumns)

    assert.deepEqual(result, ['id', 'asc'])
  })

  test('should create pagination', ({ assert }) => {
    const params = {
      request: createRequest({ page: '2', per_page: '10' }),
    } as any

    const result = createPagination(params.request)

    assert.deepEqual(result, [2, 10])
  })

  test('should fallback to default page and perPage', ({ assert }) => {
    const params = {
      request: createRequest({ page: 'foo', per_page: 'bar' }),
    } as any

    const result = createPagination(params.request)

    assert.deepEqual(result, [1, 20])
  })

  test('should create search', ({ assert }) => {
    const params = {
      request: createRequest({ search: 'foo', search_by: 'name' }),
      builder: {
        where: (callback) => {
          callback({
            where: () => {},
          })
        },
      },
      searchableColumns: ['name'],
    } as any

    const result = createSearch(params.request, params.builder, params.searchableColumns)

    assert.deepEqual(result, true)
  })

  test('should not create search if search_by is not in searchableColumns', ({ assert }) => {
    const params = {
      request: createRequest({ search: 'foo', search_by: 'name' }),
      builder: {
        where: (callback) => {
          callback({
            where: () => {},
          })
        },
      },
      searchableColumns: ['foo'],
    } as any

    const result = createSearch(params.request, params.builder, params.searchableColumns)

    assert.deepEqual(result, undefined)
  })

  test('should not create search if search is not defined', ({ assert }) => {
    const params = {
      request: createRequest({ search_by: 'name' }),
      builder: {
        where: (callback) => {
          callback({
            where: () => {},
          })
        },
      },
      searchableColumns: ['name'],
    } as any

    const result = createSearch(params.request, params.builder, params.searchableColumns)

    assert.deepEqual(result, undefined)
  })
})
