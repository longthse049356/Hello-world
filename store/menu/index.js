export default {
    namespaced: true,
    state: () => ({
        items: [],
        openD: null,
        destination: {
            title: "Bạn muốn đi đâu?"
        }
    }),
    mutations: {
        ['SET_MENU'](state, value) {
            state.items = value
        },
        ['SET_DESTINATION'](state, value) {
            state.destination = value
        },
        ['OPEN_D'](state, value) {
            state.openD = value
        }
    },
    actions: {
        setMenu({commit}, value) {
            commit('SET_MENU', value)
        },
        setD({commit}, value) {
            commit('SET_DESTINATION', value)
        },
        openD({commit}, value) {
            commit('OPEN_D', value)
        }
    },
    getters: {
        getMenuItems: state => {
            return state.items
        }
    }
}
