<template>
    <div v-if="data" :ref="`step_${data.id}`" class="media step"
         v-bind:class="{'dragging': creating, 'active': dragging}" :style="wrapperStyle">
        <div class="media-left">
            <div class="button is-rounded time">{{formatTime(data.start_date)}}</div>
        </div>
        <div class="media-content">
            <div class="media">
                <div class="media-left" v-if="data.point">
                    <m-thumbnail ratio="is-96x96" :value="data.point && data.point.photos ? data.point.photos : []"/>
                </div>
                <div class="media-content">
                    <h3 class="title is-5 mb-05">{{data.title || data.point.title}}</h3>
                    <b-rate icon-pack="fas" size="is-small"></b-rate>
                    <small v-if="address">{{address.formatted_address}}</small>
                </div>
            </div>
        </div>
        <div class="media-right">
            <div v-if="creating">
                <div v-if="false" class="button" @mousedown="onButtonDown"
                     @touchstart="onButtonDown"
                     @focus="onFocus"
                     @blur="onBlur">
                    <b-icon size="is-small" pack="fa" icon="arrows-alt"></b-icon>
                </div>
                <div class="button is-rounded" @click="$emit('select', data)">
                    <b-icon size="is-small" pack="fa" icon="pen"></b-icon>
                </div>
            </div>
            <b-icon :class="`trip-icon ${getClass(data.point ? data.point.point_kind : '')}`"
                    v-else pack="fa" :icon="getIcon(data.point ? data.point.point_kind : '')" size="is-small"></b-icon>
        </div>
        <span class="close"></span>
    </div>
</template>

<script>
    import moment from "moment";

    const TIME = 15
    export default {
        name: "Step",
        props: {
            value: {},
            creating: {
                default: false,
                type: Boolean
            }
        },
        data() {
            let start_date = moment(this.value.start_date, 'YYYY-MM-DDTHH:mm')
            let end_date = moment(this.value.end_date, 'YYYY-MM-DDTHH:mm')
            return {
                data: this.value,
                isFocused: false,
                dragging: false,
                startY: 0,
                position: 0,
                itv: 1,
                current: 0,
                startDate: moment(this.value.start_date, 'YYYY-MM-DDTHH:mm').startOf('day'),
                dateRange: moment.duration(end_date.diff(start_date)).asMinutes(),
                height: 0,
                parentHeight: 0
            }
        },
        computed: {
            address() {
                if (this.value.end_address) {
                    return this.value.end_address
                }
                if (this.value.point.address) {
                    return this.value.point.address
                }
                return null
            },
            wrapperStyle() {
                if (this.creating && this.dragging) {
                    return {
                        top: `${this.position - this.height / 2}px`,
                        marginTop: 0,
                        zIndex: Math.round(this.position)
                    }
                } else {
                    return {}
                }
            }
        },
        methods: {
            onFocus() {
                this.isFocused = true
            },
            onBlur() {
                this.isFocused = false
            },
            onButtonDown(event) {
                event.preventDefault()
                this.onDragStart(event)
                if (typeof window !== 'undefined') {
                    document.addEventListener('mousemove', this.onDragging)
                    document.addEventListener('touchmove', this.onDragging)
                    document.addEventListener('mouseup', this.onDragEnd)
                    document.addEventListener('touchend', this.onDragEnd)
                    document.addEventListener('contextmenu', this.onDragEnd)
                }
            },
            onDragStart(event) {
                if (this.creating) {
                    this.dragging = true
                    this.balance()
                    this.$emit('dragstart')
                    if (event.type === 'touchstart') {
                        event.clientY = event.touches[0].clientY
                    }
                    this.startY = event.clientY
                }
            },
            onDragging(event) {
                if (this.dragging) {
                    if (event.type === 'touchmove') {
                        event.clientY = event.touches[0].clientY
                    }
                    let diff = (event.clientY - this.startY)
                    this.setPosition(diff + this.current)
                }
            },
            onDragEnd() {
                if (!this.creating) {
                    return
                }
                this.dragging = false
                this.$emit('dragend')
                if (typeof window !== 'undefined') {
                    document.removeEventListener('mousemove', this.onDragging)
                    document.removeEventListener('touchmove', this.onDragging)
                    document.removeEventListener('mouseup', this.onDragEnd)
                    document.removeEventListener('touchend', this.onDragEnd)
                    document.removeEventListener('contextmenu', this.onDragEnd)
                }
            },
            setPosition(percent) {
                if (percent < 0 || percent > this.parentHeight) {
                    return
                }
                if (percent === 0) {
                    this.itv = 0
                    this.data.start_date = this.startDate.toDate()
                } else {
                    this.itv = Math.floor((24 * 60 / TIME) * percent / this.parentHeight)
                    this.data.start_date = this.startDate.clone().add(this.itv * TIME, 'm').toDate()
                }
                this.position = percent
            },
            balance() {
                this.height = this.$refs[`step_${this.data.id}`].offsetHeight
                this.parentHeight = 600
                let d = moment(this.data.start_date, 'YYYY-MM-DDTHH:mm')
                this.setPosition(0)
                let h = d.hours()
                let m = d.minutes()
                this.itv = (h * 60 + m) / TIME
                this.current = this.parentHeight * (this.itv / (24 * 60 / TIME))
                this.setPosition(this.current)
            },
            getIcon(kind) {
                switch (kind) {
                    case 'visit-point':
                        return 'binoculars'
                    case 'accommodation':
                        return 'bed'
                    case 'restaurant':
                        return 'utensils'
                    default:
                        return 'taxi'
                }
            },
            getClass(kind) {
                switch (kind) {
                    case 'visit-point':
                        return 'trip-icon-visit'
                    case 'accommodation':
                        return 'trip-icon-hotel'
                    case 'restaurant':
                        return 'trip-icon-restaurant'
                    default:
                        return 'trip-icon-move'
                }
            },
        },
        watch: {
            // dragging() {
            //     this.$emit('dragging', this.dragging)
            // },
            // data() {
            //     this.$emit('input', this.data)
            // },
            // "data.start_date"(n, o) {
            //     this.data.end_date = moment(n, 'YYYY-MM-DDTHH:mm').clone().add(this.dateRange, 'm').toDate()
            // }
        }
    }
</script>

<style lang="scss">
    .step {
        margin-bottom: 0 !important;

        &.dragging {
            &.active {
                position: absolute;
                z-index: 999 !important;
                box-shadow: 3px 3px 3px 0 #00000059;
                right: -1rem;
                left: 1rem;

                .close {
                    position: absolute;
                    top: calc(50% - 1rem);
                    left: calc(-1rem + 1px);
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 1rem 1rem 1rem 0;
                    border-color: transparent #ffffff transparent transparent;
                    cursor: pointer;
                }

                &:before {
                    content: "";
                    position: absolute;
                    top: calc(50% - 1rem);
                    left: calc(-1rem - 0.5px);
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 1rem 1rem 1rem 0;
                    border-color: transparent #F5F5F5 transparent transparent;
                    cursor: pointer;
                }
            }


            top: 0;
            left: 0;
            right: 0;
            border: 1px solid #F5F5F5 !important;
            padding: 1rem;
            background: #FFFFFF;
        }

        .time {
            min-width: 60px;
        }
    }
</style>