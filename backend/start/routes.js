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

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('oauth/refresh', 'AuthController.refresh')
  Route.post('register', 'ClientController.store')
}).prefix('api/v1').middleware(['guest'])

Route.group(() => {
  Route.get('user', 'ClientController.show');
  Route.resource('users', 'UserController');
  Route.resource('services', 'ServiceController');
  Route.resource('schedules', 'ScheduleController');
  Route.resource('company', 'CompanyController');
}).prefix('api/v1').middleware(['auth'])