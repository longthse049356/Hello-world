<template>
    <div>
        <section class="hero is-small is-bold banner gallery-banner has-background-white mb-2" id="banner">
            <div class="columns is-gapless">
                <div class="column is-4">
                    <div class="top-point-detail">
                        <div class="point-icon mb-2">
                            <i class="far fa-dove fa-3x has-text-primary"></i>
                        </div>
                        <div class="title is-3">
                            <editable :is-updating="creating" v-model="point.title" placeholder="Tên địa điểm"/>
                        </div>
                        <div class="buttons point-awards">
                            <div class="button is-white is-rounded">
                                <span class="has-text-primary mr-1">#2</span> Trip đề cử
                            </div>
                        </div>
                        <div class="description">
                            <div class="subtitle">
                                <editable :is-updating="creating" type="textarea"
                                          v-model="point.description"
                                          placeholder="Mô tả về địa điểm này"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-8">
                    <div v-bind:class="{'hero-body': creating}">
                        <div v-bind:class="{'container': creating}">
                            <m-browser v-if="creating" v-model="point.photos" :max="6" :col="6"></m-browser>
                            <d-gallery v-else v-model="point.photos" :updating="false"></d-gallery>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--        Thông tin-->
        <section class="hero is-small">
            <div class="hero-body">
                <div class="container">
                    <div class="columns is-multiline">
                        <div class="column is-12">
                            <div class="level">
                                <div class="level-left">
                                    <b-field grouped style="font-weight: normal">
                                        <b-field v-if="!creating">
                                            <b-icon size="is-small" class="mr-1" pack="fa"
                                                    icon="map-marker-alt"></b-icon>
                                            <span v-if="point.address">{{point.address.formatted_address}}</span>
                                        </b-field>
                                        <b-field v-if="creating || !!point.extra.phone">
                                            <editable icon="phone" :is-updating="creating" placeholder="Số điện thoại"
                                                      v-model="point.extra.phone">
                                            </editable>
                                        </b-field>
                                        <b-field>
                                            <LevelTitle :is-updating="creating"
                                                        v-model="point.extra.level"></LevelTitle>
                                        </b-field>
                                    </b-field>
                                </div>
                                <div class="level-right">
                                    <div class="buttons">
                                        <div v-if="!creating" class="button is-primary is-rounded is-active is-shadow"
                                             @click="showSelector = !showSelector">
                                            <b-icon size="is-small" pack="far" icon="plus"></b-icon>
                                            <span>Thêm vào Trip</span></div>
                                        <div class="button is-rounded" @click="handleSave()">
                                            <b-icon size="is-small" class="has-text-primary" pack="fa"
                                                    icon="check-circle" v-if="creating"></b-icon>
                                            <b-icon size="is-small" pack="fa" icon="pen" v-else></b-icon>
                                            <span>{{creating ? 'Lưu' : 'Chỉnh sửa'}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="info-block">
                                <div class="content" v-if="point.extra.services">
                                    <h4 class="title is-4 mb-1">Tiện ích chung</h4>
                                    <div class="description mb-3">Các tiện ích có ở địa điểm này</div>
                                    <StaticService
                                            :value="point.extra.services"
                                            :is-updating="creating"
                                            @input="point.extra.services = $event"
                                    />
                                </div>
                            </div>
                            <div class="info-block" v-if="!creating">
                                <div class="content" v-if="point.extra.services">
                                    <h4 class="title is-4 mb-1">Đánh giá</h4>
                                    <div class="description mb-3">Tổng quan đánh giá về địa điểm này</div>
                                    <div class="columns is-multiline is-variable is-2 point-stats">
                                        <div v-for="c in point.criterias" :key="c.id" class="column is-3">
                                            <div class="card ps-item">
                                                <div class="card-content" style="padding: .75rem;">
                                                    <div class="ps-rate mb-1">
                                                        <b-progress :max="5" type="is-primary" :value="3"></b-progress>
                                                    </div>
                                                    <div class="level">
                                                        <div class="level-left">
                                                            <span>{{c.title}}</span>
                                                        </div>
                                                        <div class="level-right">
                                                            <strong class="has-text-primary">{{c.rate}}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="!creating" class="column is-4">
                            <Notification space="destination" :object-id="point.id" content-type="point"
                                          :is-activity="true" :is-notify="false" title="Bảng tin"></Notification>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--        Dịch vụ-->
        <section class="hero is-small hero-grey"
                 v-if="(point.point_services && point.point_services.length) || creating">
            <div class="hero-body">
                <div class="container">
                    <div class="level mb-2">
                        <div class="level-left">
                            <div style="display: block">
                                <h2 class="title is-4 mb-1">Dịch vụ</h2>
                                <div class="description mb-0">Các dịch vụ có ở địa điểm này</div>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <b-datepicker placeholder="Click to select..." icon-pack="fa" icon="calendar" range>
                                </b-datepicker>
                            </div>
                            <div class="level-item">
                                <div class="button">
                                    <b-icon pack="fa" icon="user"></b-icon>
                                    <span>2 Người lớn, 1 trẻ em</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <s-list :value="point.point_services" :updating="creating" :point="point.id"></s-list>
                </div>
            </div>
        </section>
        <!--        Map-->
        <div class="mb-2">
            <div class="container">
                <AddressMap v-if="creating" :updating="true" :zoom-map="15"
                            :value="point.address && point.address ? [point.address]: []"
                            @input="point.address = $event[0]"></AddressMap>
                <MapBox v-else width="100%" :markers="point.address && point.address.geometry ? [point.address]: []"/>
            </div>
        </div>
        <!--        Liên quan-->
        <section class="hero is-small related">
            <div class="container mb-2">
                <div class="columns">
                    <div class="column">
                        <div class="content">
                            <h2 class="title is-4">Tương tự</h2>
                            <p>Các khách sạn tương tự trong khu vực</p>
                        </div>
                        <div class="columns is-variable is-2 is-multiline">
                            <div class="column is-4" v-for="i in pointRes.edges" :key="i.id">
                                <div class="card">
                                    <div class="card-image">
                                        <m-thumbnail :value="i.photos" ratio="is-2by1" width="400" height="200"/>
                                    </div>
                                    <div class="card-content">
                                        <h4 class="title is-5">
                                            <n-link :to="`/${$route.params.destination}/${$route.params.flag}/${i.slug}`">
                                                {{i.title}}
                                            </n-link>
                                        </h4>
                                        <b-rate size="is-small" icon-pack="fas" :show-score="true"
                                                custom-text="(66 đánh giá)"></b-rate>
                                        <small v-if="i.address">{{i.address.formatted_address}}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <b-modal :active.sync="showSelector" class="medium-modal" :width="600" scroll="keep">
            <TripSelector :point="point" :destination="data"></TripSelector>
        </b-modal>
    </div>
</template>

<script>
    import StaticService from "../../../components/point/StaticService";
    import LevelTitle from "../../../components/point/LevelTitle";
    import TripSelector from "../../../components/destination/TripSelector";

    export default {
        key: '_point',
        components: {
            StaticService, LevelTitle, TripSelector
        },
        name: "Point",
        props: {
            data: {}
        },
        head() {
            return {
                title: this.point.title
            }
        },
        async asyncData({$graph, params}) {
            let res = await $graph['destination_points']({param: {limit: 6, page: 1, search: ""}})
            let resPoint = null
            if (params.point && params.point !== 'create') {
                resPoint = await $graph['destination_point']({slug: params.point})
            }
            let point = resPoint ? resPoint['data']['destination_point'] : {}
            if (!point.extra) {
                point.extra = {
                    services: []
                }
            }
            return {
                pointRes: res ? res['data']['destination_points'] : {},
                point: point,
                creating: params.point && params.point === 'create'
            }
        },
        data() {
            return {
                criterias: [],
                markers: [],
                zoomMap: 15,
                address: null,
                showSelector: false
            }
        },
        watch: {
            $route(to, from) {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        },
        async created() {
            let res = await this.$rest.get('/vote/criteria/')
            this.criterias = res.data.results
        },
        methods: {
            onUpdateName({name, index}) {
                this.point.address = name
            },
            onUpdatePosition({position, index}) {
                this.markers[index] = position
                this.point.coordinates = {
                    lat: position.lat,
                    lng: position.lng
                }
                this.zoomMap = 12
            },
            async handleSave() {
                if (!this.creating) {
                    this.creating = true
                    return
                }
                let data = {
                    point_kind: this.$route.params.flag,
                    destination: this.data.id
                }
                Object.keys(this.point).forEach(i => {
                    if (this.point[i]) {
                        if (Array.isArray(this.point[i])) {
                            data[i] = this.point[i].map(x => x.id)
                        } else if (typeof this.point[i] === 'object' && this.point[i].id) {
                            data[i] = this.point[i].id
                        } else {
                            data[i] = this.point[i]
                        }
                    }
                })
                if (data.id) {
                    await this.$rest.put(`/destination/points/${data.id}/`, data)
                } else {
                    data.slug = "_"
                    let res = await this.$rest.post('/destination/points/', data).catch(e => {
                        console.log(e);
                    })
                    if (res) {
                        this.$router.replace({path: res.slug})
                    }

                }
                this.creating = false
            },
            getFilteredTags(text) {
                this.exServices = EXTRA.filter((option) => {
                    return option.field
                        .toString()
                        .toLowerCase()
                        .indexOf(text.toLowerCase()) >= 0
                })
            }
        },
        mounted() {
            this.toTop()
            this.stickyFoot()
            this.markers = [this.point.coordinates ? this.point.coordinates : {
                lat: 21.028511,
                lng: 105.804817,
                draggable: this.creating
            }]
        }
    }
</script>

<style lang="scss">
    .related {
        .card {
            height: 100%;
        }
    }
</style>