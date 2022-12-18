import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Quote from 'App/Models/Quote'
import Tag from 'App/Models/Tag'
import { createOrder, createPagination, createSearch } from 'Utils/request'

export default class QuotesController {
  public async index({ request, route, view }: HttpContextContract) {
    const quotes = await Quote.query()
      .preload('author')
      .preload('tags', (builder) => {
        builder.preload('tag')
      })
      .where((builder) => createSearch(request, builder, Quote.searchableColumns))
      .orderBy(...createOrder(request, Quote.sortableColumns))
      .paginate(...createPagination(request))

    quotes.baseUrl(route?.pattern ?? '')

    return view.render('pages/quotes/index', { quotes })
  }

  public async create({ view }: HttpContextContract) {
    const tags = await Tag.all()

    return view.render('pages/quotes/create', { tags })
  }

  public async edit({ params, view }: HttpContextContract) {
    const quote = await Quote.findOrFail(params.id)

    const tags = await Tag.all()

    await quote.load('author')
    await quote.load('tags', (builder) => {
      builder.preload('tag')
    })

    const filteredTags = tags.filter((tag) => {
      return !quote.tags.some((quoteTag) => quoteTag.tagId === tag.id)
    })

    return view.render('pages/quotes/edit', { quote, tags: filteredTags })
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.all()

    console.log(data)

    return response.redirect().toRoute('quotes.index')
  }

  public async update({ params, request, response }: HttpContextContract) {}

  public async destroy({ params, response }: HttpContextContract) {}
}
