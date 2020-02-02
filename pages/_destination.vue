<template>
    <div>
        <!--    Banner    -->
        <section v-if="isHome" class="hero north hero-home" id="banner">
            <div class="hero-body mask-body">
                <div class="container small" style="text-align: center">
                    <Discovery :value="destination"></Discovery>
                    <n-link to="/explore" class="tag is-black is-rounded">
                        <b-icon size="is-small" icon="location-circle" pack="fas"></b-icon>
                        <span>Khám phá điểm đến</span>
                    </n-link>
                </div>
            </div>
        </section>
        <section v-if="isDestination || isCreate" class="hero north" id="banner">
            <div class="hero-body mask-body hero-destination">
                <div class="container">
                    <div class="columns">
                        <div class="column destination-info">
                            <b v-if="creating">
                                <editable
                                        class="is-black"
                                        :is-updating="creating" v-model="destination.tag_line"
                                        placeholder="Tên gọi khác"></editable>
                            </b>
                            <div v-else class="destination-tag">
                                <span class="has-text-primary">{{destination.tag_line}}</span>
                            </div>
                            <h1 class="title is-3 is-spaced">
                                <span v-if="!creating">Chào <strong>{{currentUser ? convertName(currentUser, 'last_name'): 'Bạn'}}</strong> đến với <strong>{{destination.title}}</strong></span>
                                <editable class="is-black" :is-updating="creating" v-else
                                          v-model="destination.title"></editable>
                            </h1>
                            <div class="description">
                                <editable class="is-black" :is-updating="creating" type="textarea"
                                          v-model="destination.description" placeholder="Mô tả điểm đến"/>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card-content has-maps" v-if="creating">
                                <AddressMap
                                        :updating="true" :zoom-map="15"
                                        :value="destination.address ? [destination.address]: []"
                                        @input="destination.address = $event[0]"/>
                            </div>
                        </div>
                    </div>
                    <m-browser v-if="creating" :value="destination.photos" @input="destination.photos = $event"
                               :max="6"></m-browser>
                </div>
            </div>
            <div class="hero-image" v-if="!creating" v-bind:style="style">
                <div class="hero-image-mask"></div>
            </div>
            <div class="hero-foot" style="margin-bottom: 3rem;" v-if="!isHome" id="hero-foot">
                <div class="container">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <div class="buttons">
                                <div @click="showTrip = !showTrip"
                                     class="button is-primary is-rounded is-shadow is-active is-more-padding">
                                    <b-icon pack="fa" icon="plane" size="is-small"></b-icon>
                                    <span>Trip tới đây</span>
                                </div>
                                <div @click="showInfor = !showInfor" class="button is-rounded is-more-padding">
                                    <b-icon pack="fas" icon="info" size="is-small"></b-icon>
                                    <span>Thông tin</span>
                                </div>
                                <div @click="showMemory = !showMemory" class="button is-rounded is-more-padding">
                                    <b-icon pack="fa" icon="camera" size="is-small"></b-icon>
                                    <span>Kỷ niệm</span>
                                </div>
                                <div @click="showWeather = !showWeather" class="button is-rounded is-more-padding">
                                    <b-icon pack="fa" icon="sun" size="is-small"></b-icon>
                                    <span>25 - 30</span>
                                </div>
                                <div v-if="isDestination || isCreate" class="button is-rounded" @click="handleSave()">
                                    <b-icon size="is-small" pack="fa" icon="check-circle" v-if="creating"></b-icon>
                                    <b-icon size="is-small" pack="fa" icon="pen" v-else></b-icon>
                                </div>
                            </div>
                        </div>
                        <div class="level-right">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--    Khám phá điểm đến   -->
        <section v-if="isDestination" class="hero destination-explore has-border-bottom">
            <div class="hero-body mask-body">
                <div class="container small" style="text-align: center">
                    <div class="title is-3">Khám phá {{destination.title}}</div>
                    <div class="description bottom-2">Cùng Tripvn khám phá về con người, cảnh vật, ẩm thực và các trải
                        nghiệm thực tế của Đà Nẵng - Thành phố đáng sống nhất Việt Nam
                    </div>
                    <div class="columns is-mobile">
                        <div class="column">
                            <div class="no-border de-card card cover-inner">
                                <div class="card-image">
                                    <div class="text-inner">
                                        <div class="is-vertical-center">
                                            <h4 class="title is-3" style="line-height: 50px;">
                                                <n-link :to="`/${destination.slug}/visit-point`" class="">Chơi gì
                                                </n-link>
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="image cover is-3by2 is-rounded">
                                        <img class="object-fit" src="https://picsum.photos/id/639/300/200" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="no-border de-card card cover-inner">
                                <div class="card-image">
                                    <div class="text-inner">
                                        <div class="is-vertical-center">
                                            <h4 class="title is-3" style="line-height: 50px;">
                                                <n-link :to="`/${destination.slug}/food`" class="">Ăn gì</n-link>
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="image cover is-3by2 is-rounded">
                                        <img class="object-fit" src="https://picsum.photos/id/42/300/200" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="no-border de-card card cover-inner">
                                <div class="card-image">
                                    <div class="text-inner">
                                        <div class="is-vertical-center">
                                            <h4 class="title is-3" style="line-height: 50px;">
                                                <n-link :to="`/${destination.slug}/accommodation`" class="">Ở đâu
                                                </n-link>
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="image cover is-3by2 is-rounded">
                                        <img class="object-fit" src="https://picsum.photos/id/651/300/200" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--    Điểm đến nổi bật    -->
        <section v-if="isHome" class="hero center has-border-bottom">
            <div class="hero-body">
                <div class="container">
                    <h2 class="title is-4">{{$auth.loggedIn ? 'Dành cho bạn' : 'Điểm đến nổi bật'}}</h2>
                    <div class="buttons level">
                        <div class="level-left">
                            <div class="button is-rounded is-trip-gray is-active">
                                <span>Nổi bật</span>
                            </div>
                            <div class="button is-rounded is-trip-gray">
                                <span>Vịnh</span>
                            </div>
                            <div class="button is-rounded is-trip-gray">
                                <span>Đảo</span>
                            </div>
                            <div class="button is-rounded is-trip-gray">
                                <span>Phố núi</span>
                            </div>
                            <div class="button is-rounded is-trip-gray">
                                <span>Cao nguyên</span>
                            </div>
                        </div>
                        <div class="level-right">
                            <n-link to="/explore" class="button is-rounded is-highlight is-trip-shadow-s">
                                <b-icon pack="fa" icon="chevron-circle-right" size="is-small"></b-icon>
                                <span>Khám phá</span>
                            </n-link>
                        </div>
                    </div>
                    <popular :data="response" :max="5" layout="overlay" img-size="/300/300"
                             title-position="inside"/>
                </div>
            </div>
        </section>
        <!--    Thông tin    -->
        <section v-if="isDestination || isCreate" class="hero center display-none">
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column is-4">
                            <div class="card" style="height: 100%">
                                <div v-if="creating" class="card-content">
                                    <AddressMap :value="[destination.address]" @input="destination.address = $event[0]"
                                                :updating="creating"/>
                                </div>
                                <div v-else class="card-content">
                                    <h4 class="title is-5">Thông tin</h4>
                                    <b-table style="max-height: 300px;" :mobile-cards="false" class="review rating"
                                             :data="criterias">
                                        <template slot-scope="props">
                                            <b-table-column width="200">
                                                <span>{{props.row.title}}</span>
                                            </b-table-column>
                                            <b-table-column>
                                                <b-progress :value="20"></b-progress>
                                            </b-table-column>
                                        </template>
                                        <template slot="footer">
                                            <th colspan="2">
                                                <div class="level" style="padding-bottom: 0">
                                                    <div class="level-left">
                                                        <div class="level-item">
                                                            <b-rate icon-pack="fas"></b-rate>
                                                        </div>
                                                    </div>
                                                    <div class="level-right">
                                                        <span>9.7</span>
                                                        <span>(90 đánh giá)</span>
                                                    </div>
                                                </div>
                                            </th>
                                        </template>
                                    </b-table>
                                </div>
                            </div>
                        </div>
                        <div class="column is-8">
                            <d-gallery layout="destination" v-model="destination.photos"
                                       :updating="creating"></d-gallery>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--    Hoạt động    -->
        <section v-if="isHome || isDestination" class="hero center has-border-bottom trek-home">
            <div class="hero-body">
                <div class="container">
                    <div class="hero-head level">
                        <div class="level-left">
                            <div class="hero-head-title">
                                <h2 class="title is-4 mb-05">Hoạt động</h2>
                                <p class="description">Các hoạt động mới của thành viên Trip.vn</p>
                            </div>
                        </div>
                        <div class="level-right">
                            <button class="button is-rounded is-highlight is-trip-shadow-s">
                                <b-icon pack="fa" icon="shoe-prints" size="is-small"></b-icon>
                                <span>Vào Trek</span>
                            </button>
                        </div>
                    </div>
                    <a-list :vertical="true" :minimize="true" content-type="destination" space="destination"
                            :object-id="destination ? destination.id : 0"/>
                </div>
            </div>
        </section>
        <!--    Chuyến đi  -->
        <section v-if="isDestination || isHome" class="hero center has-border-bottom">
            <div class="hero-body">
                <div class="container">
                    <div class="hero-head level">
                        <div class="level-left">
                            <div class="hero-head-title">
                                <h2 class="title is-4 mb-05">Chuyến đi thú vị trong tháng</h2>
                                <p class="description bottom-1">Những chuyến đi hấp dẫn nhất của các tripper</p>
                            </div>
                        </div>
                        <div class="level-right">
                            <n-link to="/trip/explore" class="button is-rounded is-highlight is-trip-shadow-s">
                                <b-icon pack="fa" icon="chevron-circle-right" size="is-small"></b-icon>
                                <span>Khám phá</span>
                            </n-link>
                        </div>
                    </div>
                    <t-list :q="tQ" layout="item-inner" column="is-4" v-model="resTrip"></t-list>
                </div>
            </div>
        </section>
        <!--    Thổ địa    -->
        <section v-if="destination.id && typeof $route.params.flag === 'undefined'" class="hero south hero-local">
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column is-9 v-center">
                            <div>
                                <h2 class="title is-4 mb-05">Thổ địa tiêu biểu</h2>
                                <p class="description bottom-2">Là những thành viên tại địa phương có nhiệm vụ giúp đỡ
                                    Trippers trong các chuyến đi</p>
                                <div class="columns">
                                    <div class="column has-text-centered" v-for="p in destination.staffs" :key="p.id">
                                        <figure class="image is-96x96 avatar bottom-05" v-if="p.avatar">
                                            <img
                                                    :src="p.avatar.thumbnails['thumb_200_200']" class="is-rounded"
                                                    alt="Placeholder image">
                                            <div class="tag is-light">+ {{Math.floor((Math.random() * 10) + 1)}}</div>
                                        </figure>
                                        <div class="title is-6 mb-0">{{convertName(p)}}</div>
                                        <n-link :to="`/member/${p.username}`" class="mb-0">@{{p.username}}</n-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="has-image">
                            <img src="../static/local-mascot.png"/></div>
                    </div>
                </div>
            </div>
        </section>
        <!--    Hội nhóm    -->
        <section v-if="isHome" class="hero south group-list-home">
            <div class="hero-body">
                <div class="container">
                    <div class="hero-head level">
                        <div class="level-left">
                            <div class="hero-head-title">
                                <h2 class="title is-4 mb-05" style="margin-bottom: 0">Hội nhóm</h2>
                                <p class="bottom-1 description">Nơi giao lưu, kết nối và cùng nhau trải nghiệm các hành
                                    trình</p>
                            </div>
                        </div>
                        <div class="level-right">
                            <n-link to="/group" class="button is-rounded is-highlight is-trip-shadow-s">
                                <b-icon pack="fa" icon="chevron-circle-right" size="is-small"></b-icon>
                                <span>Khám phá</span>
                            </n-link>
                        </div>
                    </div>
                    <div class="columns is-half-mobile">
                        <div class="column" v-for="p in resGroup.edges" :key="p.id">
                            <g-card class="no-border" :value="p" img-path="200_200" image-size="is-1by1"
                                    :can-join="false"></g-card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--    Điểm liên quan    -->
        <section v-if="isDestination" class="hero center has-background-white">
            <div class="hero-body">
                <div class="container">
                    <h2 class="title is-4">Điểm đến tương tự</h2>
                    <popular :data="response" :max="8" layout="overlay" img-size="/300/300"
                             title-position="inside"></popular>
                </div>
            </div>
        </section>
        <!--    Xu    -->
        <section v-if="isHome && !$auth.loggedIn" class="hero xu is-small">
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column is-3 has-image mascot">
                            <img src="../static/xu.png" style="margin-bottom: -1.3rem;max-width: 363px;"/>
                        </div>
                        <div class="column is-5 v-center">
                            <div class="content">
                                <h3 class="title is-4 mb-05">Tích lũy xu, Vi vu thỏa thích</h3>
                                <p class="description mb-3">Nhanh tay sưu tập xu, sưu tập càng nhiều đi càng thả ga</p>
                                <div class="buttons">
                                    <div class="button button-noborder button-hlg is-yellow is-trip-shadow is-rounded">
                                        Xu là gì
                                    </div>
                                    <div class="button button-noborder button-hlg is-trip-shadow is-rounded">Kiếm ở
                                        đâu
                                    </div>
                                </div>
                                <div class="buttons">
                                    <div class="button is-text">
                                        <b-icon pack="fa" icon="chevron-circle-right" size="is-small"></b-icon>
                                        <span>Quản lý xu</span>
                                    </div>
                                    <div class="button is-text">
                                        <b-icon pack="fa" icon="chevron-circle-right" size="is-small"></b-icon>
                                        <span>Danh sách nhiệm vụ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column is-4 v-center" style="background: rgba(32, 121, 117, 0.5);">
                            <div>
                                <b>TOP THÁNG</b>
                                <p class="bottom-1">Nhanh tay sưu tập xu, sưu tập càng nhiều đi càng thả ga</p>
                                <div class="columns is-multiline">
                                    <div class="column is-6" v-for="i in 6" :key="i">
                                        <div class="media ">
                                            <div class="media-left">
                                                <figure :class="`image is-48x48 avatar`">
                                                    <img class="is-rounded"
                                                         :src="`https://picsum.photos/id/3${i}/200/200`">
                                                </figure>
                                            </div>
                                            <div class="media-content">
                                                <div><b>Lâm Hoàng</b></div>
                                                <n-link to="/activity/123/"><small>15 giờ trước</small></n-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--    Tải app    -->
        <section v-if="isHome && !$auth.loggedIn" class="hero south home-download">
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column is-6 content">
                            <h1 class="title">Tải ứng dụng TRIP.VN</h1>
                            <p class="description mb-3">Ứng dụng Trip.vn được phát triển trên đa nền tảng, đa thiết bị
                                và luôn được cập nhập mới
                                nhất tới mọi người dùng và bất cứ đâu!</p>
                            <div class="buttons">
                                <div class="button button-store is-trip-shadow mr-2">
                                    <i class="fab fa-apple"></i>
                                    <small>Tải ứng dụng</small><strong>App Store</strong>
                                </div>
                                <div class="button button-store is-trip-shadow">
                                    <i class="fab fa-google-play"></i>
                                    <small>Tải ứng dụng</small><strong>Google Play</strong>
                                </div>
                            </div>
                            <div class="ask-list">
                                <ul class="nostyle">
                                    <li><a href="#" title="">
                                        <b-icon size="is-small" pack="fas" icon="chevron-circle-right"></b-icon>
                                        <span class="ml-1">Câu hỏi thường gặp</span></a></li>
                                    <li><a href="#" title="">
                                        <b-icon size="is-small" pack="fas" icon="chevron-circle-right"></b-icon>
                                        <span class="ml-1">Lỗi khi cài đặt ứng dụng</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="column is-6 demo">
                            <div class="download-qrcode has-background-white  is-trip-shadow"><img
                                    src="../static/dl-qrcode.png" title=""></div>
                            <div class="photo-demo"><img src="../static/home-download-photo.png" title=""></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--    Danh sách Point    -->
        <NuxtChild :data="destination"/>
        <b-modal :active.sync="showMemory" :width="600" scroll="keep">
            <Memory></Memory>
        </b-modal>
        <b-modal :active.sync="showInfor" :width="600" scroll="keep">
            <Information></Information>
        </b-modal>
        <b-modal :active.sync="showTrip" class="medium-modal" :width="600" scroll="keep">
            <TripSelector :destination="destination"></TripSelector>
        </b-modal>
        <b-modal :active.sync="showWeather" class="weather-modal" :width="600" scroll="keep">
            <Weather></Weather>
        </b-modal>
    </div>
</template>

<script>
    import Weather from "../components/destination/Weather";
    import TripSelector from "../components/destination/TripSelector";
    import Memory from "../components/destination/Memory";
    import Information from "../components/destination/Information";

    export default {
        async asyncData(context) {
            let destination = {}
            let dQ = {limit: 5, page: 1, search: ""}
            let gQ = {limit: 6, page: 1, search: ""}
            let tQ = {limit: 3, page: 1, search: ""}
            if (context.params.destination && context.params.destination !== 'create') {
                const res2 = await context.$graph['destination_destination']({slug: context.params.destination})
                destination = res2.data['destination_destination']
                tQ.end_point = destination.id
            }
            let click = !!destination.slug
            let home = await context.$graph['home']({
                    tParam: tQ,
                    dParam: dQ,
                    gParam: gQ
                }
            )
            await context.store.dispatch('menu/setMenu', [
                {
                    title: "Khám phá",
                    to: destination.id ? `/${destination.slug}/` : '',
                    click: click,
                    icon: 'compass'
                },
                {
                    title: "Tham quan",
                    to: destination.id ? `/${destination.slug}/visit-point` : 'visit-point',
                    click: click,
                    icon: 'binoculars'
                },
                {
                    title: "Ăn uống",
                    to: destination.id ? `/${destination.slug}/restaurant` : 'restaurant',
                    click: click,
                    icon: 'utensils'
                },
                {
                    title: "Nghỉ ngơi",
                    to: destination.id ? `/${destination.slug}/accommodation` : 'accommodation',
                    click: click,
                    icon: 'bed'
                }
            ])
            return {
                response: home.data['destination_destinations'],
                resTrip: home.data['recommendation_trips'],
                resGroup: home.data['group_groups'],
                destination,
                creating: context.params.destination === 'create',
                tQ: {
                    param: tQ
                }
            }
        },
        data() {
            return {
                people: [],
                criterias: [],
                address: null,
                isPassed: false,
                date: null,
                taxonomies: [],
                showWeather: false,
                showTrip: false,
                showMemory: false,
                showInfor: false
            }
        },
        name: "PageHome",
        components: {Weather, TripSelector, Memory, Information},
        methods: {
            async fetchD() {
                let res = await this.$graph['destination_destination']({param: {limit: 5, page: 1, search: ""}})
                this.response = res.data['destination_destinations']
            },
            async handleSave() {
                this.toTop()
                if (!this.creating) {
                    this.creating = true
                    return
                }
                if (this.destination.id) {
                    await this.$rest.put(`/destination/destinations/${this.destination.id}/`, this.cleanData(this.destination))
                } else {
                    this.destination.slug = "_"
                    await this.$rest.post('/destination/destinations/', this.cleanData(this.destination))
                }
                this.creating = false
            }
        },
        mounted() {
            this.toTop()
            this.stickyFoot()
            this.$store.dispatch('menu/setD', {title: this.destination.title})
        },
        head() {
            return {
                title: this.destination.title ? this.destination.title : "TRiP.VN - Cộng đồng du lịch Việt Nam"
            }
        },
        async created() {
            let res = await this.$rest.get('/vote/criteria/')
            if (res) {
                this.criterias = res.data.results
            }
        },
        computed: {
            isHome() {
                return typeof this.$route.params.destination === 'undefined'
            },
            isPoint() {
                return this.$route.params.flag || this.$route.params.point
            },
            isDestination() {
                return typeof this.$route.params.flag === 'undefined' && this.destination.id
            },
            isCreate() {
                return this.$route.params.destination === 'create'
            },
            style() {
                function randomIntFromInterval(min, max) { // min and max included
                    return Math.floor(Math.random() * (max - min + 1) + min);
                }

                if (this.destination && this.destination.photos && this.destination.photos.length) {
                    let i = randomIntFromInterval(0, this.destination.photos.length)
                    let photo = this.destination.photos[i]
                    if (photo) {
                        return {
                            backgroundImage: `url(${photo.path})`
                        }
                    }
                }
                return {}
            }
        }
    }
</script>

<style lang="scss">
    .hero.north {
        min-height: 280px;
        background-color: #FFF;
        position: relative;

        &.has-overlay {
            background: none;

            &:before {
                background: none;
            }
        }

        .hero-image {
            background-position: 50% 25%;
            background-size: cover;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 50%;
            overflow: hidden;
            z-index: 1;

            &:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, .1);
                z-index: 2
            }

            .hero-image-mask {
                mask-image: url("../static/hero-mask.svg");
                background-color: #fff;
                mask-position: 50% 25%;
                mask-repeat: no-repeat;
                mask-size: cover;
                position: absolute;
                left: -1px;
                top: 0;
                bottom: 0;
                width: 145px;
                padding-bottom: 330px;
                z-index: 4;
            }
        }
    }

    .image.avatar {
        padding: 0.25rem;
        background: #FFF;
        border-radius: 50%;
        position: relative;

        .tag {
            position: absolute;
            top: 10px;
            right: -10px;
            font-size: 14px;
            font-weight: 500;
            line-height: 1em;
            height: auto;
            padding: .25rem .5rem;
            border-radius: 15px;
            box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
        }
    }

    .hero.south {
        .column.has-image {
            position: relative;

            img {
                max-width: 250px;
                position: absolute;
                right: 0;
                bottom: -3rem;
            }
        }
    }

    .point-preview {
        .card {
            box-shadow: none;

            .card-content {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                text-align: center;

                h4 {
                    color: #FFFFFF;
                }
            }
        }
    }

    .xu {
        background: url('../static/xu_bg.png') center no-repeat, #247e76;
        color: #FFF;

        .button.is-text,
        a,
        .title {
            color: #FFFFFF;
        }
    }

    .button.fixed {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
    }
</style>
