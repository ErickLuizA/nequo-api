import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import QuoteTag from 'App/Models/QuoteTag'
import Tag from 'App/Models/Tag'
import { AuthorFactory, QuoteFactory } from 'Database/factories'

const TAGS = [
  'funny',
  'sad',
  'wisdom',
  'inspirational',
  'educational',
  'life',
  'love',
  'motivational',
]

export default class Seeder extends BaseSeeder {
  public async run() {
    const tags = await Tag.createMany(TAGS.map((name) => ({ name, slug: name })))

    const authors = await AuthorFactory.createMany(20)

    const quotes = await QuoteFactory.createMany(100, (model) => {
      const author = authors[Math.floor(Math.random() * authors.length)] ?? authors[0]

      model.authorId = author.id
    })

    const quoteTags = quotes.map((quote) => {
      const tag = tags[Math.floor(Math.random() * tags.length)] ?? tags[0]

      return { quoteId: quote.id, tagId: tag.id }
    })

    await QuoteTag.createMany(quoteTags)
  }
}
