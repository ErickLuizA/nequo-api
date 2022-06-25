import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { AuthorFactory } from 'Database/factories'

export default class AuthorSeeder extends BaseSeeder {
  public async run() {
    await AuthorFactory.with('quotes', 10, (quoteFactory) => {
      quoteFactory.with('tags', 3, (tagFactory) => {
        tagFactory.with('tag', 2)
      })
    }).createMany(10)
  }
}
