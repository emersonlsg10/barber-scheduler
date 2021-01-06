'use strict'
const User = use('App/Models/User')
const formatResponse = require('../../appUtils/formatResponse');

class ClientController {
    
    async show({ auth, response }) {
        return await formatResponse({
            response,
            status: 200,
            msg: 'Usuário encontrado',
            total: 1,
            data: auth.user,
        })
    }

    async store({ response, request }) {
        const { username, email, slug, phone, cpf, city, state, group, password } = request.all();

        const existsUser = await User.query().where('email', email).first();


        if (existsUser) {
            return formatResponse({
                response,
                status: 409,
                msg: 'Falha ao cadastrar: Esse email já foi cadastrado!',
                total: 1,
                data: null,
                error: {},
            })
        }

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
                status: 409,
                msg: 'Falha ao cadastrar.',
                total: 1,
                data: null,
                error: {},
            })
        }
    }
}

module.exports = ClientController
