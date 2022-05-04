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

    Route.get('/quotes/author/:author', 'QuotesController.author')

    Route.resource('/quotes', 'QuotesController').only(['index', 'show'])
  }).prefix('v1')
}).prefix('api')
