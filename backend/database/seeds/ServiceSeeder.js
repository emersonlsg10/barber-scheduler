'use strict'

/*
|--------------------------------------------------------------------------
| ServiceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ServiceSeeder {
  async run () {
    const serviceArray = await Factory
      .model('App/Models/Service')
      .createMany(4)
  }
}

module.exports = ServiceSeeder
