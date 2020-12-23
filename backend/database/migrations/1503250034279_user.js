'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable()
      table.string('slug', 80).nullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 254).notNullable()
      table.string('cpf', 254).notNullable()
      table.string('city', 254).notNullable()
      table.string('state', 254).notNullable()
      table.enu('group', [1, 2, 3]).defaultTo(3)
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
