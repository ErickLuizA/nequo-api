import { test } from '@japa/runner'
import SearchQuoteService from 'App/Services/SearchQuoteService'

test.group('Search Quote', (group) => {
  let searchQuoteService: SearchQuoteService

  group.setup(async () => {
    searchQuoteService = new SearchQuoteService()
  })

  test('should search a quote by content', async ({ assert }) => {
    const response = await searchQuoteService.execute({ q: 'tempora' })

    response.forEach((quote) => {
      assert.equal(quote.content.includes('tempora'), true)
    })
  })

  test('should search a quote by author', async ({ assert }) => {
    const response = await searchQuoteService.execute({ authors: '10' })

    response.forEach((quote) => {
      assert.deepEqual(quote.author.id, 10)
    })
  })

  test('should search a quote by tag', async ({ assert }) => {
    const response = await searchQuoteService.execute({ tags: '20' })

    response.forEach((quote) => {
      assert.isTrue(quote.tags.some((tag) => tag.id === 20))
    })
  })
})
