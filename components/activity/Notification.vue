<template>
    <div v-bind:class="{'notifications': this.isNotify}">
        <h4 class="title is-4" v-if="title">{{title}}</h4>
        <Notify class="v-center" v-for="(a, i) in activity.edges" :key="i" :value="a"></Notify>
        <slot></slot>
    </div>
</template>

<script>
    import Notify from "./Notify";
    export default {
        name: "Notification",
        components: {Notify},
        data() {
            let content_type = this.$store.getters['config/getCT'](this.contentType, this.space)
            return {
                isLoading: false,
                activity: {
                    edges: []
                },
                page: 1,
                content_type
            }
        },
        props: {
            space: {
                type: String,
                default: null
            },
            contentType: {
                type: String,
                default: null
            },
            objectId: {
                type: Number,
                default: 0
            },
            title: {

            },
            isActivity: {
                default: false,
                type: Boolean
            },
            isNotify: {
                default: true,
                type: Boolean
            }
        },
        methods: {
            async fetch() {
                this.isLoading = true
                let q = {
                    search: "",
                    page: this.page,
                    limit: 5,
                    isNotify: this.isNotify,
                    isActivity: this.isActivity,
                    privacy: 'PUBLIC',

                }
                if (this.objectId && this.content_type) {
                    q.objectId = this.objectId.toString()
                    q.contentTypeId = this.content_type
                }
                let res = await this.$graph['feed_feeds']({
                    param: q
                })
                this.activity = res['data']['feed_feeds']
                this.isLoading = false
            }
        },
        created() {
            this.fetch()
        },
    }
</script>

<style scoped>

</style>
