const RestfulRepo = (app, item) => {
    let out = {
        list: async (query) => {
            return await app.$rest.get(`/${item.space}/${item.endpoint}/`, {params: query})
        },
        post: async (body) => {
            return await app.$rest.post(`/${item.space}/${item.endpoint}/`, body)
        },
        get: async (id, query) => {
            return await app.$rest.get(`/${item.space}/${item.endpoint}/${id}/`, query)
        },
        update: async (id, body) => {
            return await app.$rest.put(`/${item.space}/${item.endpoint}/${id}/`, body)
        },
        delete: async (id) => {
            return await app.$rest.delete(`/${item.space}/${item.endpoint}/${id}/`)
        }
    }
    if (item.callbacks) {
        item.callbacks.forEach(callback => {
            if (callback.hasId) {
                out[callback.name] = async (id, body) => {
                    return await app.$rest[callback.method](`/${item.space}/${item.endpoint}/${id}/${callback.endpoint}`, body)
                }
            } else {
                out[callback.name] = async (body) => {
                    return await app.$rest[callback.method](`/${item.space}/${item.endpoint}/${callback.endpoint}`, body)
                }
            }

        })
    }
    return out
}

const apis_module = [
    {
        space: 'auth',
        endpoint: 'users',
        name: 'user',
        callbacks: [
            {
                hasId: false,
                name: 'follow',
                method: 'post',
                endpoint: 'rest-auth/registration/'
            }
        ]
    },
    {
        space: 'auth',
        endpoint: 'rest-auth',
        name: 'rest_auth',
        callbacks: [
            {
                hasId: false,
                name: 'registration',
                method: 'post',
                endpoint: 'registration/'
            }
        ]
    },
    {
        space: 'activity',
        endpoint: 'activities',
        name: 'activity',
        callbacks: [
            {
                hasId: true,
                name: 'vote',
                method: 'post',
                endpoint: 'vote'
            }
        ]
    },
    {
        space: 'activity',
        endpoint: 'comments',
        name: 'comment',
        methods: {}
    },
    {
        space: 'media',
        endpoint: 'medias',
        name: 'media',
        methods: {}
    },
    {
        space: 'destination',
        endpoint: 'destinations',
        name: 'destination',
        methods: {}
    },
    {
        space: 'destination',
        endpoint: 'addresses',
        name: 'address',
        methods: {}
    },
    {
        space: 'destination',
        endpoint: 'taxonomies',
        name: 'taxonomy',
        methods: {}
    },
    {
        space: 'general',
        endpoint: 'fetch-address',
        name: 'autocomplete',
        methods: {}
    },
    {
        space: 'general',
        endpoint: 'verify-code',
        name: 'verify_code',
        methods: {}
    },
    {
        space: 'group',
        endpoint: 'groups',
        name: 'group',
        callbacks: [
            {
                hasId: true,
                name: 'join',
                method: 'post',
                endpoint: 'join'
            },
            {
                hasId: true,
                name: 'invite',
                method: 'post',
                endpoint: 'invite'
            },
            {
                hasId: true,
                name: 'approve',
                method: 'post',
                endpoint: 'approve'
            }
        ]
    },
    {
        space: 'chat',
        endpoint: 'chat-groups',
        name: 'chat_group'
    },
    {
        space: 'activity',
        endpoint: 'follow-groups',
        name: 'follow_group'
    },
    {
        space: 'activity',
        endpoint: 'follow',
        name: 'follow'
    },
    {
        space: 'chat',
        endpoint: 'groups',
        name: 'chat_group'
    },
    {
        space: 'chat',
        endpoint: 'my-groups',
        name: 'my_chat_groups'
    },
    {
        space: 'chat',
        endpoint: 'messages',
        name: 'message'
    },
    {
        space: 'chat',
        endpoint: 'groups',
        name: 'chat_group',
        callbacks: [
            {
                hasId: true,
                name: 'add_member',
                method: 'post',
                endpoint: 'add-member/'
            }
        ]
    }
]


export default function (app, inject) {
    const API = {}
    apis_module.forEach(item => {
        API[item.name] = RestfulRepo(app, item)
    })
    app.$api = API
    inject('api', API)
}
