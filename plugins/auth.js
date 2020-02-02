const cookieparser = process['server'] ? require('cookieparser') : undefined

export default async function (context, inject) {
    const getToken = () => {
        let token = null
        if (process['server'] && context.req.headers.cookie) {
            const parsed = cookieparser.parse(context.req.headers.cookie)
            token = parsed['auth.token']
        } else {
            token = context.store.$ck.get('auth.token')
        }
        return token
    }
    const setToken = async (token) => {
        context.$axios.setHeader('X-TRIP-TOKEN', token ? token : undefined)
        context.$rest.defaults.headers.common['Authorization'] = token ? 'JWT ' + token : undefined
        await context.store.commit('auth/SET_TOKEN', token)
        if (token) {
            context.store.$ck.set('auth.token', token, {
                maxAge: 60 * 60 * 24 * 7,
                path: '/'
            })
        } else {
            context.store.$ck.remove('auth.token')
        }
    }
    const getUser = async () => {
        let res = await context.$graph['authentication_profile']({}).catch(e => {
            console.log(e);
        })
        return res.data ? res.data['authentication_profile'] : null
    }
    const setUser = async (user) => {
        await context.store.commit('auth/SET_USER', user)
    }
    const init = async () => {
        let token = getToken()
        await setToken(token)
        let user = await getUser()
        await setUser(user)
    }

    await init()
    const auth = {
        async login(credential) {
            let res = await context.$graph['authentication_login']({
                credential
            }).catch(e => {
                console.log(e);
            })
            if (typeof res['errors'] === 'undefined') {
                await setToken(res.data['authentication_login']['token'])
                let user = await getUser()
                await setUser(user)
            }
        },
        async logout() {
            await setToken(null)
            await setUser(null)
        },
        fetchUser: getUser
    }
    context.$auth = auth
    inject('auth', auth)
}
