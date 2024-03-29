import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Quote from './Quote'

export default class QuoteOfTheDay extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quoteId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Quote)
  public quote: BelongsTo<typeof Quote>

  public isNotToday(): boolean {
    return this.createdAt.toISODate() !== DateTime.local().toISODate()
  }
}
