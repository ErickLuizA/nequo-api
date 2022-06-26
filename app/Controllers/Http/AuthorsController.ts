import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Author from 'App/Models/Author'
import { orderRequest } from 'Utils/request'

export default class AuthorsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const authors = await Author.query()
        .orderBy(orderRequest(request))
        .paginate(request.input('page', 1), request.input('per_page', 20))

      return response.status(200).json(authors)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const author = await Author.findOrFail(params.id)

      return response.status(200).json(author)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  public async quotes({ params, response }: HttpContextContract) {
    try {
      const author = await Author.findOrFail(params.id)

      await author?.load('quotes', (builder) => {
        builder.preload('tags', (tagsBuilder) => {
          tagsBuilder.preload('tag')
        })
      })

      return response.status(200).json(author)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
