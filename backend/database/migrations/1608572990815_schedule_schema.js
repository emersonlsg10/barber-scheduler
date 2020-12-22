'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up() {
    this.create('schedules', (table) => {
      table.increments()
      table.date('date').nullable()
      table.time('schedule').nullable()

      table.integer('service_id').unsigned()
      table.foreign('service_id').references('services.id')

      table.integer('client_id').unsigned()
      table.foreign('client_id').references('users.id')
      table.timestamps()
    })
  }

  down() {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema
