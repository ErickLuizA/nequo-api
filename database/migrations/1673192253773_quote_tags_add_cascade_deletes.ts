import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class QuoteTagsAddCascadeDeletes extends BaseSchema {
  protected tableName = 'quote_tags'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('quote_id')
      table.dropForeign('tag_id')

      table.foreign('quote_id').references('id').inTable('quotes').onDelete('CASCADE')
      table.foreign('tag_id').references('id').inTable('tags').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('quote_id')
      table.dropForeign('tag_id')

      table.foreign('quote_id').references('id').inTable('quotes')
      table.foreign('tag_id').references('id').inTable('tags')
    })
  }
}
