import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/quotes/quote_of_the_day', 'QuotesController.quoteOfTheDay').as(
      'quotes.quote_of_the_day'
    )

    Route.get('/quotes/random', 'QuotesController.random').as('quotes.random')

    Route.get('/quotes/search', 'QuotesController.search').as('quotes.search')

    Route.resource('/quotes', 'QuotesController').apiOnly()

    Route.get('/authors/:id/quotes', 'AuthorsController.quotes').as('authors.quotes')

    Route.resource('/authors', 'AuthorsController').apiOnly()

    Route.get('/tags/:id/quotes', 'TagsController.quotes').as('tags.quotes')

    Route.resource('/tags', 'TagsController').apiOnly()
  }).prefix('v1')
})
  .prefix('api')
  .as('api')
  .namespace('App/Controllers/Http/Api')
