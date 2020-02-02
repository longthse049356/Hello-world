<template>
    <div class="popular popular-destination">
        <h4 v-if="title" style="margin-bottom: 1rem;"><b>{{title}}</b></h4>
        <div class="columns is-3 is-variable is-half-mobile" v-bind:class="{'is-multiline': multiline}">
            <div v-for="item in data.edges" :key="item.id" :class="`column ${col}`">
                <n-link :to="`/${item.slug}`" v-bind:class="{'media': layout === 'media', 'card': hasCard}">
                    <div :class="layout === 'media' ? 'media-left' : 'card-image'">
                        <figure v-if="item.photos" :class="`image ${maxImageSize}`">
                            <img :src="item.photos[0].thumbnails['thumb_200_300']" alt="Placeholder image">
                        </figure>
                    </div>
                    <slot v-if="hasFooterSlot" name="footer" v-bind:item="item"></slot>
                    <div v-else :class="layout === 'media' ? 'media-content' : 'card-content' + ' ' +  titlePosition">
                        <h2 v-if="titleSize === 2" :class="`title is-${titleSize + 2}`">{{item.title}}</h2>
                        <h3 v-else-if="titleSize === 3" :class="`title is-${titleSize} + 2`">{{item.title}}</h3>
                        <h4 class="title mb-0 trip-title-small" v-else>{{item.title}}</h4>
                    </div>
                </n-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Popular",
        props: {
            data: {
                type: Object,
                default: null
            },
            multiline: {
                type: Boolean,
                default: false
            },
            max: {
                default: 3,
                type: Number
            },
            maxImageSize: {
                default: null,
                type: String
            },
            title: {
                type: String,
                default: null
            },
            imgSize: {
                type: String,
                default: '1280x960'
            },
            layout: {
                type: String,
                default: 'simple'
            },
            column: {
                type: String,
                default: '3'
            },
            hasCard: {
                type: Boolean,
                default: true
            },
            titleSize: {
                type: Number,
                default: 0
            },
            titlePosition: {
                type: String,
                default: null
            },
            cardShadow: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            col() {
                if (this.multiline === false) {
                    return `is-${12 / this.max}`
                }

                return `is-${this.column}`
            },
            hasFooterSlot() {
                return !!this.$scopedSlots.footer
            }
        }
    }
</script>

<style lang="sass">
    .popular
        &:not(:last-child)
            margin-bottom: 2rem
</style>
