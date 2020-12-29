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
const moment = use('moment')

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

let tempHour = '07:00:00';
function generateSchedule(){
  const tempRazao = 90;
  tempHour = moment(tempHour, 'HH:mm:ss').add(tempRazao, 'minutes').format('HH:mm:ss');
  return tempHour;
};

const service_id = [
  {
    checked: true,
    id: 1,
    price: 10,
    time: 30
  },
  {
    checked: true,
    id: 1,
    price: 20,
    time: 60
  }         
];

// Schedule blueprint
Factory.blueprint('App/Models/Schedule', async (faker) => {
  return {
    date: new Date(),
    schedule: generateSchedule(),
    total_time: 60,
    total_value: 30,
    client_id: 3,
    service_id: JSON.stringify(service_id)
  }
})