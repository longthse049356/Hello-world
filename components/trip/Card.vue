<template>
    <div class="no-border trip"
         v-bind:class="{'nowrap': layout === 'default', 'media': isMedia, 'card': !isMedia, 'cover-inner': layout==='item-inner'}">
        <div v-bind:class="{'media-left': isMedia, 'card-image': !isMedia}">
            <n-link :to="`/trip/${data.slug}`" class="text-inner" v-if="layout==='item-inner'">
                <h4 class="is-vertical-center">
                    <span class="title is-5">{{data.start_point.title}} - {{data.end_point.title}}</span>
                    <div></div>
                    <span class="trip-time">{{dateRange.length}} ngày {{dateRange.length ? dateRange.length - 1 : 0 }} đêm</span>
                </h4>
            </n-link>
            <div :class="`image cover ${mediaSize}`">
                <img class="object-fit" :src="thumbnail" alt="">
            </div>
            <n-link :to="`/member/${data.user.username}`">
                <Avatar v-if="data.user.avatar && ['default', 'item-inner'].includes(layout)"
                        class="is-48x48"
                        :value="data.user.profile ? data.user.profile.media : data.user.avatar"
                        :is-rounded="true"/>
            </n-link>
        </div>
        <div v-bind:class="{'inside': layout === 'tool' || layout === 'memory', 'media-content': isMedia, 'card-content': !isMedia}">
            <div class="media">
                <div class="media-left" v-if="layout === 'coming'">
                    <div class="title">{{momentDate.date()}}</div>
                    <div>tháng {{momentDate.month() + 1}}</div>
                    <div>{{momentDate.year()}}</div>
                </div>
                <div class="media-content">
                    <p v-if="layout === 'default'" class="price">
                        <small>{{estimate_price.toLocaleString()}} VND</small>
                    </p>
                    <h3 class="title is-5 title-item-inner" v-if="layout==='item-inner'">
                        <n-link :to="`/trip/${data.slug}`">{{data.title}}</n-link>
                    </h3>
                    <h4 v-else class="title" v-bind:class="{'is-6': !isMedia, 'is-4': isMedia}">
                        <n-link :to="`/trip/${data.slug}`">{{data.title}}</n-link>
                    </h4>
                    <div class="item-price" v-if="layout==='item-inner'">{{estimate_price.toLocaleString()}} đ</div>
                    <div class="info" v-if="['media', 'coming'].includes(layout)">
                        <div>
                            <strong>Thời gian</strong>
                            <span>: {{dateRange.length}} ngày {{dateRange.length ? dateRange.length - 1 : 0 }} đêm</span>
                        </div>
                        <div><strong>Điểm đến</strong>: {{data.start_point.title}} - {{data.end_point.title}}</div>
                    </div>
                    <p v-if="['media', 'coming'].includes(layout)" class="price">
                        <small>{{estimate_price.toLocaleString()}} VND</small>
                    </p>
                </div>
                <div class="media-right v-center" v-if="['coming', 'default', 'item-inner'].includes(layout)">
                    <Action :group="value.group"></Action>
                </div>
            </div>
        </div>
        <div class="media-right" v-if="layout === 'media'">
            <div class="title">{{momentDate.date()}}</div>
            <div>Tháng {{momentDate.month() + 1}}</div>
            <div>{{momentDate.year()}}</div>
        </div>
    </div>
</template>

<script>
    import Action from "../group/Action";

    export default {
        name: "TCard",
        props: {
            value: {},
            layout: {
                type: String,
                default: 'default'
            },
            mediaSize: {
                default: undefined,
                type: String
            }
        },
        components: {
            Action
        },
        data() {
            return {
                data: this.value,
                index: 0
            }
        },
        computed: {
            thumbnail() {
                if (this.data['photos'] && this.data['photos'].length) {
                    return this.data['photos'][this.index]['thumbnails'][this.size]
                } else if (this.data['end_point']['photos'] && this.data['end_point']['photos'].length && this.data['end_point']['photos'][this.index]['thumbnails']) {
                    return this.data['end_point']['photos'][this.index]['thumbnails'][this.size]
                } else {
                    return '/blank/trip.jpg'
                }
            },
            estimate_price() {
                if (this.data.fixed_cost) {
                    return this.data.fixed_cost
                } else {
                    let prices = this.data.steps ? this.trip.steps.map(x => x.estimate_price) : []
                    return prices.reduce((a, b) => a + b, 0)
                }
            },
            momentDate() {
                return this.momentTime(this.value.start_date)
            },
            size() {
                switch (this.layout) {
                    case 'memory':
                        return 'thumb_200_200'
                    case 'media':
                        return 'thumb_200_200'
                    case 'coming':
                        return 'thumb_400_200'
                    default:
                        return 'thumb_380_250'
                }
            },
            dateRange() {
                return this.getDates(new Date(this.data.start_date), new Date(this.data.end_date))
            },
            isMedia() {
                return this.layout === 'media'
            }
        }
    }
</script>

<style lang="scss">
    .card.nowrap {
        border: 0;
        box-shadow: unset;
    }

    .card.create {
        box-shadow: unset;
    }

    .card.stop-over {
        max-width: calc(100% + 2rem);
        padding: 1rem;

        .card-content {
            overflow-x: auto;
            overflow-y: hidden;
            padding: 1px;

            .card-content {
                padding: 1rem;
            }
        }

        margin: 0 -1rem;
    }

    .card.trip {
        box-shadow: unset;

        .card-footer {
            padding: 0.5rem;
        }

        .title {
            margin-bottom: 0;
        }

        .price {
            color: red;
        }

        .card-image {
            position: relative;

            .avatar {
                position: absolute;
                top: 1rem;
                right: 1rem;
                padding: 3px !important;
                background: #FFF;
            }
        }

        .info {
            font-size: 11px;
        }

        .dropdown-item {
            padding: 0.5rem;
        }
    }

    .trip.media {
        .media-left {
            max-width: 250px;
        }

        .media-right {
            .title {
                margin-bottom: 0;
            }
        }
    }
</style>
