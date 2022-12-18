import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import { createOrder, createPagination, createSearch } from 'Utils/request'

export default class TagsController {
  public async index({ request, route, view }: HttpContextContract) {
    const tags = await Tag.query()
      .where((builder) => createSearch(request, builder, Tag.searchableColumns))
      .orderBy(...createOrder(request, Tag.sortableColumns))
      .paginate(...createPagination(request))

    tags.baseUrl(route?.pattern ?? '')

    return view.render('pages/tags/index', { tags })
  }

  public async create({ view }: HttpContextContract) {}

  public async edit({ params, view }: HttpContextContract) {
    const tag = await Tag.findOrFail(params.id)

    return view.render('pages/tags/edit', { tag })
  }

  public async store({ request, response }: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {}
}
