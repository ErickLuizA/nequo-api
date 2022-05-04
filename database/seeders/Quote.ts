import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Quote from 'App/Models/Quote'
import QuoteOfTheDay from 'App/Models/QuoteOfTheDay'
import { slugify } from 'Utils/slugify'
import quotes from '../../data/quotes.json'

export default class QuoteSeeder extends BaseSeeder {
  public async run() {
    const result = await Quote.createMany(
      quotes.map((quote) => ({
        author: quote.author,
        content: quote.content,
        authorSlug: slugify(quote.author),
      }))
    )

    await QuoteOfTheDay.create({
      quoteId: result[0].id,
    })
  }
}
