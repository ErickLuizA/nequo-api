import { test } from '@japa/runner'
import { ExceptionCode, ExceptionMessage } from 'App/Constants/Exception'
import Quote from 'App/Models/Quote'
import QuoteOfTheDay from 'App/Models/QuoteOfTheDay'
import QuoteTag from 'App/Models/QuoteTag'
import { DateTime } from 'luxon'

const quoteProperties = ['id', 'content', 'author_id', 'author', 'tags', 'created_at', 'updated_at']
const quoteOfTheDayProperties = ['id', 'quote_id', 'quote', 'created_at', 'updated_at']

test.group('Quotes', () => {
  test('should get paginated and ordered quotes', async ({ client, assert }) => {
    const response = await client.get(
      `/api/v1/quotes?page=2&per_page=10&order_by=created_at&order=asc`
    )

    assert.properties(response.body().data[0], quoteProperties)
    assert.isAbove(
      new Date(response.body().data[1].created_at),
      new Date(response.body().data[0].created_at)
    )
    response.assertStatus(200)
    response.assertBodyContains({
      meta: {
        current_page: 2,
        per_page: 10,
      },
      data: [],
    })
  })

  test('should get quote by id', async ({ client, assert }) => {
    const response = await client.get(`/api/v1/quotes/1`)

    assert.properties(response.body(), quoteProperties)
    response.assertStatus(200)
    response.assertBodyContains({
      id: 1,
    })
  })

  test('should get quote of the day', async ({ client, assert }) => {
    const response = await client.get(`/api/v1/quotes/quote_of_the_day`)

    assert.properties(response.body(), quoteOfTheDayProperties)
    response.assertStatus(200)
    response.assertBodyContains({
      id: 1,
    })
  })

  test('should fail to get quote by id if it does not exist', async ({ client }) => {
    const response = await client.get(`/api/v1/quotes/4984348`)

    response.assertStatus(404)
    response.assertBodyContains({
      code: ExceptionCode.E_ROW_NOT_FOUND,
      message: ExceptionMessage.E_ROW_NOT_FOUND,
    })
  })

  test('should get new quote of the day if last quote of the day is not today', async ({
    client,
    assert,
  }) => {
    const response = await client.get(`/api/v1/quotes/quote_of_the_day`)

    assert.properties(response.body(), quoteOfTheDayProperties)
    response.assertStatus(200)
    response.assertBodyContains({
      id: 2,
    })
  }).setup(async () => {
    const quoteOfTheDay = await QuoteOfTheDay.find(1)

    if (quoteOfTheDay) {
      quoteOfTheDay.createdAt = DateTime.local().minus({ days: 1 })

      await quoteOfTheDay?.save()
    }
  })

  test('should get random quote', async ({ client, assert }) => {
    const response = await client.get(`/api/v1/quotes/random`)

    assert.properties(response.body(), quoteProperties)
    response.assertStatus(200)
  })

  test('should search quotes', async ({ client, assert }) => {
    const response = await client.get(`/api/v1/quotes/search?q=Testing&authors=1&tags=1,2`)

    assert.properties(response.body()[0], quoteProperties)
    assert.deepEqual(response.body()[0].content, 'Testing Content')
    assert.deepEqual(response.body()[0].author_id, 1)
    assert.deepEqual(response.body()[0].tags[0].tag_id, 1)
    assert.deepEqual(response.body()[0].tags[1].tag_id, 2)

    response.assertStatus(200)
    response.assertBodyContains([])
  }).setup(async () => {
    const quote = await Quote.create({
      authorId: 1,
      content: 'Testing Content',
    })

    await QuoteTag.createMany([
      {
        quoteId: quote.id,
        tagId: 1,
      },
      {
        quoteId: quote.id,
        tagId: 2,
      },
    ])
  })
})
