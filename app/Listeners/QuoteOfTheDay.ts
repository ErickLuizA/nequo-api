import { EventsList } from '@ioc:Adonis/Core/Event'
import Quote from 'App/Models/Quote'
import QuoteOfTheDayModel from 'App/Models/QuoteOfTheDay'

export default class QuoteOfTheDay {
  public async onNewQuoteOfTheDay(quote: EventsList['new:quote_of_the_day']) {
    if (!quote || quote.isNotToday()) {
      const newQuote = await Quote.query()
        .whereNotIn('id', (query) => {
          query.select('quote_id').from('quote_of_the_days')
        })
        .orderByRaw('RANDOM()')
        .first()

      if (newQuote) {
        QuoteOfTheDayModel.create({ quoteId: newQuote.id })
      }
    }
  }
}
