/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Application from '@ioc:Adonis/Core/Application'
import Event from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'
import Database from '@ioc:Adonis/Lucid/Database'

Event.on('db:query', (query) => {
  if (Application.inProduction) {
    Logger.debug('Database', query)
  } else {
    Database.prettyPrint(query)
  }
})

Event.on('new:quote_of_the_day', 'QuoteOfTheDay.onNewQuoteOfTheDay')
