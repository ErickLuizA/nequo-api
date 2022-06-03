import Event from '@ioc:Adonis/Core/Event'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Quote from 'App/Models/Quote'
import QuoteOfTheDay from 'App/Models/QuoteOfTheDay'
import { slugify } from 'Utils/slugify'

export default class QuotesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const quotes = await Quote.query().paginate(
        request.input('page', 1),
        request.input('per_page', 20)
      )

      return response.status(200).json(quotes)
    } catch (error) {
      return response.json({ error: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const quote = await Quote.findOrFail(params.id)

      return response.status(200).json(quote)
    } catch (error) {
      return response.json({ error: error.message })
    }
  }

  public async quoteOfTheDay({ response }: HttpContextContract) {
    try {
      const quote = await QuoteOfTheDay.query().orderBy('created_at', 'desc').first()

      await quote?.load('quote')

      Event.emit('new:quote_of_the_day', quote)

      return response.status(200).json(quote)
    } catch (error) {
      return response.json({ error: error.message })
    }
  }

  public async random({ response }: HttpContextContract) {
    try {
      const quote = await Quote.query().orderByRaw('RANDOM()').first()

      return response.status(200).json(quote)
    } catch (error) {
      return response.json({ error: error.message })
    }
  }

  public async author({ params, request, response }: HttpContextContract) {
    try {
      const quotes = await Quote.query()
        .where('author_slug', 'LIKE', `%${slugify(params.author)}%`)
        .paginate(request.input('page', 1), request.input('perPage', 20))

      return response.status(200).json(quotes)
    } catch (error) {
      return response.json({ error: error.message })
    }
  }
}
