<template>
    <div class="timeline_wrapper-columns">
        <div class="container medium" v-if="typeof $route.params.flag === 'undefined'">
            <div class="columns">
                <div class="column">
                    <a-list space="authentication" content-type="user" :object-id="user ? user.id : 0"></a-list>
                </div>
                <div class="column timeline-column-right">
                    <div class="section no-padding bottom-2 section-sb-infor">
                        <div class="card">
                            <div class="card-content card-wrap-padding">
                                <div class="item bottom-05" v-if="user.profile && user.profile.destination">
                                    <b-icon size="is-small" icon="map-pin" pack="far"></b-icon>
                                    <span class="left-2">Đến từ
                                        <n-link :to="`/${user.profile.destination.slug}`" title="">
                                            <b>{{user.profile.destination.title}}</b>
                                        </n-link>
                                    </span>
                                </div>
                                <div class="item bottom-05">
                                    <b-icon size="is-small" icon="rss-square" pack="far"></b-icon>
                                    <span class="left-2">Theo dõi <a href="#" title=""><b>8</b></a> </span>
                                </div>
                                <div class="item">
                                    <b-icon size="is-small" icon="bullseye-pointer" pack="far"></b-icon>
                                    <span class="left-2">Đang theo dõi <a href="#" title=""><b>23</b></a> </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="media && media.edges.length" class="section no-padding bottom-2">
                        <div class="card">
                            <div class="card-content card-wrap-padding">
                                <div class="header">
                                    <div class="title is-5">Ảnh</div>
                                </div>
                            </div>
                            <div class="columns is-multiline is-variable is-1">
                                <div class="column is-4" v-for="(m, i) in media.edges" :key="m.id">
                                    <div class="image is-1by1" v-if="i < media.edges.length - 1">
                                        <media :value="m" width="200" height="200"></media>
                                    </div>
                                    <n-link :to="`/member/${user.username}/media`" class="image is-1by1" v-else>
                                        <div class="mask gl-mask"><span>{{media.total_count}}</span> ảnh</div>
                                        <media :value="m" width="200" height="200"></media>
                                    </n-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="group && group.edges.length" class="section no-padding bottom-2">
                        <div class="card">
                            <div class="card-content card-wrap-padding">
                                <div class="header bottom-1">
                                    <div class="title is-5">Nhóm của {{convertName(user)}}</div>
                                </div>
                                <div class="columns is-multiline">
                                    <div class="column is-12" v-for="g in group.edges" :key="g.id">
                                        <g-card :show-member="false" layout="media" :value="g" image-size="is-64x64"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="$route.params.flag === 'trip' && trip" class="container medium">
            <t-list class="my-trip" v-model="trip" column="is-4" layout="item-inner" :q="q.tQ" label="trip_trips" media-size="is-3by2"/>
        </div>
        <div v-else-if="$route.params.flag === 'check-in' && destination" class="container medium">
            <div class="my-checkin">
                <div class="columns is-multiline is-variable is-2">
                    <div class="column is-3" v-for="(d, i) in destination.edges" :key="i">
                        <div class="card">
                            <div class="card-image">
                                <m-thumbnail v-if="d.photos && d.photos.length" ratio="is-3by2" :value="d.photos"
                                             width="380" height="250"></m-thumbnail>
                                <img v-else src="/blank/trip.jpg" alt="">
                            </div>
                            <div class="card-content">
                                <div class="title is-6 mb-05">
                                    <n-link :to="`/${d.slug}`">{{d.title}}</n-link>
                                </div>
                                <small>
                                    <b-icon size="is-small" class="mr-1" icon="clock" pack="far"></b-icon>
                                    <span>20/11/2019</span>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="$route.params.flag === 'media' && media" class="container medium">
            <div class="my-album bottom-2">
                <div class="title is-5 mb-2">Album ảnh của {{convertName(user)}}</div>
                <div class="columns is-multiline is-variable is-2">
                    <div class="column is-4">
                        <div class="card">
                            <div class="card-image">
                                <div class="image is-3by2"><img class="object-fit"
                                                                src="https://i.picsum.photos/id/666/536/354.jpg"></div>
                            </div>
                            <div class="card-content">
                                <div class="title is-6 mb-05">Chuyến đi Đà Nẵng</div>
                                <div class="small">
                                    <b-icon size="is-small" class="mr-1" icon="image" pack="far"></b-icon>
                                    <span>16 ảnh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="card">
                            <div class="card-image">
                                <div class="image is-3by2"><img class="object-fit"
                                                                src="https://i.picsum.photos/id/867/536/354.jpg"></div>
                            </div>
                            <div class="card-content">
                                <div class="title is-6 mb-05">Chuyến đi Đà Nẵng</div>
                                <div class="small">
                                    <b-icon size="is-small" class="mr-1" icon="image" pack="far"></b-icon>
                                    <span>16 ảnh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="card">
                            <div class="card-image">
                                <div class="image is-3by2"><img class="object-fit"
                                                                src="https://i.picsum.photos/id/366/536/354.jpg"></div>
                            </div>
                            <div class="card-content">
                                <div class="title is-6 mb-05">Chuyến đi Đà Nẵng</div>
                                <div class="small">
                                    <b-icon size="is-small" class="mr-1" icon="image" pack="far"></b-icon>
                                    <span>16 ảnh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-photo">
                <div class="title is-5 mb-3">Ảnh mới nhất</div>
                <div class="columns is-multiline is-variable is-1">
                    <div class="column is-3" v-for="(m, i) in media.edges" :key="i">
                        <div class="image is-1by1">
                            <media :value="m" width="200" height="200"/>
                        </div>
                    </div>
                </div>
                <b-pagination
                        :total="media.total_count"
                        :current.sync="q.mQ.page"
                        icon-pack="fa"
                        :per-page="q.mQ.limit"
                        @change="fetchMedia"
                        icon-prev="caret-left"
                        icon-next="caret-right"
                        aria-next-label="Trang tiếp theo"
                        aria-previous-label="Trang trước đó"
                        aria-page-label="Trang"
                        aria-current-label="Trang hiện tại">
                </b-pagination>
            </div>
        </div>
        <div v-else-if="$route.params.flag === 'follower' && follower" class="container medium">
            <div class="my-follower">
                <div class="title is-5 mb-3">Người theo dõi ({{follower.total_count}})</div>
                <div class="columns is-multiline is-variable is-1">
                    <div class="column is-4" v-for="(u, i) in follower.edges" :key="i">
                        <div class="card">
                            <div class="card-content">
                                <u-card :value="u" layout="media" image-size="is-32x32"></u-card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        key: '_flag',
        props: {
            user: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            let media = null, trip = null, group = null, destination = null, follower
            let mQ = {param: {limit: 9, page: 1, search: "", module: 'USER', username: this.$route.params.username}}
            let tQ = {param: {limit: 9, page: 1, search: "", user: this.user.id}}
            let gQ = {param: {limit: 6, page: 1, search: ""}}
            let fQ = {param: {limit: 5, page: 1, search: ""}}
            let uQ = {param: {limit: 5, page: 1, search: ""}}
            let dQ = {param: {limit: 12, page: 1, search: ""}}
            let content_type = this.$store.getters['config/getCT']('user', 'authentication')
            this.$store.dispatch('menu/setMenu', [])
            return {
                trip,
                media,
                group,
                destination,
                follower,
                q: {mQ, tQ, gQ, fQ, dQ, uQ},
                content_type
            }
        },
        watchQuery: true,
        methods: {
            async fetchMedia(page) {
                this.q.mQ.param.page = page
                let res = await this.$graph['media_medias'](this.q.mQ)
                this.media = res['data']['media_medias']
            },
            async fetchDestination(page) {
                this.q.dQ.param.page = page
                let res = await this.$graph['destination_destinations'](this.q.dQ)
                this.destination = res['data']['destination_destinations']
            },
            async fetchFollower(page) {
                this.q.uQ.param.page = page
                let res = await this.$graph['user_users'](this.q.uQ)
                this.follower = res.data['user_users']
            },
            async fetchTrip(page) {
                this.q.tQ.page = page
                let res = await this.$graph['trip_trips'](this.q.tQ)
                this.trip = res.data['trip_trips']
            },
            async fetch() {
                let res = await this.$graph['media_medias'](this.q.mQ)
                this.media = res['data']['media_medias']
                res = await this.$graph['group_groups'](this.q.gQ)
                this.group = res['data']['group_groups']
            },
            async init() {
                if (this.$route.params.flag === 'trip') {
                    await this.fetchTrip(1)
                } else if (this.$route.params.flag === 'check-in') {
                    await this.fetchDestination(1)
                } else if (this.$route.params.flag === 'media') {
                    this.q.mQ.param.limit = 16
                    await this.fetchMedia(1)
                } else if (this.$route.params.flag === 'follower') {
                    this.q.uQ.param.limit = 15
                    await this.fetchFollower(1)
                } else if (typeof this.$route.params.flag === 'undefined') {
                    this.q.mQ.param.limit = 9
                    await this.fetch()
                }
            }
        },
        async created() {
            await this.init()
        },
        watch: {
            $route(to, from) {
                this.init()
            }
        }
    }
</script>

<style scoped>

</style>