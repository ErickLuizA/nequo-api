import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class QuoteTags extends BaseSchema {
  protected tableName = 'quote_tags'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('quote_id').unsigned().notNullable()
      table.foreign('quote_id').references('id').inTable('quotes')

      table.integer('tag_id').unsigned().notNullable()
      table.foreign('tag_id').references('id').inTable('tags')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
