import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Author from 'App/Models/Author'
import { createOrder, createPagination, createSearch } from 'Utils/request'

export default class AuthorsController {
  public async index({ request, response }: HttpContextContract) {
    const authors = await Author.query()
      .where((builder) => createSearch(request, builder, Author.searchableColumns))
      .orderBy(...createOrder(request, Author.sortableColumns))
      .paginate(...createPagination(request))

    return response.status(200).json(authors)
  }

  public async show({ params, response }: HttpContextContract) {
    const author = await Author.findOrFail(params.id)

    return response.status(200).json(author)
  }

  public async quotes({ params, response }: HttpContextContract) {
    const author = await Author.findOrFail(params.id)

    await author?.load('quotes', (builder) => {
      builder.preload('tags', (tagsBuilder) => {
        tagsBuilder.preload('tag')
      })
    })

    return response.status(200).json(author)
  }
}
