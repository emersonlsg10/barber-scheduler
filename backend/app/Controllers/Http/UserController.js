'use strict'
const User = use('App/Models/User')
const formatResponse = require('../../appUtils/formatResponse');

class UserController {

    async index({ response, request }) {
        const { page, per_page } = request.all();
        const users = await User.query().paginate(page, per_page);
        return formatResponse({
            response,
            status: 200,
            msg: 'Consulta realizada com sucesso.',
            total: 1,
            data: users,
        })
    }

    async show({ response, params }) {
        const user = await User.query().where('slug', params.id).first();
        return formatResponse({
            response,
            status: 200,
            msg: user ? 'Consulta realizada com sucesso.' : 'Usuário não encontrado.',
            total: 1,
            data: user,
        })
    }

    async store({ response, request }) {
        const { username, email, slug, phone, cpf, city, state, group, password } = request.all();
        const user = new User();
        user.username = username;
        user.email = email;
        user.slug = slug;
        user.phone = phone;
        user.cpf = cpf;
        user.city = city;
        user.state = state;
        user.group = group;
        user.password = password;

        try {
            await user.save()
            return formatResponse({
                response,
                status: 200,
                msg: 'Cadastro realizado com sucesso.',
                total: 1,
                data: user,
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

    async update({ params, request, response }) {
        const { username, email, slug, phone, cpf, city, state, group, password } = request.all();
        const user = new User();
        user.username = username;
        user.email = email;
        user.slug = slug;
        user.phone = phone;
        user.cpf = cpf;
        user.city = city;
        user.state = state;
        user.group = group;
        user.password = password;

        try {
            await User.query()
                .where('id', params.id)
                .update(user);

            return formatResponse({
                response,
                status: 200,
                msg: 'Cadastro atualizado com sucesso.',
                total: 1,
                data: user,
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

    async destroy({ params, request, response }) {
        const { id } = params;
        const user = await User.find(id);

        try {
            await user.delete()

            return formatResponse({
                response,
                status: 201,
                msg: 'Cadastro deletado com sucesso.',
                total: 1,
                data: user,
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

module.exports = UserController
