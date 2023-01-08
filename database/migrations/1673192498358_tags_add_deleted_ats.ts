import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TagsAddDeletedAts extends BaseSchema {
  protected tableName = 'tags'

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
