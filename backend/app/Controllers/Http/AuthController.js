'use strict'
const formatResponse = require('../../appUtils/formatResponse');

class AuthController {
    
    async login({ auth, request, response }) {
        const { uid, password } = request.all();

        try {
            const responseAuth = await auth.withRefreshToken().attempt(uid, password);
            return responseAuth;
        } catch (err) {
            return formatResponse({
                response,
                status: 401,
                msg: 'Email ou senha inválida! Tente novamente.',
                total: 1,
                data: null,
            })
        }

    }

    async refresh({ auth, request }) {
        const refreshToken = request.input('refresh_token')
        return await auth.generateForRefreshToken(refreshToken)
    }

}

module.exports = AuthController
