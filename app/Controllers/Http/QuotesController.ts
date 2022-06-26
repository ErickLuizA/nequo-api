import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Quote from 'App/Models/Quote'
import QuoteOfTheDay from 'App/Models/QuoteOfTheDay'
import SearchQuoteService from 'App/Services/SearchQuoteService'
import { orderRequest } from 'Utils/request'

export default class QuotesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const quotes = await Quote.query()
        .preload('author')
        .preload('tags', (builder) => {
          builder.preload('tag')
        })
        .orderBy(orderRequest(request))
        .paginate(request.input('page', 1), request.input('per_page', 20))

      return response.status(200).json(quotes)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const quote = await Quote.findOrFail(params.id)

      await quote.load('author')

      await quote.load('tags', (builder) => {
        builder.preload('tag')
      })

      return response.status(200).json(quote)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async quoteOfTheDay({ response }: HttpContextContract) {
    try {
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
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async random({ response }: HttpContextContract) {
    try {
      const quote = await Quote.query()
        .preload('author')
        .preload('tags', (builder) => {
          builder.preload('tag')
        })
        .orderByRaw('RANDOM()')
        .first()

      return response.status(200).json(quote)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async search({ response, request }: HttpContextContract) {
    try {
      const searchQuoteService = new SearchQuoteService()

      const quotes = await searchQuoteService.execute(request.qs())

      return response.status(200).json(quotes)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
