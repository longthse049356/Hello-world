export default {
    namespaced: true,
    state: () => ({
        config: null
    }),
    mutations: {
        ['FETCH_CONFIG'](state, config) {
            state.config = config
        },
    },
    getters: {
        getConfig: state => {
            return state.config
        },
        getCT: state => {
            return (model, app_label) => {
                let out = state.config.content_type.filter(x => x.model === model && x.app_label === app_label)
                if (out.length) {
                    return out[0].id
                }
                return 0
            }
        }
    }
}
