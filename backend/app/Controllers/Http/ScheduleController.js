'use strict'
const Schedule = use('App/Models/Schedule')
const formatResponse = require('../../appUtils/formatResponse');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with schedules
 */
class ScheduleController {
  /**
   * Show a list of all schedules.
   * GET schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const { date, page, per_page } = request.all();
    const schedules = await Schedule.query().where('date', date).paginate(page, per_page);
    return formatResponse({
      response,
      status: 200,
      msg: 'Consulta realizada com sucesso.',
      total: 1,
      data: schedules,
    })
  }

  /**
   * Create/save a new service.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { date, schedule, service_id, client_id, total_time, total_value } = request.all();
    const scheduleObj = new Schedule();
    scheduleObj.date = date;
    scheduleObj.schedule = schedule;
    scheduleObj.service_id = JSON.stringify(service_id);
    
    scheduleObj.total_time = total_time;
    scheduleObj.total_value = total_value;
    scheduleObj.client_id = auth.user.id;

    try {
      await scheduleObj.save()
      return formatResponse({
        response,
        status: 200,
        msg: 'Reserva feita com sucesso!',
        total: 1,
        data: scheduleObj,
      })
    } catch (err) {
      return formatResponse({
        response,
        status: 402,
        msg: 'Falha ao cadastrar.',
        total: 1,
        data: null,
      })
    }
  }

  /**
   * Display a single service.
   * GET schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ request, response }) {
    const { date, schedule} = request.all();
    const schedules = await Schedule.query().where('date', date).where('schedule', schedule).fetch();
    return formatResponse({
      response,
      status: 200,
      msg: schedules ? 'Consulta realizada com sucesso.' : 'Usuário não encontrado.',
      total: 1,
      data: schedules,
    })
  }

  /**
   * Update service details.
   * PUT or PATCH schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const { date, schedule, service_id, client_id, total_time, total_value } = request.all();
    const scheduleObj = new Schedule();
    scheduleObj.date = date;
    scheduleObj.schedule = schedule;
    scheduleObj.service_id = JSON.stringify(service_id);
    
    scheduleObj.total_time = total_time;
    scheduleObj.total_value = total_value;
    scheduleObj.client_id = auth.user.id;

    try {
      await Schedule.query()
        .where('id', params.id)
        .update(scheduleObj);

      return formatResponse({
        response,
        status: 200,
        msg: 'Cadastro atualizado com sucesso.',
        total: 1,
        data: scheduleObj,
      })
    } catch (err) {
      return formatResponse({
        response,
        status: 402,
        msg: 'Falha ao atualizar.',
        total: 1,
        data: null,
      })
    }
  }

  /**
   * Delete a service with id.
   * DELETE schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const schedule = await Schedule.find(id);

    try {
      await schedule.delete()

      return formatResponse({
        response,
        status: 201,
        msg: 'Cadastro deletado com sucesso.',
        total: 1,
        data: schedule,
      })
    } catch (err) {
      return formatResponse({
        response,
        status: 402,
        msg: 'Falha ao deletar.',
        total: 1,
        data: null,
      })
    }
  }
}

module.exports = ScheduleController
