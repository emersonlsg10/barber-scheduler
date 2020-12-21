'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up() {
    this.create('services', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.float('price').notNullable()
      table.float('time').notNullable()
      table.integer('company_id').unsigned()
      table.foreign('company_id').references('users.id')
      table.timestamps()
    })
  }

  down() {
    this.drop('services')
  }
}

module.exports = ServiceSchema
