<template>
    <div class="activities" id="activities">
        <a-post v-if="!minimize" :content-type="content_type.toString()" :object-id="objectId.toString()"
                @done="handleDone"/>
        <div id="activities-wrap" v-bind:class="{'wrap': !minimize}" v-if="activity.edges && activity.edges.length">
            <b-carousel-list
                    v-if="vertical" v-model="test" :data="activity.edges" :items-to-show="3"
                    icon-pack="fa"
                    icon-prev="chevron-left"
                    icon-next="chevron-right">
                <template slot="item" slot-scope="props">
                    <a-card :value="props.list" :minimize="minimize"/>
                </template>
            </b-carousel-list>
            <div v-else class="columns" v-bind:class="{'is-multiline' : !minimize}">
                <div class="column" v-bind:class="{'is-12': !minimize, 'is-4' : minimize}" v-for="i in activity.edges"
                     :key="i.id">
                    <a-card :value="i" :minimize="minimize"/>
                </div>
            </div>
        </div>
        <div v-if="isLoading" class="columns" v-bind:class="{'is-multiline' : !minimize}">
            <div class="column" v-bind:class="{'is-12': !minimize, 'is-4' : minimize}" v-for="i in 10">
                <div class="skeleton"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AList",
        data() {
            let content_type = this.$store.getters['config/getCT'](this.contentType, this.space)
            return {
                kind: 'post',
                isPublic: false,
                isLoading: false,
                activity: {
                    edges: []
                },
                page: 1,
                test: 0,
                content_type
            }
        },
        props: {
            minimize: {
                type: Boolean,
                default: false
            },
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
            vertical: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleDone() {
                this.page = 1
                this.fetch()
            },
            async fetch() {
                this.isLoading = true
                let q = {
                    search: "",
                    page: this.page,
                    limit: 10,
                    isNotify: false,
                    isActivity: true,
                    privacy: 'PUBLIC',

                }
                if (this.objectId && this.content_type) {
                    q.objectId = this.objectId.toString()
                    q.contentTypeId = this.content_type
                }
                let res = await this.$graph['feed_feeds']({
                    param: q
                })
                this.activity.edges = this.activity.edges.concat(res['data']['feed_feeds']['edges'])
                this.activity.page = res['data']['feed_feeds']['page']
                this.activity.limit = res['data']['feed_feeds']['limit']
                this.activity.total_count = res['data']['feed_feeds']['total_count']
                this.isLoading = false
            }
        },
        created() {
            this.fetch()
        },
        mounted() {
            const wrap = document.getElementById("bar-center")
            const inside = document.getElementById("activities")
            wrap.onscroll = async () => {
                let bottomOfWindow = inside.offsetHeight - wrap.offsetHeight < wrap.scrollTop
                if (bottomOfWindow && !this.isLoading && !this.minimize) {
                    if (this.activity.total_count / this.activity.limit > this.page) {
                        this.page = this.page + 1
                        await this.fetch()
                    }
                }
            };
            console.log("mount");
        },
        destroyed() {
            const wrap = document.getElementById("bar-center")
            wrap.onscroll = async () => {

            }
        }
    }
</script>

<style lang="scss"></style>
