import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Author from 'App/Models/Author'
import { createOrder, createPagination, createSearch } from 'Utils/request'

export default class AuthorsController {
  public async index({ request, route, view }: HttpContextContract) {
    const authors = await Author.query()
      .where((builder) => createSearch(request, builder, Author.searchableColumns))
      .orderBy(...createOrder(request, Author.sortableColumns))
      .paginate(...createPagination(request))

    authors.baseUrl(route?.pattern ?? '')

    return view.render('pages/authors/index', { authors })
  }

  public async create({ view }: HttpContextContract) {}

  public async edit({ params, view }: HttpContextContract) {
    const author = await Author.findOrFail(params.id)

    return view.render('pages/authors/edit', { author })
  }

  public async store({ request, response }: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {}
}
