'use strict'
const formatResponse = require('../../appUtils/formatResponse');

class AuthController {
    async login({ auth, request }) {
        const { uid, password } = request.all()
        return await auth.withRefreshToken().attempt(uid, password)
    }

    async show({ auth, response }) {
        return await formatResponse({
            response,
            status: 200,
            msg: 'Usuário encontrado',
            total: 1,
            data: auth.user,
        })
    }
}

module.exports = AuthController
