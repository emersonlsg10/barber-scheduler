'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

// User blueprint
Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    slug: 'emerson-barber-' + (Math.random() * (100 - 1) + 1),
    phone: faker.phone(),
    cpf: faker.cpf(),
    city: faker.city(),
    state: faker.state(),
    group: 3,
    password: '123456'
  }
})

// Service blueprint
Factory.blueprint('App/Models/Service', async (faker) => {
  return {
    name: faker.name(),
    price: 15.0,
    time: 30.0,
    company_id: 1,
  }
})
