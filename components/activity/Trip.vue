<template>
    <div v-if="value">
        <div class="post-item-trip">
            <div class="pit-stick"></div>
            <div class="pit-ticket">
                <div class="pitt-qrcode">
                    <canvas :ref="`trip-${value.id}`"></canvas>
                </div>
                <div class="time">3 ngày 2 đêm</div>
                <div class="price-title">Chi phí</div>
                <div v-if="value.fixed_cost" class="title is-6 price-suggest"><strong>{{value.fixed_cost.toLocaleString()}} VND</strong></div>
            </div>
            <figure class="pit-image">
                <div class="pit-image-background photo-mask-div">
                    <div class="photo-mask" v-if="value.start_point && value.end_point">
                        <div class="title is-4 mb-1"><strong>{{value.start_point.title}} -
                            {{value.end_point.title}}</strong></div>
                        <div class="trip-start">
                            <b-icon size="is-small" icon="flag-checkered" pack="fas"></b-icon>
                            <span class="ml-1">
                            {{momentDate}}
                        </span>
                        </div>
                    </div>
                    <div class="image">
                        <img v-if="value.photos && value.photos.length" :alt="value.photos[0].title" :src="value.photos[0].thumbnails['thumb_380_250']">
                        <img v-else src="/blank/trip.jpg" alt="">
                    </div>
                </div>
            </figure>
        </div>
        <div class="card-content post-item-text">
            <div class="content text-article">
                <div class="title is-5">
                    <n-link :to="`/trip/${value.slug}`">{{value.title}}</n-link>
                </div>
                <p>{{value.description}}</p>
                <a v-if="value.description.length > 160" href="#" class="highlight" title="">Đọc thêm</a>
            </div>
        </div>
    </div>
</template>

<script>
    var QRCode = require('qrcode')
    export default {
        name: "Trip",
        props: {
            value: {},
            minimize: {
                default: false,
                type: Boolean
            },
            slug: {
                default: null,
                type: String
            }
        },
        computed: {
            momentDate() {
                return this.momentTime(this.value.start_date)
            }
        },
        mounted() {
            if (this.$refs[`trip-${this.value.id}`]) {
                let canvas = this.$refs[`trip-${this.value.id}`]
                QRCode.toCanvas(canvas, `trip.vn/go/${this.value.id}`, function (error) {
                    if (error) console.error(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>