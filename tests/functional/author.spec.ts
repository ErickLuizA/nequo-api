import { test } from '@japa/runner'
import { ExceptionCode, ExceptionMessage } from 'App/Constants/Exception'

const authorProperties = ['id', 'name', 'slug', 'bio', 'created_at', 'updated_at']

test.group('Authors', () => {
  test('should be able to get paginated and ordered list of authors', async ({
    client,
    assert,
  }) => {
    const response = await client.get(
      '/api/v1/authors?page=2&per_page=5&order_by=created_at&order=asc'
    )

    assert.properties(response.body().data[0], authorProperties)
    assert.isAbove(
      new Date(response.body().data[1].created_at),
      new Date(response.body().data[0].created_at)
    )
    response.assertStatus(200)
    response.assertBodyContains({
      meta: {
        current_page: 2,
        per_page: 5,
      },
      data: [],
    })
  })

  test('should be able to get author by id', async ({ client, assert }) => {
    const response = await client.get(`/api/v1/authors/1`)

    assert.properties(response.body(), authorProperties)
    response.assertStatus(200)
    response.assertBodyContains({
      id: 1,
    })
  })

  test('should fail to get author by id if it does not exist', async ({ client }) => {
    const response = await client.get(`/api/v1/authors/4984348`)

    response.assertStatus(404)
    response.assertBodyContains({
      code: ExceptionCode.E_ROW_NOT_FOUND,
      message: ExceptionMessage.E_ROW_NOT_FOUND,
    })
  })

  test('should be able to get author quotes', async ({ client, assert }) => {
    const response = await client.get(`/api/v1/authors/1/quotes`)

    assert.properties(response.body(), [...authorProperties, 'quotes'])

    response.body().quotes.forEach((quote) => {
      assert.equal(quote.author_id, 1)
    })

    response.assertStatus(200)
    response.assertBodyContains({
      id: 1,
      quotes: [],
    })
  })
})
