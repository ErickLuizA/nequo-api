import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Quote from 'App/Models/Quote'
import QuoteOfTheDay from 'App/Models/QuoteOfTheDay'
import SearchQuoteService from 'App/Services/SearchQuoteService'
import { createOrder, createPagination, createSearch } from 'Utils/request'

export default class QuotesController {
  public async index({ request, response }: HttpContextContract) {
    const quotes = await Quote.query()
      .preload('author')
      .preload('tags', (builder) => {
        builder.preload('tag')
      })
      .where((builder) => createSearch(request, builder, Quote.searchableColumns))
      .orderBy(...createOrder(request, Quote.sortableColumns))
      .paginate(...createPagination(request))

    return response.status(200).json(quotes)
  }

  public async show({ params, response }: HttpContextContract) {
    const quote = await Quote.findOrFail(params.id)

    await quote.load('author')

    await quote.load('tags', (builder) => {
      builder.preload('tag')
    })

    return response.status(200).json(quote)
  }

  public async quoteOfTheDay({ response }: HttpContextContract) {
    let quoteOfTheDay = await QuoteOfTheDay.query().orderBy('created_at', 'desc').first()

    if (!quoteOfTheDay || quoteOfTheDay?.isNotToday()) {
      const newQuote = await Quote.query()
        .whereNotIn('id', (query) => {
          query.select('quote_id').from('quote_of_the_days')
        })
        .orderByRaw('RANDOM()')
        .first()

      if (newQuote) {
        quoteOfTheDay = await QuoteOfTheDay.create({ quoteId: newQuote.id })
      }
    }

    await quoteOfTheDay?.load('quote', (builder) => {
      builder.preload('author')
      builder.preload('tags', (tagsBuilder) => {
        tagsBuilder.preload('tag')
      })
    })

    return response.status(200).json(quoteOfTheDay)
  }

  public async random({ response }: HttpContextContract) {
    const quote = await Quote.query()
      .preload('author')
      .preload('tags', (builder) => {
        builder.preload('tag')
      })
      .orderByRaw('RANDOM()')
      .first()

    return response.status(200).json(quote)
  }

  public async search({ response, request }: HttpContextContract) {
    const searchQuoteService = new SearchQuoteService()

    const quotes = await searchQuoteService.execute(request.qs())

    return response.status(200).json(quotes)
  }
}
