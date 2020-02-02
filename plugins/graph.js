import * as types from './queries/types'
import Vue from "vue";
const axios = require('axios')

let newRequest = axios.create({
    baseURL: process.env.REST_URI || 'http://127.0.0.1:8000/v1'
})

export default async function (context, inject) {
    async function mutate({mutation, variables}) {
        let data = variables
        if (Object.keys(variables).includes('param')) {
        } else {}
        return await context.$axios.post('', {
            operationName: null,
            query: mutation.loc.source.body,
            variables: data,
        }).then(res => res.data)
    }

    const graph = {
        mutate,
    }

    Object.keys(types).forEach(key => {
        graph[key] = async (variables) => {
            return await mutate({
                mutation: require(`./queries/${key}.graphql`),
                variables: variables
            })
        }
    })

    newRequest.interceptors.response.use(async function (response) {
        return response;
    },  async function (error) {
        if (error.response && error.response.status === 401) {
            await context.$auth.logout()
            return Promise.reject(error);
        }
    });

    context.$graph = graph
    context.$rest = newRequest
    inject('rest', newRequest)
    inject('graph', graph)
    inject('eventHub', new Vue())
}
