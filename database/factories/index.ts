import Factory from '@ioc:Adonis/Lucid/Factory'
import Author from 'App/Models/Author'
import Quote from 'App/Models/Quote'
import Crypto from 'node:crypto'

export const AuthorFactory = Factory.define(Author, ({ faker }) => {
  const name = faker.name.firstName() + Crypto.randomUUID().slice(0, 4)

  return { name, slug: name, bio: faker.lorem.paragraph() }
})
  .relation('quotes', () => QuoteFactory)
  .build()

export const QuoteFactory = Factory.define(Quote, ({ faker }) => ({
  content: faker.lorem.paragraph(),
}))
  .relation('author', () => AuthorFactory)
  .build()
