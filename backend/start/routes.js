'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route
  .post('login', 'UserController.login')
  .prefix('api/v1')
  .middleware('guest')

// Route
//   .get('users/:id', 'UserController.show')
//   .middleware('auth')

Route.group(() => {
  Route.resource('users', 'UserController')
}).prefix('api/v1').middleware(['auth'])