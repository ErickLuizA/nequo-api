import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Author from './Author'
import QuoteTag from './QuoteTag'

export default class Quote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public authorId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Author)
  public author: BelongsTo<typeof Author>

  @hasMany(() => QuoteTag)
  public tags: HasMany<typeof QuoteTag>
}
