export default {
    namespaced: true,
    state: () => ({
        user: null,
        token: null
    }),
    mutations: {
        ['SET_USER'](state, user) {
            state.user = user
        },
        ['SET_TOKEN'](state, token) {
            state.token = token
        }
    },
    actions: {},
    getters: {
        getUser: state => {
            return state.user
        },
        loggedIn: state => {
            return state.user && !!state.token
        },
        getToken: state => {
            return state.token
        }
    }
}
