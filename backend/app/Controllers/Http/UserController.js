'use strict'

class UserController {

    async login({ auth, request }) {
        const { uid, password } = request.all()
        return await auth.withRefreshToken().attempt(uid, password)
    }

    show({ auth, params }) {
        if (auth.user.id !== Number(params.id)) {
            return "You cannot see someone else's profile"
        }
        return auth.user
    }
}

module.exports = UserController
