'use strict'

const formatResponse = require('../../appUtils/formatResponse');

class UserController {

    async login({ auth, request }) {
        const { uid, password } = request.all()
        return await auth.withRefreshToken().attempt(uid, password)
    }

    index({ auth, response }) {
        return formatResponse({
            response,
            status: 200,
            msg: 'Usuário encontrado',
            total: 1,
            data: auth.user,
        })
    }

    show({ auth, params, response }) {
        if (auth.user.id !== Number(params.id)) {
            return formatResponse({
                response,
                status: 404,
                msg: 'Usuário não encontrado',
                total: 0,
                data: [],
            })
        }
        return formatResponse({
            response,
            status: 200,
            msg: 'Usuário encontrado',
            total: 1,
            data: auth.user,
        })
    }
}

module.exports = UserController
