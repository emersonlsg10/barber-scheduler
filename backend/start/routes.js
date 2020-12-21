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
  .post('login', 'AuthController.login')
  .prefix('api/v1')
  .middleware('guest')

Route.group(() => {

  Route.get('user', 'AuthController.show');

  Route.resource('users', 'UserController');

  Route.resource('services', 'ServiceController');
  
}).prefix('api/v1').middleware(['auth'])