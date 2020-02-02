export const strict = false
const auth = require('./auth')
const config = require('./config')

export const actions = {
    async nuxtServerInit({commit, state}, {app}) {
        let res = await app.$graph["configs"]({})
        commit('config/FETCH_CONFIG', res.data['configs'])
    }
}

export const modules = {
    auth,
    config
}
