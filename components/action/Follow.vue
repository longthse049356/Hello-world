<template>
    <div v-if="!off" class="button" v-bind:class="{'is-primary': !following, 'is-loading': loading}" @click="follow">
        <b-icon pack="fa" icon="rss" size="is-small"></b-icon>
        <span v-if="!minimize">{{following ? 'Thôi quan tâm' : 'Quan tâm'}}</span>
    </div>
</template>

<script>
    export default {
        name: "Follow",
        props: {
            model: {
                require: true,
                type: String
            },
            space: {
                require: true,
                type: String
            },
            objectId: {
                require: true,
                type: Number
            },
            is_followed: {
                require: true,
                type: Object
            },
            minimize: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                following: this.is_followed,
                loading: false,
                content_type: this.$store.getters['config/getCT'](this.model, this.space)
            }
        },
        computed: {
            off() {
                return this.model === 'user' && this.currentUser && this.currentUser.id === this.objectId
            }
        },
        methods: {
            async follow() {
                this.loading = true
                let res = await this.$api.follow.post({
                    content_type_id: this.content_type,
                    object_id: this.objectId
                })
                this.following = res.data.result
                this.loading = false
                if (process.env.SOCKET_URI) {
                    await this.$store.dispatch('notify/socketConnect')
                }
            }
        }
    }
</script>

<style scoped>

</style>
