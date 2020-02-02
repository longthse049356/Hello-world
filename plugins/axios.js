const cookieparser = process['server'] ? require('cookieparser') : undefined

export default function (context) {
    if (process['server']) {
        if (context.req.headers.cookie) {
            const parsed = cookieparser.parse(context.req.headers.cookie)
            const code = parsed['invited.code']
            if ((typeof code === 'undefined') && context.route.path !== '/invited/') {
                context.redirect('/invited')
            }
        } else if (context.route.path !== '/invited/') {
            context.redirect('/invited')
        }
    }

    context.$axios.onError(e => {
    })
    context.$axios.onRequest(config => {
    })
}
