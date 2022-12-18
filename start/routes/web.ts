import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async ({ view }) => {
    return view.render('pages/home')
  })

  Route.resource('/quotes', 'QuotesController').except(['show'])
  Route.resource('/authors', 'AuthorsController').except(['show'])
  Route.resource('/tags', 'TagsController').except(['show'])
}).namespace('App/Controllers/Http/Web')
