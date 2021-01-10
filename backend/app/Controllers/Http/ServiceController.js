"use strict";
const Service = use("App/Models/Service");
const Company = use("App/Models/Company");
const formatResponse = require("../../appUtils/formatResponse");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const { page, per_page } = request.all();
    const services = await Service.query().paginate(page, per_page);
    return formatResponse({
      response,
      status: 200,
      msg: "Consulta realizada com sucesso.",
      total: 1,
      data: services,
    });
  }

  /**
   * Create/save a new service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { name, price, time } = request.all();
    const service = new Service();
    service.name = name;
    service.price = price;
    service.time = time;
    service.company_id = auth.user.id;

    try {
      await service.save();
      return formatResponse({
        response,
        status: 200,
        msg: "Serviço cadastrado com sucesso!",
        total: 1,
        data: service,
      });
    } catch (err) {
      return formatResponse({
        response,
        status: 402,
        msg: "Falha ao cadastrar.",
        total: 1,
        data: null,
      });
    }
  }

  /**
   * Display a single service.
   * GET services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const slug = params.id;
    try {
      const company = await Company.query().where("slug", slug).first();
      if (!company) throw "Estabelecimento não encontrado!";

      const services = await Service.query()
        .where("company_id", company.id)
        .fetch();
      return formatResponse({
        response,
        status: 200,
        msg: services
          ? "Consulta realizada com sucesso."
          : "Usuário não encontrado.",
        total: 1,
        data: services,
      });
    } catch (err) {
      return formatResponse({
        response,
        status: 402,
        msg: err,
        total: 1,
        data: null,
      });
    }
  }

  /**
   * Update service details.
   * PUT or PATCH services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const { name, price, time } = request.all();
    const service = new Service();
    service.name = name;
    service.price = price;
    service.time = time;
    service.company_id = auth.user.id;

    try {
      await Service.query().where("id", params.id).update(service);

      return formatResponse({
        response,
        status: 200,
        msg: "Cadastro atualizado com sucesso.",
        total: 1,
        data: service,
      });
    } catch (err) {
      return formatResponse({
        response,
        status: 402,
        msg: "Falha ao atualizar.",
        total: 1,
        data: null,
      });
    }
  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const service = await Service.find(id);

    try {
      await service.delete();

      return formatResponse({
        response,
        status: 201,
        msg: "Serviço deletado com sucesso.",
        total: 1,
        data: service,
      });
    } catch (err) {
      return formatResponse({
        response,
        status: 402,
        msg: "Falha ao deletar.",
        total: 1,
        data: null,
      });
    }
  }
}

module.exports = ServiceController;
