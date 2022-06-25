import Factory from '@ioc:Adonis/Lucid/Factory'
import Author from 'App/Models/Author'
import Quote from 'App/Models/Quote'
import QuoteTag from 'App/Models/QuoteTag'
import Tag from 'App/Models/Tag'
import Crypto from 'node:crypto'

export const AuthorFactory = Factory.define(Author, ({ faker }) => {
  const name = faker.name.firstName() + Crypto.randomUUID().slice(0, 4)

  return { name, slug: name }
})
  .relation('quotes', () => QuoteFactory)
  .build()

export const TagFactory = Factory.define(Tag, ({ faker }) => {
  const name = faker.random.word() + Crypto.randomUUID().slice(0, 4)

  return { name, slug: name }
}).build()

export const QuoteFactory = Factory.define(Quote, ({ faker }) => ({
  content: faker.lorem.paragraph(),
}))
  .relation('author', () => AuthorFactory)
  .relation('tags', () => QuoteTagFactory)
  .build()

export const QuoteTagFactory = Factory.define(QuoteTag, () => ({}))
  .relation('quote', () => QuoteFactory)
  .relation('tag', () => TagFactory)
  .build()
