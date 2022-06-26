import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class QuotesUpdateAddAuthorIds extends BaseSchema {
  protected tableName = 'quotes'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('author_id').unsigned().notNullable()
      table.foreign('author_id').references('id').inTable('authors')

      table.dropColumn('author')
      table.dropColumn('author_slug')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('author_id')
      table.dropColumn('author_id')

      table.string('author').notNullable().defaultTo('')
      table.string('author_slug').notNullable().defaultTo('')
    })
  }
}
