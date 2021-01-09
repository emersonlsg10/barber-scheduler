'use strict'

/*
|--------------------------------------------------------------------------
| ScheduleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CompanySeeder {
  async run () {
    const scheduleArray = await Factory
      .model('App/Models/Company')
      .create()
  }
}

module.exports = CompanySeeder
