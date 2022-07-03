import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QuoteTag from 'App/Models/QuoteTag'
import Tag from 'App/Models/Tag'
import { createOrder, createPagination, createSearch } from 'Utils/request'

export default class TagsController {
  public async index({ request, response }: HttpContextContract) {
    const tags = await Tag.query()
      .where((builder) => createSearch(request, builder, Tag.searchableColumns))
      .orderBy(...createOrder(request, Tag.sortableColumns))
      .paginate(...createPagination(request))

    return response.status(200).json(tags)
  }

  public async show({ params, response }: HttpContextContract) {
    const tag = await Tag.findOrFail(params.id)

    return response.status(200).json(tag)
  }

  public async quotes({ params, response, request }: HttpContextContract) {
    const tag = await QuoteTag.query()
      .where('tag_id', params.id)
      .preload('quote', (builder) => {
        builder.preload('author')
      })
      .preload('tag')
      .orderBy(...createOrder(request, QuoteTag.sortableColumns))
      .paginate(...createPagination(request))

    return response.status(200).json(tag)
  }
}
