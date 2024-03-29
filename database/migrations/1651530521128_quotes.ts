import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Quotes extends BaseSchema {
  protected tableName = 'quotes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.text('content').unique().notNullable()

      table.string('author').notNullable()
      table.string('author_slug').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
