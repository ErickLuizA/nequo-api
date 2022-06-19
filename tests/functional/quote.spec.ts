import { test } from '@japa/runner'
import QuoteOfTheDay from 'App/Models/QuoteOfTheDay'
import { DateTime } from 'luxon'

const quoteProperties = ['id', 'content', 'author', 'author_slug', 'created_at', 'updated_at']
const quoteOfTheDayProperties = ['id', 'quote_id', 'created_at', 'updated_at']

test.group('Quotes', () => {
  test('should get paginated quotes', async ({ client, assert }) => {
    const response = await client.get(`/api/v1/quotes?page=2&per_page=10`)

    assert.properties(response.body().data[0], quoteProperties)
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

  test('should get quotes by author', async ({ client, assert }) => {
    const response = await client.get(`/api/v1/quotes/author/richard-feynman`)

    assert.properties(response.body().data[0], quoteProperties)
    response.assertStatus(200)
    response.assertBodyContains({
      meta: {},
      data: [],
    })
  })
})
