import io from 'socket.io-client'

const MAX_RECONNECTION_ATTEMPTS = 10

const state = () => {
    return {
        socket: null,
        connected: false,
        reconnectAttempts: 0,
        notifies: [],
        message: null
    }
}

const mutations = {
    SET_CONNECTED: (state, connected) => {
        state.connected = connected
    },
    SET_SOCKET: (state, socket) => {
        state.socket = socket
    },
    SET_RECONNECT_ATTEMPTS(state, payload) {
        state.reconnectAttempts = payload
    },
    INCREASE_RECONNECT_ATTEMPTS(state) {
        state.reconnectAttempts++
    },
    ADD_MESSAGE(state, msg) {
        state.message = msg
    },
    ADD_NOTIFY(state, msg) {
        state.notifies.push(msg)
    }
}

const actions = {
    setConnected({commit}, connected) {
        commit('SET_CONNECTED', connected)
    },
    setSocket({commit, state}, socket) {
        if (state.socket) {
            state.socket.on('error', _ => {
            })
            state.socket.on('disconnect', _ => {
            })
            state.socket.close()
        }
        commit('SET_SOCKET', socket)
    },
    onMessage({commit}, message) {
        commit('ADD_MESSAGE', message)
    },
    onNotify({commit}, n) {
        commit('ADD_NOTIFY', n)
    },
    reconnect({commit, dispatch}) {
        commit('SET_CONNECTED', false)
        setTimeout(_ => {
            dispatch('socketConnect')
        }, 3000)
    },
    socketConnect({commit, rootState, dispatch, state}) {
        if (state.connected || state.reconnectAttempts > MAX_RECONNECTION_ATTEMPTS) return
        const token = rootState.auth.token
        const baseUri = process.env.SOCKET_URI
        if (rootState.auth.user) {
            const socket = io(`${baseUri}?token=${token}&userId=${rootState.auth.user.id}`, {
                reconnection: false,
                autoConnect: false
            })

            socket.open()

            commit('INCREASE_RECONNECT_ATTEMPTS')

            socket.on('connect', () => {
                commit('SET_CONNECTED', true)
                dispatch('setSocket', socket)
            })

            socket.on('connect_error', _ => {
                dispatch('reconnect')
            })

            socket.on('connect_timeout', _ => {
                dispatch('reconnect')
            })

            socket.on('error', _ => {
                dispatch('reconnect')
            })

            socket.on('disconnect', _ => {
                dispatch('reconnect')
            })

            socket.on('message', msg => {
                dispatch('onMessage', msg)
            })

            socket.on('notify', msg => {
                dispatch('onNotify', msg)
            })
        }

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters: {
        message: state => state.message,
    },
}