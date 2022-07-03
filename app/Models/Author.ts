import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { slugify } from 'Utils/slugify'
import Quote from './Quote'

export default class Author extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({
    prepare: (value) => slugify(value),
  })
  public slug: string

  @column()
  public bio: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Quote)
  public quotes: HasMany<typeof Quote>

  public static sortableColumns: string[] = ['id', 'name', 'slug', 'created_at', 'updated_at']

  public static searchableColumns: string[] = ['name', 'slug', 'bio']
}
