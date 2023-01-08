import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AuthorsAddDeletedAts extends BaseSchema {
  protected tableName = 'authors'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('deleted_at')
    })
  }
}
