/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', async () => {
      return { message: 'Hello World!' }
    }).as('hello_world')

    Route.get('/quotes/quote_of_the_day', 'QuotesController.quoteOfTheDay').as(
      'quotes.quote_of_the_day'
    )

    Route.get('/quotes/random', 'QuotesController.random').as('quotes.random')

    Route.get('/quotes/search', 'QuotesController.search').as('quotes.search')

    Route.resource('/quotes', 'QuotesController').only(['index', 'show'])

    Route.get('/authors/:id/quotes', 'AuthorsController.quotes').as('authors.quotes')

    Route.resource('/authors', 'AuthorsController').only(['index', 'show'])

    Route.get('/tags/:id/quotes', 'TagsController.quotes').as('tags.quotes')

    Route.resource('/tags', 'TagsController').only(['index', 'show'])
  }).prefix('v1')
})
  .prefix('api')
  .as('api')

Route.get('/', async ({ view }) => {
  return view.render('pages/home')
})

Route.resource('/quotes', 'QuotesController').only(['index', 'show', 'create', 'edit', 'destroy'])

Route.get('/authors', async ({ view }) => {
  return view.render('pages/authors/index')
})

Route.get('/tags', async ({ view }) => {
  return view.render('pages/tags/index')
})
