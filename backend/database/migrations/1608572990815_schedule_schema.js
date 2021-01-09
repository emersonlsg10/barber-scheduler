'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up() {
    this.create('schedules', (table) => {
      table.increments()
      table.date('date').nullable()
      table.time('schedule').nullable()

      table.json('service_id').nullable()
      table.float('total_time').nullable()
      table.float('total_value').nullable()

      table.integer('client_id').unsigned()
      table.foreign('client_id').references('users.id')
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('companies.id')
      table.timestamps()
    })
  }

  down() {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema
