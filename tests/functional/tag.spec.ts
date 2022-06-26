import { test } from '@japa/runner'

const tagProperties = ['id', 'name', 'slug', 'created_at', 'updated_at']
const quoteTagProperties = ['id', 'quote_id', 'tag_id', 'tag', 'quote', 'created_at', 'updated_at']

test.group('Tags', () => {
  test('should be able to get paginated and ordered list of tags', async ({ client, assert }) => {
    const response = await client.get(
      '/api/v1/tags?page=2&per_page=5&order_by=created_at&order=asc'
    )

    assert.properties(response.body().data[0], tagProperties)
    assert.isAbove(
      new Date(response.body().data[1].created_at),
      new Date(response.body().data[0].created_at)
    )
    response.assertStatus(200)
    response.assertBodyContains({
      meta: { current_page: 2, per_page: 5 },
      data: [],
    })
  })

  test('should be able to get tag by id', async ({ client, assert }) => {
    const response = await client.get(`/api/v1/tags/1`)

    assert.properties(response.body(), tagProperties)
    response.assertStatus(200)
    response.assertBodyContains({ id: 1 })
  })

  test('should be able to get tag quotes', async ({ client, assert }) => {
    const response = await client.get(`/api/v1/tags/1/quotes`)

    assert.properties(response.body().data[0], quoteTagProperties)

    response.body().data.forEach((quote) => {
      assert.equal(quote.tag_id, 1)
    })

    response.assertStatus(200)
    response.assertBodyContains({
      meta: { current_page: 1, per_page: 20 },
      data: [],
    })
  })
})
