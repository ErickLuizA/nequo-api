import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QuoteTag from 'App/Models/QuoteTag'
import Tag from 'App/Models/Tag'
import { orderRequest } from 'Utils/request'

export default class TagsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const tags = await Tag.query()
        .orderBy(orderRequest(request))
        .paginate(request.input('page', 1), request.input('per_page', 20))

      return response.status(200).json(tags)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const tag = await Tag.findOrFail(params.id)

      return response.status(200).json(tag)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async quotes({ params, response, request }: HttpContextContract) {
    try {
      const tag = await QuoteTag.query()
        .where('tag_id', params.id)
        .preload('quote', (builder) => {
          builder.preload('author')
        })
        .preload('tag')
        .orderBy(orderRequest(request))
        .paginate(request.input('page', 1), request.input('per_page', 20))

      return response.status(200).json(tag)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
