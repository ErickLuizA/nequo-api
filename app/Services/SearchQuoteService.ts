import { RequestContract } from '@ioc:Adonis/Core/Request'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Quote from 'App/Models/Quote'

export default class SearchQuoteService {
  constructor(private readonly request: RequestContract) {}

  public async execute(): Promise<ModelQueryBuilderContract<typeof Quote, Quote>> {
    try {
      const queryString = this.request.qs()

      const quotes = Quote.query()
        .preload('author')
        .preload('tags', (builder) => {
          builder.preload('tag')
        })

      if (queryString.q) {
        quotes.andWhere('content', 'like', `%${queryString.q}%`)
      }

      if (queryString.authors) {
        quotes.andWhereIn('author_id', queryString.authors.split(','))
      }

      if (queryString.tags) {
        quotes.andWhereHas('tags', (builder) => {
          builder.whereIn('tag_id', queryString.tags.split(','))
        })
      }

      return quotes
    } catch (error) {
      throw new Error('Error while searching quotes')
    }
  }
}
