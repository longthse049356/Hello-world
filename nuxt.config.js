require('dotenv').config()

export default {
    mode: 'universal',
    env: {
        DOMAIN: process.env.DOMAIN,
        GRAPH_URI: process.env.GRAPH_URI,
        REST_URI: process.env.REST_URI,
        SOCKET_URI: process.env.SOCKET_URI
    },
    /*
    ** Headers of the page
    */
    head: {
        title: 'TRIP',
        titleTemplate: '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#DDD'},
    /*
    ** Global CSS
    */
    css: [
        '@/scss/fonts/fontawesome/css/all.css',
        '@/scss/app.scss'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@/plugins/components',
        '@/plugins/graph',
        '@/plugins/repository',
        '@/plugins/auth',
        '@/plugins/axios',
        {src: '~/plugins/sever_script'},
        {src: '~/plugins/client_only', mode: 'client'}
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/dotenv'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        ['cookie-universal-nuxt', {alias: 'ck'}],
        ['nuxt-buefy', {css: true, materialDesignIcons: false}],
        '@nuxtjs/pwa',
        '@nuxtjs/axios'
    ],

    axios: {
        baseURL: process.env.GRAPH_URI || "http://159.89.199.238:8888/query"
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            config.module.rules.push({
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            })
        }
    },
    router: {}
}
