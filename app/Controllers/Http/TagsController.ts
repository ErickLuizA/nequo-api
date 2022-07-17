import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QuoteTag from 'App/Models/QuoteTag'
import Tag from 'App/Models/Tag'
import { createOrder, createPagination, createSearch, isApiRequest } from 'Utils/request'

export default class TagsController {
  public async index({ request, response, route, view }: HttpContextContract) {
    const tags = await Tag.query()
      .where((builder) => createSearch(request, builder, Tag.searchableColumns))
      .orderBy(...createOrder(request, Tag.sortableColumns))
      .paginate(...createPagination(request))

    if (isApiRequest(route)) {
      return response.status(200).json(tags)
    }

    tags.baseUrl(route?.pattern ?? '')

    return view.render('pages/tags/index', { tags })
  }

  public async edit({ params, view }: HttpContextContract) {
    const tag = await Tag.findOrFail(params.id)

    return view.render('pages/tags/edit', { tag })
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
