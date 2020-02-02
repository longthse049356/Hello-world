<template>
    <div class="has-background-white">
        <div class="section hero is-small">
            <div class="hero-body">
                <div class="container small">
                    <div class="columns">
                        <div class="column">
                            <div class="card no-border has-text-centered">
                                <div class="card-image">
                                    <div class="image is-96x96">
                                        <img src="../static/explore/sun-umbrella.svg" alt="">
                                    </div>
                                </div>
                                <div class="card-content">
                                    <span class="title is-6">Biển</span>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card no-border has-text-centered">
                                <div class="card-image">
                                    <div class="image is-96x96">
                                        <img src="../static/explore/mountains.svg" alt="">
                                    </div>
                                </div>
                                <div class="card-content">
                                    <span class="title is-6">Đồi núi</span>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="card no-border has-text-centered">
                                <div class="card-image">
                                    <div class="image is-96x96">
                                        <img src="../static/explore/cityscape.svg" alt="">
                                    </div>
                                </div>
                                <div class="card-content">
                                    <span class="title is-6">Thành thị</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <b-field style="margin-top: 3rem;">
                        <b-input placeholder="Bạn muốn đi đâu?" expanded size="is-medium"></b-input>
                    </b-field>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container medium">
                <div class="columns is-multiline">
                    <div class="column" v-for="(d, i) in response.edges" :key="d.id"
                         v-bind:class="{'is-6': i < 2, 'is-4': i >= 2}">
                        <d-card :value="d" :has-border="false"></d-card>
                    </div>
                </div>
            </div>
        </div>
        <div class="section hero is-small is-light">
            <div class="hero-body">
                <div class="container medium">
                    <div class="level">
                        <div class="level-left">
                            <span class="title is-6">Bộ lọc</span>
                        </div>
                        <div class="level-right">
                            <b-field>
                                <b-datepicker icon-pack="far" type="month" placeholder="Thời điểm"
                                              :month-names="monthNames"
                                              icon="calendar">
                                </b-datepicker>
                            </b-field>
                        </div>
                    </div>
                    <div class="columns is-multiline">
                        <div class="column is-4" v-for="(d, i) in all.edges" :key="d.id">
                            <d-card :value="d"></d-card>
                        </div>
                    </div>
                    <section>
                        <b-pagination
                                :total="all.total_count"
                                :current.sync="current"
                                :per-page="9">
                            <b-pagination-button
                                    slot-scope="props"
                                    :page="props.page"
                                    :id="`page${props.page.number}`"
                                    tag="router-link"
                                    :to="`?page=${props.page.number}`">
                                {{ props.page.number }}
                            </b-pagination-button>
                            <b-pagination-button
                                    slot="previous"
                                    slot-scope="props"
                                    :page="props.page"
                                    tag="router-link"
                                    :to="`?page=${props.page.number}`">
                                Trước đó
                            </b-pagination-button>
                            <b-pagination-button
                                    slot="next"
                                    slot-scope="props"
                                    :page="props.page"
                                    tag="router-link"
                                    :to="`?page=${props.page.number}`">
                                Tiếp theo
                            </b-pagination-button>
                        </b-pagination>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Explore",
        async asyncData(ctx) {
            let current = ctx.query.page || 1
            let res = await ctx.$graph['destination_destinations']({param: {limit: 5, page: 1, search: ""}})
            let all = await ctx.$graph['destination_destinations']({param: {limit: 9, page: current, search: ""}})
            await ctx.store.dispatch('menu/setD', {})
            await ctx.store.dispatch('menu/setMenu', [
                {
                    title: "Khám phá",
                    to: '',
                    click: false,
                    icon: 'compass'
                },
                {
                    title: "Tham quan",
                    to: 'visit-point',
                    click: false,
                    icon: 'binoculars'
                },
                {
                    title: "Ăn uống",
                    to: 'restaurant',
                    click: false,
                    icon: 'utensils'
                },
                {
                    title: "Nghỉ ngơi",
                    to: 'accommodation',
                    click: false,
                    icon: 'bed'
                }
            ])
            return {
                response: res.data['destination_destinations'],
                all: all.data['destination_destinations'],
                current: current
            }
        },
        watchQuery: true,
        head() {
            return {
                title: "Khám phá điểm đến"
            }
        },
        data() {
            return {
                monthNames: [
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12'
                ]
            }
        }
    }
</script>

<style scoped>

</style>