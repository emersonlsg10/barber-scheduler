'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('slug', 80).nullable().unique()
      table.enu('theme', ['dark', 'light']).defaultTo('dark')
      table.json('hours_per_day').nullable()
      table.integer('razao').notNullable()
      table.integer('per_schedule').notNullable()
      table.json('days').nullable()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
