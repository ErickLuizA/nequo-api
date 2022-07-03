import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Quote from 'App/Models/Quote'

export default class SearchQuoteService {
  public async execute(
    queryString: Record<string, any>
  ): Promise<ModelQueryBuilderContract<typeof Quote, Quote>> {
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
  }
}
