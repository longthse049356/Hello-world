<template>
    <NuxtChild v-if="$route.params.point" :data="data"></NuxtChild>
    <section class="section has-map" v-else-if="$route.params.flag">
        <client-only>
            <MapBox width="100%" height="100%" :markers="pointRes.edges.map(x => x.address)"/>
        </client-only>
        <aside class="menu point second-bar">
            <div class="elm">
                <h4 class="title is-5" @click="activePoint = null">
                    <b-icon v-if="activePoint" size="is-small" class="mr-1" pack="far" icon="angle-left"></b-icon>
                    <b>{{preTitle}} tại {{data.title}}</b>
                </h4>
                <div class="button is-rounded" v-if="activePoint === null">
                    <b-icon pack="fa" icon="sliders-h" size="is-small"></b-icon>
                    <span>Bộ lọc</span>
                </div>
            </div>
            <transition name="fade" mode="out-in">
                <div v-if="activePoint" class="card">
                    <div class="card-image">
                        <m-thumbnail :value="activePoint.photos" ratio="is-2by1" width="400" height="200"/>
                    </div>
                    <div class="card-content content">
                        <h2 class="title is-4 mb-05">{{activePoint.title}}</h2>
                        <b-rate icon-pack="fas" :show-score="true"
                                custom-text="(66 đánh giá)"></b-rate>
                        <p v-if="activePoint.address">
                            <b-icon size="is-small" pack="fa" icon="map-marker-alt"></b-icon>
                            <span>{{activePoint.address.formatted_address}}</span>
                        </p>
                        <p>
                            <b-icon size="is-small" pack="fa" icon="phone"></b-icon>
                            <span>+84856728897</span>
                        </p>
                        <p>
                            <b-icon size="is-small" pack="fa" icon="award"></b-icon>
                            <span>Khách sạn 5 sao</span>
                        </p>
                        <div class="columns">
                            <div class="column">
                                <div class="button trip-button is-primary is-bordered is-fullwidth">
                                    <b-icon pack="fa" size="is-small" icon="plus-circle"></b-icon>
                                    <span>Thêm vào trip</span>
                                </div>
                            </div>
                            <div class="column">
                                <n-link :to="`/${$route.params.destination}/${$route.params.flag}/${activePoint.slug}`"
                                        class="button trip-button is-primary is-fullwidth">Xem chi tiết
                                </n-link>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <div class="results">
                <div class="wrap">
                    <p class="menu-label">Nổi bật</p>
                    <ul class="menu-list">
                        <li v-for="item in pointRes.edges" :key="item.id" @click="activePoint = item">
                            <div class="elm">
                                <div class="media">
                                    <div class="media-left">
                                        <m-thumbnail :value="item.photos" ratio="is-64x64"></m-thumbnail>
                                    </div>
                                    <div class="media-content">
                                        <div class="level mb-05">
                                            <div class="level-left">
                                                <h4 class="title is-6"><b>{{item.title}}</b></h4>
                                            </div>
                                            <div class="level-right">
                                                <strong class="title is-6 has-text-primary">5.7</strong>
                                            </div>
                                        </div>
                                        <small v-if="item.address">
                                            <b-icon size="is-small" pack="fa" icon="map-marker-alt"></b-icon>
                                            <span>{{item.address.formatted_address}}</span>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p class="menu-label">Mới nhất</p>
                    <ul class="menu-list">
                        <li v-for="item in pointRes.edges" :key="item.id" @click="activePoint = item">
                            <div class="elm">
                                <div class="media">
                                    <div class="media-left">
                                        <m-thumbnail :value="item.photos" ratio="is-64x64"></m-thumbnail>
                                    </div>
                                    <div class="media-content">
                                        <div class="level mb-05">
                                            <div class="level-left">
                                                <h4><b>{{item.title}}</b></h4>
                                            </div>
                                            <div class="level-right">
                                                <strong class="title is-6 has-text-primary">5.7</strong>
                                            </div>
                                        </div>
                                        <small v-if="item.address">
                                            <b-icon size="is-small" pack="fa" icon="map-marker-alt"></b-icon>
                                            {{item.address.formatted_address}}</small>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    </section>
</template>

<script>

    export default {
        name: "PageDestinationFlag",
        props: {
            data: {}
        },
        data() {
            return {
                activePoint: null,
                pointRes: {
                    edges: []
                }
            }
        },
        methods: {
            async fetch() {
                let res = await this.$graph['destination_points']({
                    param: {
                        limit: 5, page: 1,
                        search: "",
                        kind: this.$route.params.flag,
                        destination: this.data.id
                    }
                })
                this.pointRes = res['data']['destination_points']
            }
        },
        components: {},
        computed: {
            preTitle() {
                switch (this.$route.params.flag) {
                    case "visit-point":
                        return "Điểm tham quan"
                    case "accommodation":
                        return "Điểm nghỉ ngơi"
                    case "restaurant":
                        return "Điểm ăn uống"
                    default:
                        return ""
                }
            }
        },
        async created() {
            await this.fetch()
        },
        watch: {
            $route() {
                this.fetch()
                this.toTop()
            }
        }
    }
</script>

<style lang="scss">
    .section.has-map {
        position: relative;
        padding: 0;
        height: calc(100vh - 45px);

        .vue-map-container {

        }

        .second-bar {
            width: 350px;
            background: #FFFFFF;
            position: absolute;
            top: 10px;
            left: 10px;
            bottom: 10px;
            padding: 10px 0;
            box-shadow: 0 0 1px rgba(0, 0, 0, 0.30);

            .elm {
                border-bottom: 1px solid #EEE;
                padding: 1rem;

                .level {
                    margin-bottom: 0;
                }

                span:last-child {
                    margin-left: unset;
                    padding-left: unset;
                    border-left: unset;
                }
            }

            .menu-label:not(:last-child) {
                margin-bottom: 0;
                padding: 0 1rem;
            }

            &.point {
                display: flex;
                flex-direction: column;

                .results {
                    display: flex;
                    flex: 1;
                    min-height: 0;
                    overflow: auto;

                    .wrap {
                        flex: 1;
                        padding: 1rem 0;
                    }
                }
            }
        }
    }
</style>
