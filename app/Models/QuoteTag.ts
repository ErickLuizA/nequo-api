import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Quote from './Quote'
import Tag from './Tag'

export default class QuoteTag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quoteId: number

  @column()
  public tagId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Quote)
  public quote: BelongsTo<typeof Quote>

  @belongsTo(() => Tag)
  public tag: BelongsTo<typeof Tag>

  public static sortableColumns: string[] = ['id', 'quote_id', 'tag_id', 'created_at', 'updated_at']
}
