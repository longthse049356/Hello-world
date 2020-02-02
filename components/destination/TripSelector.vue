<template>
    <div class="card no-border">
        <div class="card-content" style="padding: 1.5rem;">
            <div class="columns">
                <div class="column is-8">
                    <div class="title is-4 mb-1">{{inPoint ? 'Thêm vào chuyến đi' : 'Chuyến đi sắp diễn ra'}}</div>
                    <div class="description mb-3">Bạn có thể {{inPoint ? 'thêm' : 'tham gia'}} vào các chuyến đi {{inPoint? 'đã có của bạn' : 'hấp dẫn đang có sẵn'}}</div>
                    <t-list
                            media-size="is-2by1"
                            class="trip-suggest-medium" v-if="trip"
                            :q="q"
                            layout="item-inner" column="is-6" :value="trip"/>
                </div>
                <div class="column has-text-centered v-center">
                    <div class="is-fullwidth">
                        <i class="fas fa-5x fa-suitcase-rolling mb-3" style="color: #6b7178;"></i>
                        <div class="title is-5 mb-1">Hoặc tạo chuyến đi mới</div>
                        <div class="description mb-3">{{inPoint ? `qua ${point.title}` : 'Tự tạo chuyến đi cho riêng mình'}}</div>
                        <button class="button is-medium is-primary is-rounded is-active-shadow">
                            <b-icon size="is-small" class="mr-1" icon="plus-circle" pack="fas"></b-icon>
                            <span>Tạo chuyến đi</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TripSelector",
        props: {
            destination: {},
            point: {},
            group: {}
        },
        data() {
            return {
                q: {param: {limit: 6, page: 1, search: ""}},
                trip: null
            }
        },
        methods: {
            async fetch(page) {
                this.q.param.page = page
                if (this.destination) {
                    this.q.param.end_point = this.destination.id
                }
                let res = await this.$graph['recommendation_trips'](this.q)
                this.trip = res['data']['recommendation_trips']
            }
        },
        created() {
            this.fetch(1)
        },
        computed: {
            inPoint() {
                return !!this.point
            },
            inDestination() {
                return this.inPoint
            }
        },
        watch: {
            destination() {
                this.fetch(1)
            }
        }
    }
</script>

<style scoped>

</style>