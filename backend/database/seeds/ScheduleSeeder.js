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

class ScheduleSeeder {
  async run () {
    const scheduleArray = await Factory
      .model('App/Models/Schedule')
      .createMany(5)
  }
}

module.exports = ScheduleSeeder
