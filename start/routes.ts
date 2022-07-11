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
    })

    Route.get('/quotes/quote_of_the_day', 'QuotesController.quoteOfTheDay')

    Route.get('/quotes/random', 'QuotesController.random')

    Route.get('/quotes/search', 'QuotesController.search')

    Route.resource('/quotes', 'QuotesController').only(['index', 'show'])

    Route.get('/authors/:id/quotes', 'AuthorsController.quotes')

    Route.resource('/authors', 'AuthorsController').only(['index', 'show'])

    Route.get('/tags/:id/quotes', 'TagsController.quotes')

    Route.resource('/tags', 'TagsController').only(['index', 'show'])
  }).prefix('v1')
}).prefix('api')

Route.get('/', async ({ view }) => {
  return view.render('pages/home')
})

Route.get('/quotes', async ({ view }) => {
  return view.render('pages/quotes')
})

Route.get('/authors', async ({ view }) => {
  return view.render('pages/authors')
})

Route.get('/tags', async ({ view }) => {
  return view.render('pages/tags')
})
